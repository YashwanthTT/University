const form = document.getElementById("myForm");
const userList = document.getElementById("userList");
const emptyState = document.getElementById("emptyState");
const userCount = document.getElementById("userCount");

const fields = {
    name: document.getElementById("name"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
    phone: document.getElementById("phone"),
};

const errors = {
    name: document.getElementById("nameError"),
    password: document.getElementById("passwordError"),
    confirmPassword: document.getElementById("confirmError"),
    phone: document.getElementById("phoneError"),
};

// --- helpers ---
const setError = (field, msg) => {
    errors[field].textContent = msg;
    fields[field].classList.add("input-error");
    fields[field].setAttribute("aria-invalid", "true");
};

const clearError = (field) => {
    errors[field].textContent = "";
    fields[field].classList.remove("input-error");
    fields[field].removeAttribute("aria-invalid");
};

const clearAllErrors = () => Object.keys(errors).forEach(clearError);

const updateEmptyState = () => {
    const count = userList.children.length;
    emptyState.style.display = count === 0 ? "block" : "none";
    userCount.textContent = `${count} ${count === 1 ? "user" : "users"}`;
};

// --- validation ---
const validators = {
    name: (value) => {
        if (!value) return "Name is required.";
        if (value.length < 4) return "Name must be at least 4 characters.";
        if (!/^[A-Z]/.test(value)) return "First letter must be uppercase (A-Z).";
        if (!/^[A-Za-z ]+$/.test(value)) return "Name can only contain letters and spaces.";
        return "";
    },
    password: (value) => {
        if (!value) return "Password is required.";
        if (value.length < 6) return "Password must be at least 6 characters.";
        return "";
    },
    confirmPassword: (value, all) => {
        if (!value) return "Please confirm your password.";
        if (value !== all.password) return "Passwords do not match.";
        return "";
    },
    phone: (value) => {
        if (!value) return "Phone number is required.";
        if (!/^[0-9]{10}$/.test(value)) return "Enter exactly 10 digits (0-9).";
        return "";
    },
};

const validateAll = () => {
    clearAllErrors();
    const values = {
        name: fields.name.value.trim(),
        password: fields.password.value,
        confirmPassword: fields.confirmPassword.value,
        phone: fields.phone.value.trim(),
    };

    let isValid = true;
    for (const key of Object.keys(validators)) {
        const msg = validators[key](values[key], values);
        if (msg) {
            setError(key, msg);
            isValid = false;
        }
    }
    return isValid ? values : null;
};

// live clear on input + phone digit filtering
Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => clearError(key));
});

fields.phone.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
});

// --- user creation ---
const createUserItem = (name, phone) => {
    const li = document.createElement("li");
    li.className = "user-item";

    const info = document.createElement("div");
    info.className = "user-info";

    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = name.charAt(0).toUpperCase();
    avatar.setAttribute("aria-hidden", "true");

    const text = document.createElement("span");
    text.className = "user-text";
    text.textContent = `${name} — ${phone}`;

    info.append(avatar, text);

    const actions = document.createElement("div");
    actions.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "actionBtn deleteBtn";
    deleteBtn.setAttribute("aria-label", `Delete ${name}`);
    deleteBtn.addEventListener("click", () => {
        li.classList.add("removing");
        li.addEventListener("animationend", () => {
            li.remove();
            updateEmptyState();
        });
    });

    actions.appendChild(deleteBtn);
    li.append(info, actions);
    return li;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = validateAll();
    if (!values) return;

    const item = createUserItem(values.name, values.phone);
    userList.appendChild(item);
    // entry animation
    requestAnimationFrame(() => item.classList.add("entered"));

    form.reset();
    clearAllErrors();
    fields.name.focus();
    updateEmptyState();
});

updateEmptyState();
