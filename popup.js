function matchCase(text, pattern) {
  var result = "";

  for (var i = 0; i < text.length; i++) {
    var c = text.charAt(i);
    var p = pattern.charCodeAt(i);

    if (p >= 65 && p < 65 + 26) {
      result += c.toUpperCase();
    } else {
      result += c.toLowerCase();
    }
  }

  return result;
}

chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const [tab] = tabs;

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

  chrome.tabs.sendMessage(tab.id, { text: "getSelection" }, (response) => {
    if (!response) {
      document.getElementById("text").textContent = "Select text and try again";
      return;
    }

    const newText = response.replace(/no but/gi, (match) =>
      matchCase("yes and", match)
    );

    navigator.clipboard.writeText(newText);

    document.getElementById("text").textContent = "Copied to clipboard!";
  });
});
