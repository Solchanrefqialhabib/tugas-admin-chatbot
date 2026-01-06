// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config();

// const app = express();
// const db = new sqlite3.Database('./toko.db');

// app.set('view engine', 'ejs');
// app.use(express.static('public')); // Menangani file CSS/JS
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // --- DATABASE TRANSACTION LOGIC ---
// db.serialize(() => {
//     // Definisi 3 Tabel sesuai Soal
//     db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL)");
//     db.run("CREATE TABLE IF NOT EXISTS stock (product_id INTEGER, qty INTEGER)");
//     db.run("CREATE TABLE IF NOT EXISTS purchases (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, qty INTEGER, status TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

//     // Seeding Data (10 Produk)
//     db.get("SELECT count(*) as count FROM products", (err, row) => {
//         if (row && row.count === 0) {
//             const items = [['Kopi Susu', 15000], ['Roti Bakar', 20000], ['Teh Tarik', 12000], ['Susu Jahe', 10000], ['Kentang Goreng', 18000], ['Nasi Goreng', 25000], ['Mie Instan', 10000], ['Ayam Geprek', 22000], ['Es Jeruk', 8000], ['Air Mineral', 5000]];
//             items.forEach((item, i) => {
//                 db.run("INSERT INTO products (name, price) VALUES (?, ?)", item);
//                 db.run("INSERT INTO stock (product_id, qty) VALUES (?, ?)", [i + 1, 50]);
//             });
//         }
//     });
// });

// // --- MODERN CONTROLLERS ---
// app.get('/', (req, res) => {
//     const qProd = "SELECT p.*, s.qty FROM products p JOIN stock s ON p.id = s.product_id";
//     const qHist = "SELECT pur.*, p.name FROM purchases pur JOIN products p ON pur.product_id = p.id ORDER BY pur.id DESC LIMIT 10";
//     db.all(qProd, (err, products) => {
//         db.all(qHist, (err, history) => {
//             res.render('index', { products: products || [], history: history || [] });
//         });
//     });
// });

// // Pembelian dengan Atomicity (Database Transaction)
// app.post('/buy', (req, res) => {
//     const { product_id, qty } = req.body;
//     const numQty = parseInt(qty);

//     db.get("SELECT qty FROM stock WHERE product_id = ?", [product_id], (err, row) => {
//         if (row && row.qty >= numQty) {
//             db.serialize(() => {
//                 db.run("BEGIN TRANSACTION");
//                 db.run("UPDATE stock SET qty = qty - ? WHERE product_id = ?", [numQty, product_id]);
//                 db.run("INSERT INTO purchases (product_id, qty, status) VALUES (?, ?, 'SUCCESS')", [product_id, numQty]);
//                 db.run("COMMIT", (err) => {
//                     res.json({ success: true, message: "Pembelian berhasil!" });
//                 });
//             });
//         } else {
//             res.status(400).json({ success: false, message: "Stok tidak mencukupi!" });
//         }
//     });
// });

// app.post('/cancel/:id', (req, res) => {
//     db.get("SELECT * FROM purchases WHERE id = ?", [req.params.id], (err, row) => {
//         if (row && row.status === 'SUCCESS') {
//             db.serialize(() => {
//                 db.run("BEGIN TRANSACTION");
//                 db.run("UPDATE stock SET qty = qty + ? WHERE product_id = ?", [row.qty, row.product_id]);
//                 db.run("UPDATE purchases SET status = 'CANCELLED' WHERE id = ?", [req.params.id]);
//                 db.run("COMMIT", () => res.json({ success: true }));
//             });
//         }
//     });
// });

// // AI Service (Menggunakan Gemini 1.5 Flash untuk performa modern)
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
// app.post('/chat', async (req, res) => {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//         const result = await model.generateContent(req.body.message);
//         res.json({ reply: result.response.text() });
//     } catch (e) {
//         res.status(500).json({ reply: "AI Error: Layanan tidak dapat dijangkau." });
//     }
// });

// app.listen(3000, () => console.log('🚀 Dashboard Modern aktif di http://localhost:3000'));

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes/purchase.routes"));
app.use("/chat", require("./routes/chat.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


