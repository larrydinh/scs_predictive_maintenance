from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/api/machinePrediction")
def home():
    return jsonify(machinePrediction='F1')

if __name__ == "__main__":
    app.run(debug=True)


# To start the server
# python3 app.py
