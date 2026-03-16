import os
import gspread
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv

load_dotenv()

# Define the scope
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets.readonly"
]

# Load credentials from your JSON file
creds = Credentials.from_service_account_file(
    "backend/credentials.json",
    scopes=SCOPES
)

# Authorize and connect
client = gspread.authorize(creds)

# Open your spreadsheet by ID
SHEET_ID = os.getenv("SHEET_ID")
sheet = client.open_by_key(SHEET_ID).sheet1

# Fetch all rows
data = sheet.get_all_values()
print(data)