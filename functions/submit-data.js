const { GoogleSpreadsheet } = require("google-spreadsheet");
const { google } = require("googleapis");

const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
const CLIENT_EMAIL = "YOUR_CLIENT_EMAIL";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";
const SHEET_NAME = "Sheet1";

const googleAuth = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, [
"https://www.googleapis.com/auth/spreadsheets",
]);

exports.handler = async (event) => {
try {
// Parse the form data from the request body
const { name, walletAddress } = JSON.parse(event.body);
// Authenticate with the Google Sheets API
await googleAuth.authorize();

// Access the Google Sheet
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
await doc.useServiceAccountAuth(googleAuth.credentials);
await doc.loadInfo();

// Append the data to the sheet
const sheet = doc.sheetsByTitle[SHEET_NAME];
await sheet.addRow({ Name: name, WalletAddress: walletAddress });

return {
  statusCode: 200,
  body: JSON.stringify({ message: "Data submitted successfully" }),
};
} catch (error) {
    console.error("Error:", error);
    return {
    statusCode: 500,
    body: JSON.stringify({ message: "An error occurred" }),
    };
    }
    };