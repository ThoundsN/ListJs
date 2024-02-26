var entries = performance.getEntriesByType('resource');
var jsFiles = entries.filter(function(entry) {
  return entry.initiatorType === 'script';
}).map(function(entry) {
  return entry.name;
});


// console.log(jsFiles);
chrome.runtime.sendMessage({type: "jsFiles", data: jsFiles});
