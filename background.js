chrome.runtime.onStartup.addListener(() => {
    console.log("Service Worker Started");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProfile") {
        chrome.storage.sync.get(["userProfile"], function (data) {
            sendResponse({ profile: data.userProfile || {} });
        });
        return true; // Keep the message channel open for async response
    }

    if (request.action === "test") {
        console.log("Background Service Worker is Running");
        sendResponse({ message: "Service Worker is Active" });
    }
});
