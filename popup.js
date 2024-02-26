document.getElementById('listJs').addEventListener('click', function() {
    chrome.tabs.executeScript({
      file: 'content.js'
    });
  });
  


  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    //Assing the varaible url to the current tab url
    var url =   sender.tab.url;


    console.log('Received a message:', message);
    if (message.type === "jsFiles") {
      var jsFilesList = url + '\n' + message.data.join('\n');
      // var jsFilesList = message.data.join('\n');
      console.log('jsFilesList:', jsFilesList);
      document.getElementById('jsFilesList').textContent = jsFilesList;
      copyToClipboard(jsFilesList);
    } else {
      console.log('Unexpected message type:', message.type);
    }
  });




  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      // Success message
    }).catch(function(err) {
      // Error handling
      console.error('Could not copy text: ', err);
    });
  }
  