import logging
import pickle

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/api/machinePrediction", methods=['GET'])
def home():
    incomingMachineId = request.args.get('machineId')
    modelPath = request.args.get('modelPath')
    app.logger.info('Received machine id is %s', incomingMachineId)
    app.logger.info('Model path is %s', modelPath)

    favorite_color = pickle.load( open( modelPath ) )

    # object_file = pickle.load(modelPath, "rb")
    # app.logger.info('Model path is %s', favorite_color)

    return jsonify(machineID=incomingMachineId, modelPath=modelPath)

if __name__ == "__main__":
    app.run(debug=True)


# To start the server
# python3 app.py
