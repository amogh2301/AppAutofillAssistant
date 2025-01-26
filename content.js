console.log("Job Application Assistant Content Script Loaded");

document.addEventListener("DOMContentLoaded", function () {
    let forms = document.querySelectorAll("form");

    if (forms.length === 0) {
        console.log("No forms detected on this page.");
        return;
    }

    forms.forEach((form) => {
        if (formContainsJobFields(form)) {
            injectFloatingButton(form);
        }
    });
});

function formContainsJobFields(form) {
    const keywords = ["name", "email", "phone", "resume", "linkedin", "work", "education"];
    return Array.from(form.elements).some(input =>
        keywords.some(keyword =>
            input.name?.toLowerCase().includes(keyword) || 
            input.placeholder?.toLowerCase().includes(keyword) // Check placeholders too
        )
    );
}

function injectFloatingButton(form) {
    let button = document.createElement("button");
    button.innerText = "Autofill Job App";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "1000";
    button.style.padding = "10px";
    button.style.background = "#007bff";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.onclick = () => autofillForm(form);

    document.body.appendChild(button);
    console.log("Floating button injected.");
}

chrome.runtime.sendMessage({ action: "getProfile" }, function (response) {
    if (response && response.profile) {
        console.log("Profile Data in Content Script:", response.profile);
    } else {
        console.log("No profile found.");
    }
});