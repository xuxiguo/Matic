const { GoogleSpreadsheet } = require("google-spreadsheet");
const { google } = require("googleapis");

const SPREADSHEET_ID = "13jdBqUcI8eW1gBTio48nIx2SvnDUx7ZQbobVZCxCkZ8";
const CLIENT_EMAIL = "matic-206@gxxnorman123.iam.gserviceaccount.com";
const PRIVATE_KEY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqm7dpb9tiVpLL\nR/tp8Jz9YS91jgy6nfAWS03Qz6hLs4GcBYiQrjdpLiqEO++Q8DsVWCvWl+xBwK/M\nhFkFlo2PUy4AeTvwMaoZMuq1bKWrJkHpl3ePGgcrVGfvJzFQC9/qbqQ0QKqu6CoU\nstgla+lwgNSaKwkwkwBkw1onX5Y7T7Y+uYAIK//lxDFrgTjp0Dp/HW3DmSHIBbc3\nvRnYpSUwqznO8kFIjkh3idkidJXEgDZfPT/ALOlcVebMFuFyzpmymDOi+r9fhGJ1\n4/FFM/9+byIXOHB1vU96pMS6uzn2me5W99kbL3dhq4Pzc3mqf/kI9HwhLI5Kj5sT\nGVjQUl/HAgMBAAECggEAAS6LoFZkAXXkp1PgYaM7viWDKLVyCi+5EiLbXaDphmFF\nBySxpl4i+RtzmuMC7jLIriYrzG7Fzg8ImurXjDPLHaKtshhwMMaGWzgYWWwWZ73o\nja8eyM2OHmnWixorUm/TP6uF/PbAxbvfCUNbL8C+dPk6eEM9WYIQgxWg1enju8zE\n0OXfSlwP6QJbcl+E/ePXC4W5omNgjlQYBR+DW14uJnOj4FA96ohuhwU7G/iRWPdv\nMZs6Hng4w/fWV0AW0IlHaSK4rVEku1XdEL0qOGvHhNmssSNH0ckWjYqjdqyCY3sD\np+faOduRmSPjFBg/POU5FSI3ObeFugl/zq9HDLRwoQKBgQDtI8pF3yQ2jj25jTvI\npblHOXUO2Yh78diaB32jZC9bTzcmBMvay4BilkxdOCe47a1NkS2Z/JTTEegb6sQq\nH00Bh9wmUTJg06jSV9/5+jJ+TevA6Oi0AmCWE4LZUJB+fhu/eVpx2nqBoPG8MbWr\nExaDmaZ7K5QjvG3iMStjpc4K0QKBgQC4LVT/woAIYZR5eADHlV04YiMdAbWPPIoP\niFMu0XGxYEXAg2WST/HvKr0mrKnQr1R+ff4+edGBbKRIlKfOcoMjnWAQnWnZhv/s\nlsgVLli41ml/0JNfgJ3CCXu7VD7PPwCLUC0RjGhPlpoOcVRCJ7Ld4xcMLQWhFPQc\nn1o17NS3FwKBgF7zYq1hcH2LrLlcDKEFgk87eVxty5FdP85Ey5Cdr7yO1lUZvIop\ny4kuBvuYXYdVW3vgcnLiyLBOzjJHaS44hDvlq0eIYXSVq1Y1q0/LV2ZtSsVePLa+\n8O+GdnEPKhwL4I5lR8qooT7AM6qX+Na7+NrOrfNJerJoY1MbPvVSUVLRAoGAP9ov\nitAi1UUHVal+E7O78u1LISZTjMo/Ty1DMYsZcJZg+GJVl4kx5moZ08uuwBPZJlWG\nDKDtOoKw3hzzpIZc4r8P7BK2/Nxp49tOmNFNnx9uygpE3apYh0oEZKjLccx04te0\nGE5mZ5ld5b3yqVDcGUM+3VDKj9MU4st4WhO2l5cCgYEAlbLJyP705ddi2Bun7iAS\nK/gaUagOvQPuUw6kXXquMsNP66RFiYO4zvJSWAZVXeEvmMNBZSFAN/XdGZFXopQp\nQSj3sABe1/8ug31VB8ZZ1I/uWoxxzRWxpJcG12PhXpMfqHnO6MGWqBO7ZieIztJt\not0PpZj20FqEXfM46ABzDX8=";
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