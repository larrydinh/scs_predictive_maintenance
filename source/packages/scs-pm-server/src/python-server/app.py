import logging

import joblib
import pandas as pd
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

    modelObj = joblib.load(modelPath)

    column_names = ["speed_desired_max","speed_avg","temperature_avg","temperature_max","pressure_avg","pressure_max","temperature_avg_avg","temperature_max_avg","pressure_avg_avg","pressure_max_avg"]
    data = [[1000.0,1162.84,187.61,214.81,497.7,615.16,169.8,176.17,723.8,842.19]]
    df = pd.DataFrame(data=data, columns = column_names)

    modelPrediction = modelObj.predict(df)
    app.logger.info('Model prediction is: %s', modelPrediction)

    return jsonify(machineID=incomingMachineId, modelPath=modelPath, output=modelPrediction[0])

if __name__ == "__main__":
    app.run(debug=True)


# To start the server
# python3 app.py
