import pandas as pd
import chardet
import numpy as np
import os
from IPython.display import display, HTML
from sklearn.experimental import enable_iterative_imputer  
from sklearn.impute import IterativeImputer, SimpleImputer
from scipy.stats import shapiro, zscore
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, OrdinalEncoder

class DataCleaner:
    def __init__(self, file_path=None, df=None):
        """
        Writing condition so that user can either pass file_path or dataframe.
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


    def missing_values(self):
        """
        Analyzes missing values and stores results in self.cleaning_report.
        """
        missing_count = self.df.isnull().sum()
        missing_percent = (missing_count / len(self.df)) * 100

        summary = pd.DataFrame({
            "Missing Count": missing_count,
            "Missing %": missing_percent.round(2)
        })

        total_missing = missing_count.sum()
        overall_missing_percent = (total_missing / (self.df.shape[0] * self.df.shape[1])) * 100

        self.cleaning_report["missing_values"] = {
            "column_summary": summary,
            "overall_missing_percent": round(overall_missing_percent, 2)
        }



    def impute_missing_values(self, random_state=42, max_iter=10):
        """
        In this function first I am separating numerical and categorical columns, then applying IterativeImputer for numerical columns and SimpleImputer with 'most_frequent' strategy for categorical columns.
        """
        before_missing = self.df.isnull().sum().sum()

        num_cols = self.df.select_dtypes(include=[np.number]).columns
        cat_cols = self.df.select_dtypes(exclude=[np.number]).columns

        if len(num_cols) > 0:
            iter_imputer = IterativeImputer(random_state=random_state, max_iter=max_iter)
            self.df[num_cols] = iter_imputer.fit_transform(self.df[num_cols])

        if len(cat_cols) > 0:
            cat_imputer = SimpleImputer(strategy="most_frequent")
            self.df[cat_cols] = cat_imputer.fit_transform(self.df[cat_cols])

        after_missing = self.df.isnull().sum().sum()

        self.cleaning_report["imputation"] = {
            "missing_before": int(before_missing),
            "missing_after": int(after_missing),
            "numeric_strategy": "IterativeImputer (BayesianRidge)",
            "categorical_strategy": "Most Frequent (mode)"
        }


    def handle_outliers(self, df, alpha=0.05):
        """
        In this function I have treated outliers based on distribution of data and then applied capping.
        """
        report = {}
        df = df.copy()

        for col in df.select_dtypes(include=[np.number]).columns:
            data = df[col].values  

            stat, p = shapiro(data[:5000])  # sample for speed if large
            is_normal = p > alpha

            if is_normal:
                # Z-score method
                z_scores = zscore(data)
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

    def remove_duplicates(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        This function removes duplicate rows from the DataFrame and updates the cleaning report.
        """
        df = df.copy()

        duplicate_count = df.duplicated().sum()

        if duplicate_count > 0:
            df = df.drop_duplicates().reset_index(drop=True)
            action = f"Removed {duplicate_count} duplicate rows."
        else:
            action = "No duplicate rows found."

        self.cleaning_report["remove_duplicates"] = {
            "initial_shape": df.shape,
            "duplicates_found": int(duplicate_count),
            "action": action
        }

        return df


    def cleaining_report(self, output_file="cleaning_report.html"):
        pass