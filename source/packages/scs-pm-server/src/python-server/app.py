import logging
import pickle

import joblib
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
    # model_object = pickle.load(open(modelPath, "rb"))
    # speed_desired_max,speed_avg,temperature_avg,temperature_max,pressure_avg,pressure_max,temperature_avg_avg,temperature_max_avg,pressure_avg_avg,pressure_max_avg

    modelObj = joblib.load(modelPath)
    output1 = modelObj.predict([[1000.0,969.25,153.72,153.97,922.06,1117.25,152.56,153.35,854.19,1131.36]])
    app.logger.info('End Model Object....', output1)
    # object_file = pickle.load(modelPath, "rb")
    # app.logger.info('Model path is %s', favorite_color)

    return jsonify(machineID=incomingMachineId, modelPath=modelPath)

if __name__ == "__main__":
    app.run(debug=True)


# To start the server
# python3 app.py
