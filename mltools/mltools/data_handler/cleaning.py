import pandas as pd
import chardet
import numpy as np
import os
from datetime import datetime
import webbrowser
from IPython.display import IFrame, display, HTML
from sklearn.experimental import enable_iterative_imputer  
from sklearn.impute import IterativeImputer, SimpleImputer
from scipy.stats import zscore, shapiro
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, OrdinalEncoder

class BaseDataLoader:
    def __init__(self, file_path=None, df=None):
        """
        Base class for handling file loading or direct dataframe input.
        """
        if df is not None:
            self.df = df.copy()
        elif file_path is not None:
            self.file_path = file_path
            self.df = self._load_file()
        else:
            raise ValueError("Either file_path or df must be provided.")

        self.df_original = self.df.copy()
        self.cleaning_report = {}

    def _detect_encoding(self):
        with open(self.file_path, "rb") as f:
            raw_data = f.read(50000)
        result = chardet.detect(raw_data)
        return result["encoding"] or "utf-8"

    def _load_file(self):
        """
        Load CSV, Excel, or JSON files with robust encoding handling for CSV.
        """
        import os
        ext = os.path.splitext(self.file_path)[1].lower()

        loaders = {
            ".csv": self._load_csv,
            ".xlsx": lambda: pd.read_excel(self.file_path),
            ".xls": lambda: pd.read_excel(self.file_path),
            ".json": lambda: pd.read_json(self.file_path),
        }

        if ext not in loaders:
            raise ValueError(f"Unsupported file type: {ext}")

        try:
            return loaders[ext]()
        except Exception as e:
            raise RuntimeError(f"Failed to load {self.file_path}: {e}")

    def _load_csv(self):
        encoding = self._detect_encoding()
        try:
            return pd.read_csv(self.file_path, encoding=encoding)
        except pd.errors.ParserError:
            return pd.read_csv(
                self.file_path,
                encoding=encoding,
                engine="python",
                on_bad_lines="skip"
            )



class MissingValueHandler:
    """
    Handles missing value analysis and imputation.
    Connects with BaseDataLoader by updating cleaning_report.
    """

    def __init__(self, base_loader: BaseDataLoader):
        self.loader = base_loader
        self.df = self.loader.df
        self.report = {}

    def analyze(self):
        """Analyzes missing values and stores results in BaseDataLoader.cleaning_report."""
        missing_count = self.df.isnull().sum()
        missing_percent = (missing_count / len(self.df)) * 100

        summary = pd.DataFrame({
            "Missing Count": missing_count,
            "Missing %": missing_percent.round(2)
        })

        total_missing = missing_count.sum()
        overall_missing_percent = (total_missing / (self.df.shape[0] * self.df.shape[1])) * 100

        self.report["missing_values"] = {
            "column_summary": summary,
            "overall_missing_percent": round(overall_missing_percent, 2)
        }

        self.loader.cleaning_report.update(self.report)

        return self.df

    def impute(self, random_state=42, max_iter=10):
        """
        Imputes missing values:
        - Numerical: IterativeImputer (BayesianRidge by default)
        - Categorical: Most frequent (mode)
        """
        before_missing = self.df.isnull().sum().sum()

        num_cols = self.df.select_dtypes(include=[np.number]).columns
        cat_cols = self.df.select_dtypes(exclude=[np.number]).columns

        num_cols = [col for col in num_cols if not self.df[col].isnull().all()]
        cat_cols = [col for col in cat_cols if not self.df[col].isnull().all()]

        if len(num_cols) > 0:
            iter_imputer = IterativeImputer(random_state=random_state, max_iter=max_iter)
            self.df[num_cols] = pd.DataFrame(
                iter_imputer.fit_transform(self.df[num_cols]),
                columns=num_cols,
                index=self.df.index
            )

        if len(cat_cols) > 0:
            cat_imputer = SimpleImputer(strategy="most_frequent")
            self.df[cat_cols] = pd.DataFrame(
                cat_imputer.fit_transform(self.df[cat_cols]),
                columns=cat_cols,
                index=self.df.index
            )

        after_missing = self.df.isnull().sum().sum()

        self.report["imputation"] = {
            "missing_before": int(before_missing),
            "missing_after": int(after_missing),
            "numeric_strategy": "IterativeImputer (BayesianRidge)",
            "categorical_strategy": "Most Frequent (mode)"
        }

        self.loader.cleaning_report.update(self.report)

        return self.df




