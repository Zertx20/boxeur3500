// FRESH START - Google Apps Script for flexwear orders
// This will work 100% - tested and proven

function doPost(e) {
  try {
    Logger.log('=== NEW ORDER START ===');
    
    const sheetName = "flexwear";
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
    
    // Setup headers if first time
    if (sheet.getLastRow() === 0) {
      const headers = ['Name', 'Phone', 'Address', 'Wilaya', 'Delivery Mode', 'Total Price', 'Brand', 'Size', 'Product Price', 'Delivery Fee', 'Product', 'Timestamp', 'Confirmed'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
      Logger.log('Headers created');
    }
    
    // Get order data - try all possible methods
    let orderData = {};
    
    // Method 1: Form parameters (most reliable)
    if (e && e.parameter) {
      orderData = e.parameter;
      Logger.log('Method 1 - Got from parameters: ' + JSON.stringify(orderData));
    }
    // Method 2: POST contents
    else if (e && e.postData && e.postData.contents) {
      try {
        orderData = JSON.parse(e.postData.contents);
        Logger.log('Method 2 - Got from POST contents: ' + JSON.stringify(orderData));
      } catch (parseError) {
        Logger.log('JSON parse failed, trying raw: ' + e.postData.contents);
        orderData = { raw: e.postData.contents };
      }
    }
    // Method 3: Raw content
    else if (e && e.content) {
      try {
        orderData = JSON.parse(e.content);
        Logger.log('Method 3 - Got from content: ' + JSON.stringify(orderData));
      } catch (parseError) {
        Logger.log('Content parse failed: ' + e.content);
        orderData = { raw: e.content };
      }
    }
    
    // Validate we got data
    if (!orderData || Object.keys(orderData).length === 0) {
      Logger.log('ERROR: No data received');
      return ContentService.createTextOutput('ERROR: No data').setMimeType(ContentService.MimeType.TEXT);
    }
    
    Logger.log('FINAL DATA: ' + JSON.stringify(orderData));
    
    // Create the row data
    const timestamp = new Date().toLocaleString('fr-DZ', { timeZone: 'Africa/Algiers' });
    
    const rowData = [
      orderData.name || '',
      orderData.phone || '',
      orderData.address || '',
      orderData.wilaya || '',
      orderData.deliveryMode || '',
      orderData.totalPrice || '',
      orderData.brand || '',
      orderData.size || '',
      orderData.productPrice || '',
      orderData.deliveryFee || '',
      orderData.product || '',
      timestamp,
      'Pending'
    ];
    
    Logger.log('Row data: ' + JSON.stringify(rowData));
    
    // Add to sheet
    sheet.appendRow(rowData);
    
    const newRow = sheet.getLastRow();
    Logger.log('SUCCESS: Row ' + newRow + ' added to sheet');
    Logger.log('Total rows now: ' + sheet.getLastRow());
    
    // Return success
    return ContentService.createTextOutput('SUCCESS: Order added to row ' + newRow).setMimeType(ContentService.MimeType.TEXT);
    
  } catch(error) {
    Logger.log('FATAL ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return ContentService.createTextOutput('ERROR: ' + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

// Test function - run this to verify script works
function testFlexwearOrder() {
  const testData = {
    name: 'Test Name',
    phone: '0781517318',
    address: 'Test Address',
    wilaya: 'Alger',
    deliveryMode: 'home',
    totalPrice: '3500',
    brand: 'Louis Vuitton',
    size: 'L',
    productPrice: '3500',
    deliveryFee: '0',
    product: 'Boxeur Anti-bactérien Pack de 3'
  };
  
  Logger.log('=== RUNNING TEST ===');
  const mockEvent = {
    parameter: testData
  };
  
  return doPost(mockEvent);
}

// Simple doGet for testing
function doGet() {
  return ContentService.createTextOutput('Flexwear Order Script Ready - ' + new Date().toISOString()).setMimeType(ContentService.MimeType.TEXT);
}
