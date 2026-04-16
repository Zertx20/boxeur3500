// FINAL WORKING Google Apps Script for flexwear orders
// This script handles both fetch and form submissions

function doPost(e) {
  try {
    Logger.log('=== NEW ORDER RECEIVED ===');
    Logger.log('Event object: ' + JSON.stringify(e, null, 2));
    
    const sheetName = "flexwear";
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
    
    // Setup headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = ['Name', 'Phone', 'Address', 'Wilaya', 'Delivery Mode', 'Total Price', 'Brand', 'Size', 'Product Price', 'Delivery Fee', 'Product', 'Timestamp', 'Confirmed'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
      Logger.log('Headers set up');
    }
    
    let orderData = null;
    
    // Method 1: Try to get from form parameters (HTML form submission)
    if (e && e.parameter) {
      orderData = {};
      for (let key in e.parameter) {
        if (e.parameter[key]) {
          orderData[key] = e.parameter[key];
        }
      }
      Logger.log('Data from form parameters: ' + JSON.stringify(orderData));
    }
    
    // Method 2: Try to get from POST data (fetch submission)
    else if (e && e.postData && e.postData.contents) {
      try {
        orderData = JSON.parse(e.postData.contents);
        Logger.log('Data from POST contents: ' + JSON.stringify(orderData));
      } catch (parseError) {
        Logger.log('JSON parse error: ' + parseError.toString());
        orderData = e.postData.contents;
      }
    }
    
    // Method 3: Try to get from raw content
    else if (e && e.content) {
      try {
        orderData = JSON.parse(e.content);
        Logger.log('Data from content: ' + JSON.stringify(orderData));
      } catch (parseError) {
        Logger.log('Content parse error: ' + parseError.toString());
        orderData = { raw: e.content };
      }
    }
    
    if (!orderData) {
      Logger.log('ERROR: No order data found in any method');
      return ContentService.createTextOutput('Error: No order data received').setMimeType(ContentService.MimeType.TEXT);
    }
    
    Logger.log('Final order data: ' + JSON.stringify(orderData));
    
    // Process the order
    const timestamp = new Date().toLocaleString('fr-DZ', { timeZone: 'Africa/Algiers' });
    
    // Append to sheet
    sheet.appendRow([
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
      'Pending' // Default status
    ]);
    
    Logger.log('Order successfully added to sheet');
    
    // Return success response
    return HtmlService.createHtmlOutput(`
      <html>
        <body>
          <h1>Order Received Successfully!</h1>
          <p>Thank you for your order.</p>
          <p>You can close this window.</p>
          <script>
            setTimeout(() => window.close(), 2000);
          </script>
        </body>
      </html>
    `);
    
  } catch(error) {
    Logger.log('CRITICAL ERROR in doPost: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return ContentService.createTextOutput('Error: ' + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

// Test function for manual testing
function testOrder() {
  const testData = {
    name: 'Test Customer',
    phone: '0781517318',
    address: '123 Test Street',
    wilaya: 'Alger',
    deliveryMode: 'home',
    totalPrice: '3500',
    brand: 'Louis Vuitton',
    size: 'L',
    productPrice: '3500',
    deliveryFee: '0',
    product: 'Boxeur Anti-bactérien Pack de 3'
  };
  
  const mockEvent = {
    parameter: testData
  };
  
  return doPost(mockEvent);
}

// doGet for testing
function doGet() {
  return HtmlService.createHtmlOutput(`
    <html>
      <body>
        <h1>Flexwear Order Script</h1>
        <p>Script is running and ready to receive orders!</p>
        <button onclick="testOrder()">Test Order</button>
      </body>
    </html>
  `);
}
