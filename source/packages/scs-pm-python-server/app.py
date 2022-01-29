from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/api/machinePrediction", methods=['GET'])
def home():
    incomingMachineId = request.args.get('machineId')
    return jsonify(machinePrediction=incomingMachineId)

if __name__ == "__main__":
    app.run(debug=True)


# To start the server
# python3 app.py
