alert("NEW SCRIPT LOADED");const API_KEY = "AQ.Ab8RN6LZp9PvgUwtF2XG7TyHoTMDK-KCL_vcJ-vH0UD8AlmEWw";
const MODEL = "gemini-2.5-flash";

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(message) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();console.log(data);
alert(JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error(data);
      return "API Error: " + (data.error?.message || "Unknown error");
    }

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI."
    );
  } catch (err) {
    console.error(err);
    return "Network Error: " + err.message;
  }
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  addMessage("Thinking...", "ai");

  const reply = await getAIResponse(message);

  chatBox.removeChild(chatBox.lastChild);
  addMessage(reply, "ai");
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});