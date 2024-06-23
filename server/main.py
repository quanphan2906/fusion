from flask import Flask, request, jsonify
from flask_cors import CORS
import dao

app = Flask(__name__)

# calling CORS on the app allows everyone to get info from the app. By default, servers an only request from themselves
CORS(app)


# This function will run when user wants to process the text.
@app.route("/process_text", methods=["POST"])
def process_text():
    data = request.get_json()
    title = data.get("title", None)
    texts = data.get("texts", None)

    titles = [title for i in range(len(texts))]

    if title and texts:
        dao.save_text_to_db(titles, texts)
        return jsonify({}), 200
    else:
        return jsonify({"message": "No text provided"}), 400


# This function will run when user saves the note, note is saved in db.
@app.route("/query_text", methods=["POST"])
def save_text():
    data = request.get_json()
    text = data.get("text", None)
    if text:
        similar_text = dao.query_similar_texts(text)
        return jsonify({"result": similar_text}), 200
    else:
        return jsonify({"message": "No text provided"}), 400


@app.route("/update-doc", methods=["POST"])
def update_doc():
    data = request.get_json()
    old_title = data.get("old_title")
    new_title = data.get("new_title")
    new_blocks = data.get("new_blocks")

    if old_title is None:
        return jsonify({"message": "old_title is required"}), 400

    try:
        res = dao.update_doc(old_title, new_title, new_blocks)
        return jsonify({res}), 200
    except Exception as e:
        return jsonify({"message": e}), 400


@app.route("/delete-doc", methods=["POST"])
def delete_doc():
    data = request.json()
    title = data.get("title")

    try:
        dao.delete_doc(title)
        return jsonify({}), 200
    except Exception as e:
        return jsonify({"message": e}), 400


if __name__ == "__main__":
    # debug=True will rerun the code whenever a change is made.
    app.run(debug=True)
