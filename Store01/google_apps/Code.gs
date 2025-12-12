// Store01 Apparel Submission System - FIXED FOR BLANK PAGE
const ADMIN_PASSWORD = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const SPREADSHEET_ID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const GOOGLEDRIVE_FOLDER_ID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// ========== MAIN HANDLERS ==========
function doPost(e) {
  try {
    console.log('=== FORM SUBMISSION STARTED ===');
    
    // Parse JSON data
    const data = JSON.parse(e.postData.contents);
    console.log('Received data:', { 
      name: data.name, 
      email: data.email,
      hasPhotos: Object.keys(data).filter(k => k.startsWith('photo')).length
    });
    
    // ----- IMAGE HANDLING: Save to Google Drive -----
    const DRIVE_FOLDER_ID = GOOGLEDRIVE_FOLDER_ID; // ⚠️ MUST REPLACE THIS
    let photoUrls = ['', '', '', '', '']; // Initialize empty array for 5 photos
    
    // Loop through photo1 to photo5
    for (let i = 1; i <= 5; i++) {
      const photoKey = `photo${i}`;
      const base64Data = data[photoKey];
      
      if (base64Data && base64Data.trim() !== '') {
        console.log(`Processing ${photoKey}...`);
        
        try {
          // Create unique filename
          const fileName = `apparel_${Date.now()}_${i}_${(data.name || 'seller').replace(/\s+/g, '_')}`;
          
          // Save to Drive and get URL
          const fileUrl = saveBase64ToDrive(base64Data, fileName, DRIVE_FOLDER_ID);
          photoUrls[i-1] = fileUrl; // Store at correct index (0-based)
          console.log(`✅ ${photoKey} saved: ${fileUrl}`);
          
        } catch (imgError) {
          console.error(`❌ Failed to save ${photoKey}:`, imgError.message);
          photoUrls[i-1] = '[Upload Failed]';
        }
      }
    }
    
    // Count successful uploads
    const successfulUploads = photoUrls.filter(url => 
      url && url !== '' && url !== '[Upload Failed]'
    ).length;
    console.log(`Successful uploads: ${successfulUploads}`);
    
    // ----- SAVE TO SPREADSHEET -----
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('Listings');
    
    // Create sheet if it doesn't exist (should exist after recreate)
    if (!sheet) {
      sheet = ss.insertSheet('Listings');
      initializeSheetHeaders(sheet);
    }
    
    // ✅ APPEND ROW WITH CORRECT COLUMN ORDER
    sheet.appendRow([
      new Date().toISOString(),                     // A: Timestamp
      data.name || '',                              // B: Seller Name
      data.email || '',                             // C: Email
      data.description || '',                       // D: Apparel Description
      data.message || '',                           // E: Additional Message
      photoUrls[0] || '',                           // F: Photo 1 URL
      photoUrls[1] || '',                           // G: Photo 2 URL
      photoUrls[2] || '',                           // H: Photo 3 URL
      photoUrls[3] || '',                           // I: Photo 4 URL
      photoUrls[4] || '',                           // J: Photo 5 URL
      successfulUploads                             // K: Photo Count
    ]);
    
    const newRow = sheet.getLastRow();
    console.log(`✅ Saved to spreadsheet row ${newRow}`);
    console.log('Photo URLs:', photoUrls.filter(url => url));
    
    // Return success
    const response = {
      status: 'success',
      message: `Submission received with ${successfulUploads} photo(s) saved to Drive.`,
      timestamp: new Date().toISOString(),
      row: newRow
    };
    
    return ContentService.createTextOutput(JSON.stringify(response));
    
  } catch (error) {
    console.error('❌ CRITICAL doPost Error:', error.toString());
    console.error('Stack:', error.stack);
    
    const errorResponse = {
      status: 'error',
      message: `Server error: ${error.toString()}`
    };
    
    return ContentService.createTextOutput(JSON.stringify(errorResponse));
  }
}


