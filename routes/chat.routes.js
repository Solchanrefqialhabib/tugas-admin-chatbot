const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const SYSTEM_CONTEXT = `
Kamu adalah AI Business Consultant untuk toko kecil.
Tugas kamu:
- Memberi saran penjualan
- Memberi ide promosi
- Membantu pemilik toko UMKM
Jawaban harus:
- Bahasa Indonesia
- Singkat, jelas, dan praktis
`;

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: SYSTEM_CONTEXT + "\n\nPertanyaan: " + userMessage }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.candidates?.length > 0) {
      res.json({
        reply: data.candidates[0].content.parts[0].text
      });
    } else {
      res.json({ reply: "AI tidak memberikan jawaban." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Gagal menghubungi AI." });
  }
});

module.exports = router;
