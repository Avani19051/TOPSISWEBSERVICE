from flask import Flask, request, render_template, Response
import numpy as np
import pandas as pd
from topsis import topsis

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_topsis():
    file = request.files.get("file")
    weights_raw = request.form.get("weights")
    impacts_raw = request.form.get("impacts")

    if not file or not weights_raw or not impacts_raw:
        return "Invalid input", 400

    weights = np.array(list(map(float, weights_raw.split(","))))
    weights = weights / weights.sum()
    impacts = impacts_raw.split(",")

    df = pd.read_csv(file)

    result_df = topsis(
        df,
        weights=weights,
        impacts=impacts
    )

    csv_data = result_df.to_csv(index=False)

    return Response(
        csv_data,
        mimetype="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=result.csv"
        }
    )


if __name__ == "__main__":
    app.run()