function doGet(e) {
  console.log('doGet function started...');
  
  const password = e.parameter.password;
  const mode = e.parameter.mode || '';
  
  // If password is provided and correct, show dashboard
  if (password && password === ADMIN_PASSWORD) {
    console.log('Password check PASSED - showing dashboard');
    
    // TEST MODE: Choose which dashboard to show
    if (mode === 'simple') {
      console.log('Using SIMPLE dashboard');
      return createSimpleDashboard();
    } else if (mode === 'test') {
      console.log('Using TEST page');
      return createMinimalTest();
    } else {
      // Default: Try the actual dashboard
      console.log('Using ACTUAL dashboard template');
      try {
        return createAdminDashboard();
      } catch (error) {
        console.error('Dashboard failed, falling back to simple:', error);
        return createSimpleDashboard();
      }
    }
  }
  
  // No password or wrong password - show login page WITH template
  console.log('Showing login page with template');
  return createLoginPage();
}

// NEW FUNCTION: Create login page with template
function createLoginPage() {
  try {
    const template = HtmlService.createTemplateFromFile('AdminLogin');
    template.webAppUrl = ScriptApp.getService().getUrl(); // Pass the URL
    
    return template.evaluate()
      .setTitle('Store01 Admin Login')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      
  } catch (error) {
    console.error('Error creating login page:', error);
    
    // Fallback: Simple HTML login
    return HtmlService.createHtmlOutput(`
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial; padding: 20px; text-align: center;">
        <h1>Store01 Admin Login</h1>
        <form method="GET">
          <input type="password" name="password" placeholder="Enter password" required>
          <button type="submit">Login</button>
        </form>
      </body>
      </html>
    `);
  }
}

// ========== HELPER FUNCTIONS ==========
function initializeSheetHeaders(sheet) {
  console.log('initializeSheetHeaders function: creating fresh structure...');

  // ✅ FINAL COLUMN STRUCTURE
  const headers = [
    'Timestamp',           // Column A
    'Seller Name',         // Column B
    'Email',               // Column C
    'Apparel Description', // Column D
    'Additional Message',  // Column E
    'Photo 1',             // Column F - Drive URL
    'Photo 2',             // Column G - Drive URL
    'Photo 3',             // Column H - Drive URL
    'Photo 4',             // Column I - Drive URL
    'Photo 5',             // Column J - Drive URL
    'Photo Count'          // Column K
  ];
  
  // Set headers in row 1
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row for better visibility
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold')
    .setBackground('#007bff')
    .setFontColor('#ffffff')
    .setVerticalAlignment('middle');
  
  // Optional: Set column widths
  sheet.setColumnWidths(1, 1, 180); // Timestamp column
  sheet.setColumnWidths(6, 5, 250); // Photo URL columns (wider for links)
  
  console.log('✅ Sheet headers initialized with Photo 1-5 columns');
  console.log('Headers:', headers);
}

// ========== FIXED DASHBOARD FUNCTION ==========
function createAdminDashboard() {

  console.log('createAdminDashboard function: started...');
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Listings');
    
    let submissions = [];
    
    console.log('createAdminDashboard function: constructing submissions array started...');

    if (sheet && sheet.getLastRow() > 1) {
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const rows = data.slice(1);
      
      submissions = rows.map(row => {
        const obj = {};
        headers.forEach((header, idx) => {
          obj[header] = row[idx];
        });
        return obj;
      }).reverse();
    }

    console.log('createAdminDashboard function: constructing submissions array concluded...');
    
    const html = HtmlService.createTemplateFromFile('AdminDashboard');
    html.submissions = submissions;  // ✅ Make sure this is set
    html.scriptUrl = ScriptApp.getService().getUrl();  // ✅ And this
    
    let evaluated_html = html.evaluate()
      .setTitle('Store01 Admin')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    console.log('createAdminDashboard function: Evaluated html' + evaluated_html)

    return evaluated_html;

  } catch (error) {
    console.error('Dashboard error:', error);
    throw error;
  }
}

