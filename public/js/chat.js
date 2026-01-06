const chatbox = document.getElementById("chatbox");
const input = document.getElementById("msg");
const typing = document.getElementById("typing");

/* KIRIM SAAT ENTER */
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendChat();
  }
});

function addChat(role, text) {
  const div = document.createElement("div");
  div.className = `chat ${role}`;
  div.innerText = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendChat() {
  const message = input.value.trim();
  if (!message) return;

  addChat("user", message);
  input.value = "";

  typing.style.display = "block";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    typing.style.display = "none";
    addChat("ai", data.reply || "AI tidak memberikan jawaban.");
  } catch (err) {
    typing.style.display = "none";
    addChat("ai", "Terjadi kesalahan pada AI.");
  }
}
