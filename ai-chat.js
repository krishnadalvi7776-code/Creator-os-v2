

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearChat");
const micBtn = document.getElementById("micBtn");

// ---------------- CHAT SAVE ----------------
function saveChat() {
    localStorage.setItem("creatoros_chat", chatBox.innerHTML);
}

// ---------------- ADD MESSAGE ----------------
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add(sender === "user" ? "user-message" : "ai-message");

    const textDiv = document.createElement("div");
    textDiv.innerText = text;
    msg.appendChild(textDiv);

    // Copy button only for AI
    if (sender === "ai") {
        const copyBtn = document.createElement("button");
        copyBtn.innerText = "📋 Copy";
        copyBtn.classList.add("copy-btn");

        copyBtn.onclick = () => {
            navigator.clipboard.writeText(text);
            copyBtn.innerText = "✅ Copied";
            setTimeout(() => (copyBtn.innerText = "📋 Copy"), 1500);
        };

        msg.appendChild(copyBtn);
    }

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    saveChat();
}

// ---------------- TYPING EFFECT ----------------
async function typeMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("ai-message");

    const textDiv = document.createElement("div");
    msg.appendChild(textDiv);

    chatBox.appendChild(msg);

    const words = text.split(" ");

    for (let i = 0; i < words.length; i++) {
        textDiv.innerText += (i === 0 ? "" : " ") + words[i];
        chatBox.scrollTop = chatBox.scrollHeight;
        await new Promise(r => setTimeout(r, 40));
    }

    // Copy button after typing
    const copyBtn = document.createElement("button");
    copyBtn.innerText = "📋 Copy";
    copyBtn.classList.add("copy-btn");

    copyBtn.onclick = () => {
        navigator.clipboard.writeText(text);
        copyBtn.innerText = "✅ Copied";
        setTimeout(() => (copyBtn.innerText = "📋 Copy"), 1500);
    };

    msg.appendChild(copyBtn);

    saveChat();
}

// ---------------- LOADING ----------------
function showLoading() {
    const loading = document.createElement("div");
    loading.classList.add("ai-message");
    loading.innerText = "Thinking...";
    loading.id = "loadingMsg";
    chatBox.appendChild(loading);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLoading() {
    const loading = document.getElementById("loadingMsg");
    if (loading) loading.remove();
}

// ---------------- AI CALL ----------------
async function getAIResponse(message) {
    showLoading();

    try {
        const res = await fetch("https://creator-os-in7s.onrender.com/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: message
    })
});
        const data = await res.json();

        removeLoading();

        if (!res.ok) {
           addMessage("API Error: " + (data?.error || "Unknown error"), "ai");
            return;
        }

       const reply = data.reply;

        if (!reply) {
            addMessage("No response from AI 😕", "ai");
            return;
        }

        await typeMessage(reply);

    } catch (error) {
        removeLoading();
        addMessage("Network error ⚠️ Check internet or API key", "ai");
    }
}

// ---------------- SEND MESSAGE ----------------
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    getAIResponse(message);
}

// ---------------- EVENTS ----------------
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

// ---------------- CLEAR CHAT ----------------
clearBtn.addEventListener("click", () => {
    chatBox.innerHTML = `<div class="ai-message">👋 Chat cleared. How can I help you?</div>`;
    saveChat();
});

// ---------------- LOAD CHAT ----------------
window.onload = () => {
    const saved = localStorage.getItem("creatoros_chat");
    if (saved) {
        chatBox.innerHTML = saved;
    }
};

// ---------------- VOICE INPUT ----------------
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "hi-IN";
recognition.continuous = false;
recognition.interimResults = false;

micBtn.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    userInput.value = text;
};

recognition.onerror = (event) => {
    alert("Mic Error: " + event.error);
};