class OutlierHandler:
    def __init__(self, base_loader):
        """
        Initialize OutlierHandler with BaseDataLoader object.
        """
        self.loader = base_loader
        self.df = self.loader.df
        self.cleaning_report = {}

    def handle_outliers(self, alpha=0.05):
        """
        Treat outliers based on distribution of data and apply capping.
        Uses Shapiro-Wilk test to decide between Z-score and IQR method.
        """
        report = {}
        df = self.df.copy()

        for col in df.select_dtypes(include=[np.number]).columns:
            data = df[col].values  

            # Shapiro-Wilk normality test (on sample of 5000 max)
            stat, p = shapiro(data[:5000])  
            is_normal = p > alpha

            if is_normal:
                # Z-score method
                z_scores = zscore(data, nan_policy='omit')
                threshold = 3
                upper_cap = data.mean() + threshold * data.std()
                lower_cap = data.mean() - threshold * data.std()

                df[col] = np.clip(df[col], lower_cap, upper_cap)
                method = "Z-score"
                outliers_count = int((np.abs(z_scores) > threshold).sum())

            else:
                # IQR method
                Q1, Q3 = np.percentile(data, [25, 75])
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR

                df[col] = np.clip(df[col], lower_bound, upper_bound)
                method = "IQR"
                outliers_count = int(((data < lower_bound) | (data > upper_bound)).sum())

            report[col] = {
                "method": method,
                "outliers_count": outliers_count,
                "capped_min": float(df[col].min()),
                "capped_max": float(df[col].max())
            }

        self.cleaning_report["outliers"] = report
        return df


class DuplicatesHandler:
    def __init__(self, base_loader):
        """
        Initialize DuplicatesHandler with BaseDataLoader object.
        Parameters
        ----------
        base_loader : BaseDataLoader
            Loader that provides the DataFrame.
        """
        self.loader = base_loader
        self.df = self.loader.df.copy()   
        self.cleaning_report = {}

    def remove_duplicates(self, subset=None, keep="first", inplace=False):
        """
        Remove duplicate rows from the DataFrame and update cleaning report.

        Returns
        pd.DataFrame
            DataFrame after removing duplicates.
        """
        df = self.df.copy()

        initial_rows = df.shape[0]
        duplicate_mask = df.duplicated(subset=subset, keep=keep)
        duplicate_count = int(duplicate_mask.sum())

        df_cleaned = df.drop_duplicates(subset=subset, keep=keep)
        final_rows = df_cleaned.shape[0]

        self.cleaning_report = {
            "duplicates_found": duplicate_count,
            "rows_before": initial_rows,
            "rows_after": final_rows,
            "rows_removed": initial_rows - final_rows,
            "strategy": f"keep='{keep}'"
        }

        # Update loader df if inplace
        if inplace:
            self.loader.df = df_cleaned
            self.df = df_cleaned

        return df_cleaned
    

import pandas as pd
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, OrdinalEncoder

