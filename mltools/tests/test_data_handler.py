import os 
import sys 
# Add the project root to sys.path so imports work 
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))) 
from mltools.data_handler.cleaning import ( 
    BaseDataLoader,
    MissingValueHandler, 
    OutlierHandler, 
    DuplicatesHandler, 
    CategoricalEncoder, 
    CleaningReport )


if __name__ == "__main__":
    test_file = os.path.join(os.path.dirname(__file__), "breast_cancer.csv")

    loader = BaseDataLoader(file_path=test_file)
    df = loader.df  
    print("✅ Data Loaded Successfully!")
    print(df.head())

    report = CleaningReport()

    mv_handler = MissingValueHandler(loader)
    df_analyzed = mv_handler.analyze()   
    df_cleaned = mv_handler.impute()     
    print("✅ Missing values handled!")
    print(df_cleaned.head())

    outlier_handler = OutlierHandler(loader)
    df_outliers = outlier_handler.handle_outliers()
    print("✅ Outliers handled!")
    print(df_outliers.head())

    dup_handler = DuplicatesHandler(loader)
    df_no_dupes = dup_handler.remove_duplicates()
    print("✅ Duplicates removed!")
    print(df_no_dupes.head())

    encoder = CategoricalEncoder(loader, report, target_column="diagnosis")
    df_encoded = encoder.encode()
    print("✅ Encoding applied!")
    print(df_encoded.head())

    report.add_step("Missing Values", mv_handler.report)
    report.add_step("Outliers", outlier_handler.cleaning_report["outliers"])
    report.add_step("Duplicates", dup_handler.cleaning_report)
    report.add_step("Encoding", encoder.cleaning_report)

    html_report_path = os.path.join(os.path.dirname(__file__), "cleaning_report.html")
    report.generate_html(html_report_path)

    print(f"✅ Cleaning report saved at {html_report_path}")



# import os
# import sys

# # Add the project root to sys.path so imports work
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# from mltools.data_handler.understanding import DataProfiler

# # Test the DataProfiler
# if __name__ == "__main__":
#     # Path to your test dataset
#     test_file = os.path.join(os.path.dirname(__file__), "clean_users.csv")
    
#     profiler = DataProfiler(test_file)
#     report_file = profiler.generate_report("test_report.html")
#     print(f"Report generated: {report_file}")


# """
# #To run this code in Colab/Kaggle Notebook
# test_file= "path_to_your_file"
# profiler = DataProfiler(test_file)
# report_file = profiler.generate_report("test_report.html")
# print(f"Report generated: {report_file}")
# profiler.display_report()
# """
