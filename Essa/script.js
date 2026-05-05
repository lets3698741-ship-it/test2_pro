function setTheme(theme) {
    const cssFile = document.getElementById("theme-style");
    const nextTheme = theme === "dark" ? "dark" : "light";

    if (cssFile) {
        cssFile.href = nextTheme === "dark" ? "dark.css" : "style.css";
    }

    localStorage.setItem("theme", nextTheme);
    updateThemeButtons(nextTheme);
}

function updateThemeButtons(theme) {
    document.querySelectorAll(".theme-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.theme === theme);
    });
}

function getSavedUsers() {
    return JSON.parse(localStorage.getItem("libraryUsers")) || [];
}

function saveUsers(users) {
    localStorage.setItem("libraryUsers", JSON.stringify(users));
}

function showPopup(message, redirectTo = "") {
    const oldPopup = document.querySelector(".popup-backdrop");

    if (oldPopup) {
        oldPopup.remove();
    }

    const popup = document.createElement("div");
    popup.className = "popup-backdrop";
    popup.dataset.redirect = redirectTo;
    popup.innerHTML = `
        <div class="popup-box" role="dialog" aria-modal="true" aria-live="polite">
            <p>${message}</p>
            <button class="primary-btn popup-btn" type="button">OK</button>
        </div>
    `;

    document.body.appendChild(popup);

    popup.addEventListener("click", (event) => {
        if (!event.target.classList.contains("popup-btn")) {
            return;
        }

        const nextPage = popup.dataset.redirect;
        popup.remove();

        if (nextPage) {
            window.location.assign(nextPage);
        }
    });
}

function handleSignUp() {
    const form = document.querySelector(".account-form");

    if (!form || !document.getElementById("full-name")) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const termsAccepted = document.getElementById("terms").checked;

        if (!name || !email || !password || !termsAccepted) {
            showPopup("Please complete all required fields.");
            return;
        }

        const users = getSavedUsers();
        const emailExists = users.some((user) => user.email === email);

        if (emailExists) {
            showPopup("This email already has an account.");
            return;
        }

        users.push({ name, email, password });
        saveUsers(users);

        showPopup("Account created successfully.", "sign-in.html");
    });
}

function handleSignIn() {
    const form = document.querySelector(".account-form");

    if (!form || !document.getElementById("login-email")) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;
        const users = getSavedUsers();
        const matchedUser = users.find((user) => user.email === email && user.password === password);

        if (!matchedUser) {
            showPopup("Email or password is incorrect.");
            return;
        }

        localStorage.setItem("currentUser", matchedUser.email);
        showPopup(`Welcome back, ${matchedUser.name}.`, "index.html");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    document.querySelectorAll(".theme-btn").forEach((button) => {
        button.addEventListener("click", () => {
            setTheme(button.dataset.theme);
        });
    });

    handleSignUp();
    handleSignIn();
});
