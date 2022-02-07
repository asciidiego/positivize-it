chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.text === "getSelection") {
    sendResponse(window.getSelection().toString());
  }
});
