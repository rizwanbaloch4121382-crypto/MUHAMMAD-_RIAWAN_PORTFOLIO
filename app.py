from flask import Flask, render_template, jsonify
import json
from pathlib import Path

app = Flask(__name__)
DATA = Path(__file__).parent / "static" / "data" / "industries.json"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/industries")
def industries():
    return jsonify(json.loads(DATA.read_text(encoding="utf-8")))

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
