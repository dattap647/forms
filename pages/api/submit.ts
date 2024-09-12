import { google } from "googleapis";
import { STATUS_CODES } from "http";
import { NextApiRequest, NextApiResponse } from "next";

type sheetForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
  course:string
};

const GOOGLE_CLIENT_EMAIL = 'spreadsheet@nextform-435414.iam.gserviceaccount.com';
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY; // Replace with your environment variable name
const GOOGLE_SHEET_ID = '1BeDQ2NZeB7e8aCNt3pBCu2M0DWdLUaOIQVtLG6Hqb2o';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed');
  }

  const body = req.body as sheetForm;

  try {
    // Authentication with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle newline characters
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ auth, version: 'v4' });

    // Data validation (optional)
    // You can add checks here to ensure incoming data is in the expected format
    // and prevent potential errors during the append operation.

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'A1:E1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[body.name, body.email, body.phone, body.course,body.message]], // Wrap in an array
      },
    });

    return res.status(200).json({ data: response });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

      return res.status(200).json({ error: 'SOmething went wrong' });
  
  }
}