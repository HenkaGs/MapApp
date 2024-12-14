import csv
import json
import sys

input_csv = r"C:\Users\henry\Documents\GitHub\MapApp\MapApp\src\countryinfofile2.csv"
output_json = r"C:\Users\henry\Documents\GitHub\MapApp\MapApp\src\countriesInfoNewest2.json"

data = {}

def parse_poverty_rate(value):
    # If empty or contains #ERROR!, return None
    if not value or '#ERROR!' in value:
        return None
    
    # Strip '%' and try converting to float
    val = value.strip().replace('%', '')
    try:
        return float(val)
    except ValueError:
        return None

with open(input_csv, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    
    # We'll process the CSV in "blocks." Each block starts when we find a header that looks like:
    # Country/area,1963,<SomeYear>,Absolute Change,Relative Change
    
    # Variables to hold state while parsing
    current_year = None
    header_found = False
    
    for row in reader:
        # Check if this row is a header row: it starts with "Country/area" and has at least 3 columns
        if len(row) >= 3 and row[0] == 'Country/area':
            # The second column is always 1963 (ignored), the third column is the target year
            # (e.g. 2024, 2023, 2022, etc.)
            # We'll extract that year and store it
            # Skip if the third column can't be parsed as a year
            try:
                potential_year = int(row[2])
            except ValueError:
                # If this isn't a valid year, reset and continue
                current_year = None
                header_found = False
                continue
            
            # We have found a header row and a valid year different from 1963
            if potential_year != 1963:
                current_year = str(potential_year)
                header_found = True
            else:
                # If it's 1963, we ignore this block
                current_year = None
                header_found = False
                
            # Move on to next line
            continue
        
        # If we have a header found and a valid current_year, the following rows in this block contain data
        if header_found and current_year is not None:
            if len(row) < 3:
                # Not a valid data row
                continue
            country = row[0].strip().lower()
            
            # Poverty rate is in the same column as the year (3rd column in the row, index 2)
            # row = [Country/area, <1963val>, <yearVal>, Absolute Change, Relative Change]
            poverty_rate_val = row[2].strip() if len(row) > 2 else ''
            
            # Parse the poverty rate
            poverty_rate = parse_poverty_rate(poverty_rate_val)
            
            if country:
                if country not in data:
                    data[country] = {}
                data[country][current_year] = poverty_rate

# Write to JSON
with open(output_json, 'w', encoding='utf-8') as out_f:
    json.dump(data, out_f, indent=4, ensure_ascii=False)
