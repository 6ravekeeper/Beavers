from flask_cors import CORS
from flask import Flask, request, jsonify
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# путь к бд
DB_PATH = os.path.join(os.path.dirname(__file__), "orders.db")

# делаем если нет
def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        with open(os.path.join(os.path.dirname(__file__), "schema.sql"), "r") as f:
            conn.executescript(f.read())

@app.route("/api/order", methods=["POST"])
def create_order():
    data = request.get_json()

    name = data.get("name")
    phone = data.get("phone")
    address = data.get("address")
    quantity = data.get("quantity")
    water_types = ", ".join(data.get("water_types", []))

    if not name or not phone or not address or not quantity or not water_types:
        return jsonify({"status": "error", "message": "Invalid data"}), 400

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO orders (name, phone, address, quantity, water_types)
            VALUES (?, ?, ?, ?, ?)
        """, (name, phone, address, quantity, water_types))
        conn.commit()

    return jsonify({"status": "ok"}), 201

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
