document.getElementById("listJs").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "getJsFiles" }, function (response) {
    if (response.error) {
      console.error("Error:", response.error);
      document.getElementById("jsFilesList").textContent =
        "Error: " + response.error;
    } else if (response.data) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = tabs[0].url;
        var jsFilesList = url + "\n" + response.data.join("\n");
        document.getElementById("jsFilesList").textContent = jsFilesList;
        copyToClipboard(jsFilesList);
      });
    }
  });
});

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      // Success message
    })
    .catch(function (err) {
      // Error handling
      console.error("Could not copy text: ", err);
    });
}
