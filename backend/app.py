import os
import gspread
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

load_dotenv()
app = Flask(__name__)
CORS(app)

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
sheet1 = client.open_by_key(SHEET_ID).sheet1

@app.route("/api/schedule")
def get_schedule():
    data = sheet1.get_all_values()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5001)