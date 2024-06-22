from flask import Flask, request, jsonify
from flask_cors import CORS
from dao import save_text_to_db

app = Flask(__name__)

# calling CORS on the app allows everyone to get info from the app. By default, servers an only request from themselves
CORS(app)


# This function will run when user wants to process the text.
@app.route("/process_text", methods=["POST"])
def process_text():
    data = request.get_json()
    if "texts" in data:
        texts = data["texts"]
        save_text_to_db(texts)
        return jsonify({}), 200
    else:
        return jsonify({"message": "No text provided"}), 400

# This function will run when user saves the note, note is saved in db.
@app.route("/save_text", methods=["POST"])
def save_text():
    data = request.get_json()
    if data:
        process_text_input(data)
        return jsonify({}), 200
    else:
        return jsonify({"message": "No text provided"}), 400



if __name__ == "__main__":
    # debug=True will rerun the code whenever a change is made.
    app.run(debug=True)
