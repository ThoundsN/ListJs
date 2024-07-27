chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getJsFiles") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getJsFiles,
        },
        (results) => {
          if (chrome.runtime.lastError) {
            sendResponse({ error: chrome.runtime.lastError.message });
          } else if (results && results[0]) {
            sendResponse({ data: results[0].result });
          }
        }
      );
    });
    return true; // Indicates we wish to send a response asynchronously
  }
});

function getJsFiles() {
  var entries = performance.getEntriesByType("resource");
  var jsFiles = entries
    .filter(function (entry) {
      return entry.initiatorType === "script";
    })
    .map(function (entry) {
      return entry.name;
    });
  return jsFiles;
}
