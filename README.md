# SaiCoPvP F-Top Parser

This project is designed to help staff members of **SaiCoPvP** easily extract, clean, and transfer F-Top leaderboard data into spreadsheets, Discord, or other platforms at the end of a map.

## Purpose

The SaiCoPvP F-Top Parser automates the process of collecting leaderboard data from in-game screenshots of the F-Top standings. This eliminates the need for manual data entry and ensures the leaderboard data is accurate and easily accessible.

## Features

- **Image Upload**: Staff members can upload a screenshot of the F-Top leaderboard.
- **Automated Text Recognition (OCR)**: The tool uses **Tesseract.js** to automatically recognize and extract text from the uploaded image.
- **Data Cleanup**: The extracted text is automatically cleaned and formatted, removing unnecessary characters and organizing the data into a readable format.
- **Error Handling**: If no text is detected in the uploaded image, the tool will notify the user.
- **Copy and Paste**: After parsing, staff members can easily copy the extracted data to transfer it into spreadsheets, Discord, or any other platform.

## Live Demo

You can use the F-Top Parser tool directly by visiting the following URL:

[Click here to use the SaiCoPvP F-Top Parser]([https://yourdomain.com](https://ftop-parser.vercel.app/))

## How to Use

1. **Upload the Screenshot**:
   - Click the "Upload" button to upload a screenshot of the F-Top leaderboard.
   
2. **Wait for Processing**:
   - After uploading, the system will begin processing the image using Optical Character Recognition (OCR).
   - A loading indicator will appear during processing.

3. **Extracted Data**:
   - Once the image is processed, the leaderboard data will be displayed in a clean, copyable format.
   
4. **Copy the Data**:
   - The extracted data can then be copied and pasted into a spreadsheet, Discord, or other platforms for further use.

## When to Use

This tool is intended to be used at the **end of a map** when SaiCoPvP staff need to gather F-Top rankings quickly and efficiently. The extracted data can be used to:
- Record leaderboard results in official spreadsheets.
- Post final standings in Discord or other platforms for the community.
- Prepare data for any rewards distribution based on F-Top standings.
