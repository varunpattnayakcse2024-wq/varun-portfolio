// LOGIN SYSTEM
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username && password) {
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                window.location.href = "dashboard.html";
            }
        });
    }

    // Dashboard Welcome + Load Notes
    const welcomeUser = document.getElementById("welcomeUser");
    if (welcomeUser) {
        const user = localStorage.getItem("username");
        if (!user) {
            window.location.href = "index.html";
        }
        welcomeUser.innerText = "Welcome, " + user + " 🚀";

        loadLastFile();
    }
});

// NOTEPAD SYSTEM
function newFile() {
    document.getElementById("notepad").value = "";
}

function saveFile() {
    const fileName = document.getElementById("fileName").value;
    const content = document.getElementById("notepad").value;
    const user = localStorage.getItem("username");

    if (!fileName) {
        alert("Enter file name!");
        return;
    }

    localStorage.setItem(user + "_" + fileName, content);
    localStorage.setItem(user + "_lastFile", fileName);

    alert("File Saved Successfully 🚀");
}

function deleteFile() {
    const fileName = document.getElementById("fileName").value;
    const user = localStorage.getItem("username");

    localStorage.removeItem(user + "_" + fileName);
    document.getElementById("notepad").value = "";
    alert("File Deleted 🗑");
}

function loadLastFile() {
    const user = localStorage.getItem("username");
    const lastFile = localStorage.getItem(user + "_lastFile");

    if (lastFile) {
        document.getElementById("fileName").value = lastFile;
        document.getElementById("notepad").value =
            localStorage.getItem(user + "_" + lastFile) || "";
    }
}

// LOGOUT (ERASE ALL NOTES)
function logout() {
    const user = localStorage.getItem("username");

    // Remove all files of that user
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(user + "_")) {
            localStorage.removeItem(key);
        }
    });

    localStorage.removeItem("username");
    localStorage.removeItem("password");

    alert("Logged out & Notes Erased 🔐");
    window.location.href = "index.html";
}
