# 🏪 Admin Dashboard & AI Business Consultant Chatbot

Project ini merupakan **sistem admin sederhana untuk manajemen pembelian toko** yang dilengkapi dengan **Chatbot AI Business Consultant**.  
Aplikasi dibangun menggunakan **Node.js, Express.js, EJS, dan SQL Database** dengan tampilan UI modern dan responsif.

Project ini dibuat untuk memenuhi **pretest technical test Web Developer / IT Support**.

---

## 📌 Fitur Utama

### 1️⃣ Admin Page – Manajemen Pembelian
- Input data pembelian produk oleh admin
- Pembatalan (cancel) pembelian oleh admin toko
- Tampilan daftar transaksi terbaru
- Status transaksi (**SUCCESS / CANCELLED**)
- Update stok produk otomatis berdasarkan transaksi

### 2️⃣ Manajemen Database
Menggunakan database SQL dengan struktur:
- **Produk** (10 produk awal)
- **Stok Produk**
- **Pembelian**

### 3️⃣ AI Business Consultant Chatbot
- Chatbot interaktif seperti aplikasi chat
- Chat user di sebelah kanan, AI di sebelah kiri
- Indikator *“AI sedang mengetik…”*
- Kirim pesan menggunakan **Enter** atau tombol kirim
- Terintegrasi API AI (**Gemini**)
- Digunakan sebagai konsultan bisnis & penjualan toko

---

## 🛠 Teknologi yang Digunakan

- **Node.js**
- **Express.js**
- **EJS (Embedded JavaScript Template)**
- **SQL Database** (MySQL / SQLite / PostgreSQL)
- **HTML & CSS (Custom UI)**
- **JavaScript (Fetch API)**
- **AI API (Gemini)**

---

## 📂 Struktur Folder

ADMIN-CHATBOT/
│
├── app.js
├── package.json
├── .env
├── README.md
│
├── routes/
│ ├── purchase.routes.js
│ └── chat.routes.js
│
├── views/
│ ├── dashboard.ejs
│ └── layout.ejs
│
├── public/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── chat.js
│
└── database/
└── database.sql


---

## 🗄 Struktur Database

### 📦 Produk
| id | nama_produk | harga |
|----|------------|-------|

### 📊 Stok Produk
| id | produk_id | stock |
|----|-----------|-------|

### 🧾 Pembelian
| id | produk_id | qty | status | created_at |
|----|-----------|-----|--------|------------|

---

## 🚀 Cara Menjalankan Project

### 1️⃣ Clone Repository
```bash
git clone https://github.com/username/nama-repo.git
cd nama-repo

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment

Buat file .env

PORT=3000
GEMINI_KEY=YOUR_API_KEY

4️⃣ Jalankan Server
node app.js


Akses aplikasi melalui browser:

http://localhost:3000

💬 Cara Menggunakan Chatbot AI

Ketik pesan pada kolom input chat

Tekan Enter atau klik tombol Kirim

Tunggu balasan dari AI (akan muncul indikator “AI sedang mengetik…”)

Gunakan chatbot untuk konsultasi bisnis toko, seperti:

-Strategi meningkatkan penjualan

-Analisis produk

-Ide promo dan pemasaran

-Saran operasional toko