// Helper function: Saves a base64 image string to Google Drive
function saveBase64ToDrive(base64Data, fileName, folderId) {
  // Extract MIME type and clean base64 string
  const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid base64 format');
  
  const mimeType = matches[1];
  const imageData = matches[2];
  
  // Decode base64 to binary and create a Blob
  const decodedData = Utilities.base64Decode(imageData);
  const blob = Utilities.newBlob(decodedData, mimeType, fileName);
  
  // Get the target folder and create the file
  const folder = DriveApp.getFolderById(folderId);
  const file = folder.createFile(blob);
  
  // Make the file publicly viewable (CRITICAL for dashboard display)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  // Return the direct link for viewing
  // Use the new thumbnail link format for web display
  return `https://drive.google.com/thumbnail?id=${file.getId()}&sz=w1000`;
}

function recreateListingsSheet() {
  console.log('Starting fresh sheet creation...');
  
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Listings');
  
  // Delete existing sheet if it exists
  if (sheet) {
    console.log('Deleting existing "Listings" sheet...');
    ss.deleteSheet(sheet);
    console.log('✅ Old sheet deleted');
  }
  
  // Create new sheet with proper structure
  console.log('Creating new "Listings" sheet...');
  sheet = ss.insertSheet('Listings');
  initializeSheetHeaders(sheet);
  
  // Optional: Add some sample data to test
  console.log('Adding sample row for testing...');
  sheet.appendRow([
    new Date().toISOString(),
    'Test Seller',
    'test@example.com',
    'Sample apparel description',
    'Sample message',
    '', // Photo 1
    '', // Photo 2  
    '', // Photo 3
    '', // Photo 4
    '', // Photo 5
    0   // Photo Count
  ]);
  
  console.log('✅ New "Listings" sheet created with proper structure');
  console.log('Sheet URL:', ss.getUrl());
  
  return 'Sheet successfully recreated!';
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ========== TEST FUNCTIONS ==========
function testDashboard() {
  try {
    const result = createAdminDashboard();
    const content = result.getContent();
    console.log('Dashboard HTML length:', content.length);
    console.log('First 500 chars:', content.substring(0, 500));
    
    if (content.includes('submissions is not defined')) {
      console.error('❌ Template error: submissions not defined');
    }
    
    return 'Dashboard test completed - check logs';
    
  } catch (error) {
    console.error('Test failed:', error.toString());
    return 'Error: ' + error.toString();
  }
}

function cleanExistingData() {
  // Remove Base64 from existing submissions for dashboard display
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Listings');
  
  if (!sheet || sheet.getLastRow() <= 1) return 'No data to clean';
  
  console.log('Cleaning existing Base64 data for dashboard...');
  
  // We're not modifying stored data, just noting it's there
  return 'Existing data has Base64 photos. Dashboard will show "Photo available" instead.';
}

function debugDashboardIssue() {
  console.log('=== DEBUGGING DASHBOARD ===');
  
  try {
    // Test 1: Check data retrieval
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Listings');
    
    console.log('Sheet exists:', !!sheet);
    console.log('Total rows:', sheet ? sheet.getLastRow() : 0);
    
    if (sheet && sheet.getLastRow() > 1) {
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const firstRow = data[1];
      
      console.log('Headers:', headers);
      console.log('First row sample:');
      
      headers.forEach((header, idx) => {
        const value = firstRow[idx];
        const isBase64 = header.startsWith('Photo ') && 
                        value && 
                        value.toString().startsWith('data:image');
        
        console.log(`  ${header}: ${isBase64 ? '[BASE64 - LENGTH: ' + value.length + ']' : value}`);
      });
    }
    
    // Test 2: Create dashboard
    console.log('\n=== CREATING DASHBOARD ===');
    const dashboard = createAdminDashboard();
    const content = dashboard.getContent();
    
    console.log('Dashboard HTML length:', content.length);
    
    // Check for errors
    if (content.includes('submissions is not defined')) {
      console.error('❌ ERROR: submissions variable not passed to template');
    }
    
    if (content.length < 1000) {
      console.warn('⚠️ Very short HTML output. Showing first 500 chars:');
      console.log(content.substring(0, 500));
    }
    
    // Save to Drive for inspection
    const file = DriveApp.createFile('dashboard_debug.html', content, 'text/html');
    console.log('Dashboard saved to:', file.getUrl());
    
    return 'Debug complete. Dashboard saved to Drive for inspection.';
    
  } catch (error) {
    console.error('❌ Debug error:', error.toString());
    console.error('Stack:', error.stack);
    return 'Error: ' + error.toString();
  }
}


function testTemplateLoad() {
  try {
    console.log('Testing template load...');
    
    // Create a simple test template
    const html = HtmlService.createTemplateFromFile('AdminDashboard');
    
    // Provide test data matching your spreadsheet structure
    html.submissions = [{
      'Timestamp': '2025-12-05T23:08:47.403Z',
      'Seller Name': 'Test User',
      'Email': 'test@example.com',
      'Apparel Description': 'Test description',
      'Additional Message': 'Test message',
      'Photo URLs': 'https://drive.google.com/uc?id=TEST_ID&export=download',
      'Photo Count': 1
    }];
    
    html.scriptUrl = ScriptApp.getService().getUrl();
    
    const output = html.evaluate();
    console.log('Template evaluation successful!');
    console.log('Content length:', output.getContent().length);
    
    // Save for inspection
    const file = DriveApp.createFile('template_test.html', output.getContent(), 'text/html');
    console.log('Test file saved to:', file.getUrl());
    
    return 'Template test completed - check logs and Drive file';
    
  } catch (error) {
    console.error('Template test failed:', error.toString());
    console.error('Stack trace:', error.stack);
    return 'Error: ' + error.toString();
  }
}

function testFixedTemplate() {
  try {
    console.log('Testing fixed template...');
    
    const html = HtmlService.createTemplateFromFile('AdminDashboard');
    
    // Provide test data matching your spreadsheet structure
    html.submissions = [{
      'Timestamp': '2025-12-05T23:08:47.403Z',
      'Seller Name': 'Test User',
      'Email': 'test@example.com',
      'Apparel Description': 'Test description',
      'Additional Message': 'Test message',
      'Photo URLs': 'https://drive.google.com/uc?id=TEST_ID&export=download',
      'Photo Count': 1
    }];
    
    html.scriptUrl = ScriptApp.getService().getUrl();
    
    const output = html.evaluate();
    console.log('✅ Template evaluation successful!');
    console.log('Content length:', output.getContent().length);
    
    // Check for common issues
    const content = output.getContent();
    if (content.includes('<?')) {
      console.warn('⚠️ Unprocessed template tags found');
    }
    
    if (content.length < 1000) {
      console.warn('⚠️ Short content, showing preview:', content.substring(0, 500));
    }
    
    return 'Template test passed!';
    
  } catch (error) {
    console.error('❌ Template test failed:', error.toString());
    console.error('Stack trace:', error.stack);
    return 'Error: ' + error.toString();
  }
}

function getDashboardUrl() {
  const url = ScriptApp.getService().getUrl();
  console.log('Current deployment URL:', url);
  console.log('\nTo access admin dashboard:');
  console.log(url + '?password=test123');
  
  return {
    dashboardUrl: url + '?password=test123',
    deploymentType: url.includes('/dev') ? 'Development' : 'Production'
  };
}

function createMinimalTest() {
  const html = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial; padding: 20px;">
    <h1 style="color: green;">✅ TEST PAGE LOADED</h1>
    <p>If you see this, the web app is working.</p>
    <p>Current time: <span id="time"></span></p>
    <script>
      document.getElementById('time').textContent = new Date().toLocaleString();
      console.log('Test page JavaScript executed');
    </script>
  </body>
  </html>`;
  
  return HtmlService.createHtmlOutput(html)
    .setTitle('Store01 - Test')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function debugActualDashboard() {
  console.log('=== DEBUGGING ACTUAL DASHBOARD OUTPUT ===');
  
  // Simulate an admin request
  const mockEvent = {
    parameter: {
      password: 'test123'
    }
  };
  
  try {
    // Get the actual dashboard output
    const dashboard = doGet(mockEvent);
    const content = dashboard.getContent();
    
    console.log('Dashboard HTML length:', content.length);
    console.log('\n=== FIRST 1000 CHARACTERS ===');
    console.log(content.substring(0, 1000));
    
    console.log('\n=== CHECKING FOR ERRORS ===');
    
    // Check for common issues
    if (content.includes('Exception') || content.includes('Error:')) {
      console.log('❌ Found error messages in HTML');
      const errorMatch = content.match(/Exception:[^<]*|Error:[^<]*/i);
      if (errorMatch) console.log('Error detail:', errorMatch[0]);
    }
    
    if (content.includes('submissions is not defined')) {
      console.log('❌ Template error: submissions variable not defined');
    }
    
    if (content.includes('<?')) {
      console.log('⚠️ Unprocessed template tags found');
    }
    
    if (content.length < 1000) {
      console.log('⚠️ Very short output - likely an error page');
    }
    
    // Save to Drive for inspection
    const file = DriveApp.createFile('ACTUAL_DASHBOARD_DEBUG.html', content, 'text/html');
    console.log('\n✅ Full dashboard saved to:', file.getUrl());
    
    return 'Check logs and Drive file for details';
    
  } catch (error) {
    console.error('❌ Debug error:', error.toString());
    return 'Error: ' + error.toString();
  }
}

function createSimpleDashboard() {
  try {
    console.log('Creating SIMPLE dashboard...');
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Listings');
    
    let submissions = [];
    
    if (sheet && sheet.getLastRow() > 1) {
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const rows = data.slice(1);
      
      submissions = rows.map(row => {
        const obj = {};
        headers.forEach((header, idx) => {
          obj[header] = row[idx];
        });
        return obj;
      }).reverse();
    }
    
    // Build HTML manually - NO TEMPLATE ENGINE
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Store01 Admin - SIMPLE</title>
      <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #007bff; color: white; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Store01 - Apparel Submissions (SIMPLE)</h1>
        <p>Total submissions: ${submissions.length}</p>
    `;
    
    if (submissions.length === 0) {
      html += '<p>No submissions yet.</p>';
    } else {
      html += '<table><tr>';
      
      // Headers
      const headers = Object.keys(submissions[0]);
      headers.forEach(header => {
        html += `<th>${header}</th>`;
      });
      html += '</tr>';
      
      // Data rows
      submissions.forEach(sub => {
        html += '<tr>';
        headers.forEach(header => {
          let value = sub[header] || '';
          // Truncate long values
          if (typeof value === 'string' && value.length > 50) {
            value = value.substring(0, 50) + '...';
          }
          html += `<td>${value}</td>`;
        });
        html += '</tr>';
      });
      
      html += '</table>';
    }
    
    html += `
        <p><a href="${ScriptApp.getService().getUrl()}">Logout</a></p>
      </div>
    </body>
    </html>`;
    
    console.log('Simple dashboard HTML length:', html.length);
    
    return HtmlService.createHtmlOutput(html)
      .setTitle('Store01 Admin - SIMPLE')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      
  } catch (error) {
    console.error('Error in simple dashboard:', error);
    
    return HtmlService.createHtmlOutput(`
      <h1>Simple Dashboard Error</h1>
      <pre>${error.toString()}</pre>
    `);
  }
}
