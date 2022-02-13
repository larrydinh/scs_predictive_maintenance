import json
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
    column_names = request.args.get('columnNames')
    data_points = request.args.get('dataPoints')

    app.logger.info('Received machine id is %s', incomingMachineId)
    app.logger.info('Model path is %s', modelPath)

    json_object = json.loads(data_points)
    pairs = json_object.items()

    vitals_value = []
    for key, value in pairs:
      vitals_value.append(value)

    modelObj = joblib.load(modelPath)

    data = [vitals_value]
    df = pd.DataFrame(data=data, columns = column_names)

    modelPrediction = modelObj.predict(df)
    app.logger.info('Model prediction is: %s', modelPrediction)

    return jsonify(modelPrediction[0])

if __name__ == "__main__":
    app.run(debug=True)


# To start the server
# python3 app.py