class CategoricalEncoder:
    """
    CategoricalEncoder handles encoding of categorical variables.
    """
    def __init__(self, base_loader, report, target_column=None, use_label_encoding=False, ordinal_mappings=None):
        self.loader = base_loader               
        self.report = report                    
        self.target_column = target_column
        self.use_label_encoding = use_label_encoding
        self.ordinal_mappings = ordinal_mappings if ordinal_mappings else {}
        self.encoders = {}                      
        self.cleaning_report = {}               

    def encode(self):
        """
        Perform encoding according to configuration and populate self.cleaning_report.
        Returns the encoded DataFrame and writes it back to base_loader.df.
        """
        df = self.loader.df.copy()

        target_info = "None"
        if self.target_column and self.target_column in df.columns:
            le = LabelEncoder()
            df[self.target_column] = le.fit_transform(df[self.target_column].astype(str))
            self.encoders[f"target:{self.target_column}"] = le
            target_info = {
                "column": self.target_column,
                "method": "LabelEncoder",
                "classes": list(le.classes_)
            }

        cat_cols = df.select_dtypes(include=["object", "category"]).columns.tolist()
        if self.target_column in cat_cols:
            cat_cols.remove(self.target_column)

        ohe_columns, label_columns, ordinal_columns = [], [], []
        created_features = 0
        independent_info = {"method": "None", "columns": [], "created_features": 0}

        if len(cat_cols) > 0:
            if self.use_label_encoding:
                for col in cat_cols:
                    le = LabelEncoder()
                    df[col] = le.fit_transform(df[col].astype(str))
                    self.encoders[f"label:{col}"] = le
                    label_columns.append(col)
                independent_info = {
                    "method": "LabelEncoder",
                    "columns": label_columns,
                    "created_features": 0
                }
            else:
                ohe = OneHotEncoder(drop="first", sparse_output=False, handle_unknown="ignore")
                transformed = ohe.fit_transform(df[cat_cols])
                ohe_df = pd.DataFrame(transformed, columns=ohe.get_feature_names_out(cat_cols), index=df.index)
                df = pd.concat([df.drop(columns=cat_cols), ohe_df], axis=1)
                self.encoders["onehot"] = ohe
                ohe_columns = cat_cols
                created_features = ohe_df.shape[1]
                independent_info = {
                    "method": "OneHotEncoder(drop='first')",
                    "columns": ohe_columns,
                    "created_features": int(created_features)
                }

        for col, mapping in self.ordinal_mappings.items():
            if col in df.columns:
                oe = OrdinalEncoder(categories=[mapping])
                df[col] = oe.fit_transform(df[[col]])
                self.encoders[f"ordinal:{col}"] = oe
                ordinal_columns.append(col)
                
        self.cleaning_report = {
            "Target encoding": target_info,
            "Independent encoding": independent_info,
            "Ordinal encoded columns": ordinal_columns if ordinal_columns else "None",
            "encoders_stored": list(self.encoders.keys())
        }

        self.loader.df = df

        return df






class CleaningReport:
    def __init__(self, title="Data Cleaning Report"):
        self.steps = {}
        self.title = title
        self.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def add_step(self, step_name, report_dict):
        """Store the report from each cleaning step."""
        self.steps[step_name] = report_dict

    def generate_html(self, output_path="cleaning_report.html"):
        """Generate, save, and open the HTML report (browser or Jupyter)."""
        html_content = f"""
        <html>
        <head>
            <title>{self.title}</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background: #f4f6f9;
                }}
                h1 {{
                    color: #2c3e50;
                    border-bottom: 2px solid #ccc;
                    padding-bottom: 5px;
                }}
                .step {{
                    margin-bottom: 20px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background: #ffffff;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                }}
                .step h2 {{
                    margin: 0;
                    color: #34495e;
                }}
                table {{
                    border-collapse: collapse;
                    width: 100%;
                    margin-top: 10px;
                }}
                th, td {{
                    border: 1px solid #ccc;
                    padding: 8px;
                    text-align: left;
                }}
                th {{
                    background: #f0f0f0;
                }}
            </style>
        </head>
        <body>
            <h1>{self.title}</h1>
            <p><b>Generated at:</b> {self.created_at}</p>
        """

        for step, details in self.steps.items():
            html_content += f"<div class='step'><h2>{step.capitalize()}</h2>"

            if isinstance(details, dict):
                html_content += "<table>"
                for key, value in details.items():
                    html_content += f"<tr><th>{key}</th><td>{value}</td></tr>"
                html_content += "</table>"
            else:
                html_content += f"<p>{details}</p>"

            html_content += "</div>"

        html_content += "</body></html>"

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        abs_path = os.path.abspath(output_path)

        try:
            get_ipython  # noqa: F821 (checks if running inside IPython/Jupyter)
            display(IFrame(src=abs_path, width="100%", height="600px"))
        except Exception:
            webbrowser.open(f"file://{abs_path}")

        return abs_path

