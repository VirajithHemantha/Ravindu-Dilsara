/**
 * Google Apps Script for Wedding Invitation Form Submissions
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1MuOBj28-kZvaoxXsKcV-_kAafHPdd6bWzi1wddGVqW4/edit?usp=sharing
 * 2. Go to Extensions > Apps Script
 * 3. Delete any code there and paste this code.
 * 4. Click 'Deploy' > 'New Deployment'
 * 5. Select 'Web App'
 * 6. Set 'Execute as' to 'Me'
 * 7. Set 'Who has access' to 'Anyone'
 * 8. Click 'Deploy' and copy the 'Web App URL'
 * 9. Update the SCRIPT_URL in your React application with this URL.
 */

interface RSVPData {
  formType: 'rsvp';
  name: string;
  guests: string;
  dietary: string;
}

interface WishesData {
  formType: 'wishes' | 'wish'; // Supporting both to ensure compatibility
  name: string;
  message: string;
}

type FormData = RSVPData | WishesData;

function doPost(e: any) {
  const sheetId = "1MuOBj28-kZvaoxXsKcV-_kAafHPdd6bWzi1wddGVqW4";
  const ss = SpreadsheetApp.openById(sheetId);
  
  let data: FormData;
  try {
    data = JSON.parse(e.postData.contents) as FormData;
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": "Invalid JSON" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const formType = data.formType;
  const sheetName = formType === 'rsvp' ? 'RSVP' : 'Wishes';
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // Add headers if the sheet is new (0 rows)
  if (sheet.getLastRow() === 0) {
    if (formType === 'rsvp') {
      sheet.appendRow(['Timestamp', 'Full Name', 'Number of Guests', 'Dietary Notes']);
    } else {
      sheet.appendRow(['Timestamp', 'Name', 'Message']);
    }
    // Make headers bold for better visibility
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight("bold");
  }

  // Append the data
  if (formType === 'rsvp') {
    const rsvpData = data as RSVPData;
    sheet.appendRow([
      new Date(),
      rsvpData.name,
      rsvpData.guests === '0' ? 'Regretfully Decline' : rsvpData.guests,
      rsvpData.dietary || ''
    ]);
  } else {
    const wishesData = data as WishesData;
    sheet.appendRow([
      new Date(),
      wishesData.name,
      wishesData.message
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Add CORS support for browser preflight
function doOptions(e: any) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
