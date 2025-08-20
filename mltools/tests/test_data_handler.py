import os
import sys

# Add the project root to sys.path so imports work
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from mltools.data_handler.understanding import DataProfiler

# Test the DataProfiler
if __name__ == "__main__":
    # Path to your test dataset
    test_file = os.path.join(os.path.dirname(__file__), "clean_users.csv")
    
    profiler = DataProfiler(test_file)
    report_file = profiler.generate_report("test_report.html")
    print(f"Report generated: {report_file}")


"""
#To run this code in Colab/Kaggle Notebook
test_file= "path_to_your_file"
profiler = DataProfiler(test_file)
report_file = profiler.generate_report("test_report.html")
print(f"Report generated: {report_file}")
profiler.display_report()
"""
