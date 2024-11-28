import json

# Load the JSON content from the uploaded file
file_path = r"C:\Users\henry\Documents\GitHub\MapApp\MapApp\src\countriesInfo.json"

# Load and parse the JSON file
with open(file_path, "r") as file:
    countries_info = json.load(file)

# Add povertyPercentage field with default value 0.0 if missing
for country, data in countries_info.items():
    if "povertyPercentage" not in data:
        data["povertyPercentage"] = None

# Save the updated JSON back to a file
updated_file_path = r"C:\Users\henry\Documents\GitHub\MapApp\MapApp\src\countriesInfo_updated.json"
with open(updated_file_path, "w") as updated_file:
    json.dump(countries_info, updated_file, indent=4)

print(f"Updated file saved to: {updated_file_path}")
