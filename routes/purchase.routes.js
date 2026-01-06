const express = require("express");
const router = express.Router();
const db = require("../db/database");

// Dashboard
router.get("/", (req, res) => {
  db.all(`
    SELECT p.id, p.name, p.price, s.qty
    FROM products p
    JOIN stocks s ON p.id = s.product_id
  `, (err, products) => {

    db.all(`
      SELECT pu.id, p.name, pu.qty, pu.status
      FROM purchases pu
      JOIN products p ON pu.product_id = p.id
      ORDER BY pu.id DESC
    `, (err, purchases) => {
      res.render("index", { products, purchases });
    });
  });
});

// Proses pembelian
router.post("/buy", (req, res) => {
  const { product_id, qty } = req.body;

  db.get("SELECT qty FROM stocks WHERE product_id=?", [product_id], (err, stock) => {
    if (stock.qty < qty) return res.redirect("/");

    db.run(
      "INSERT INTO purchases (product_id, qty, status) VALUES (?,?,?)",
      [product_id, qty, "SUCCESS"]
    );

    db.run(
      "UPDATE stocks SET qty = qty - ? WHERE product_id=?",
      [qty, product_id]
    );

    res.redirect("/");
  });
});

// Cancel pembelian
router.post("/cancel/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM purchases WHERE id=?", [id], (err, purchase) => {
    if (purchase.status === "CANCELLED") return res.redirect("/");

    db.run("UPDATE purchases SET status='CANCELLED' WHERE id=?", [id]);
    db.run(
      "UPDATE stocks SET qty = qty + ? WHERE product_id=?",
      [purchase.qty, purchase.product_id]
    );

    res.redirect("/");
  });
});

module.exports = router;
