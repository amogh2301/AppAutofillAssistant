document.getElementById("profileForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let file = document.getElementById("resumeUpload").files[0];

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            saveProfile(reader.result); // Save resume in `chrome.storage.local`
        };
    } else {
        saveProfile(null);
    }
});

function saveProfile(resumeBase64) {
    let userProfile = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        linkedin: document.getElementById("linkedin").value,
        workExperience: document.getElementById("workExperience").value,
        education: document.getElementById("education").value,
    };

    // Save profile (except resume) in chrome.storage.sync
    chrome.storage.sync.set({ userProfile }, function () {
        console.log("Profile Saved (Without Resume):", userProfile);
    });

    // Save the resume separately in chrome.storage.local
    if (resumeBase64) {
        chrome.storage.local.set({ resume: resumeBase64 }, function () {
            console.log("Resume Saved Separately");
        });
    }

    alert("Profile Saved!");
}
