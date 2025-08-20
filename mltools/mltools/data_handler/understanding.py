import pandas as pd
import os
from IPython.display import display, HTML

class DataProfiler:
    def __init__(self, file_path):
        self.file_path = file_path
        self.df = self._load_file()
        self.report_html = ""

    def _load_file(self):
        ext = os.path.splitext(self.file_path)[1].lower()
        if ext == ".csv":
            return pd.read_csv(self.file_path)
        elif ext in [".xlsx", ".xls"]:
            return pd.read_excel(self.file_path)
        elif ext == ".json":
            return pd.read_json(self.file_path)
        else:
            raise ValueError(f"Unsupported file type: {ext}")

    def generate_report(self, output_file="data_report.html"):
        html = "<html><head><style>"
        html += """
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { color: #2F4F4F; }
            table { border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
        """
        html += "</style></head><body>"
        html += f"<h1>Data Profiling Report</h1>"

        # Basic info
        html += "<h2>Dataset Shape</h2>"
        html += f"<p>{self.df.shape}</p>"

        html += "<h2>Columns</h2>"
        html += f"<p>{', '.join(self.df.columns)}</p>"

        html += "<h2>Top 5 rows</h2>"
        html += self.df.head().to_html()

        html += "<h2>Tail 5 rows</h2>"
        html += self.df.tail().to_html()

        html += "<h2>Sample 5 rows</h2>"
        html += self.df.sample(5).to_html()

        html += "<h2>Missing Values</h2>"
        html += self.df.isnull().sum().to_frame("Missing Values").to_html()

        html += "<h2>Duplicate Rows</h2>"
        html += f"<p>{self.df.duplicated().sum()}</p>"

        html += "<h2>Data Info</h2>"
        html += "<pre>"
        self.df.info(buf=open(os.devnull, 'w'))  # Suppress direct print
        # Alternatively, you can capture info as string:
        import io
        buffer = io.StringIO()
        self.df.info(buf=buffer)
        html += buffer.getvalue()
        html += "</pre>"

        html += "<h2>Statistical Summary</h2>"
        html += self.df.describe().to_html()

        html += "</body></html>"

        self.report_html = html

        with open(output_file, "w", encoding="utf-8") as f:
            f.write(html)

        print(f"Report saved to {output_file}")
        return output_file

    def display_report(self):
        if not self.report_html:
            raise ValueError("Report not generated yet. Call generate_report() first.")
        display(HTML(self.report_html))
