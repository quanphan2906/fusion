from flask import Flask, request, jsonify
from flask_cors import CORS
import dao

app = Flask(__name__)

# calling CORS on the app allows everyone to get info from the app. By default, servers an only request from themselves
CORS(app)


# This function will run when user saves the note, note is saved in db.
@app.route("/query_text", methods=["POST"])
def save_text():
    data = request.get_json()
    text = data.get("text", None)
    if text:
        similar_text = dao.query_similar_texts(text)
        return jsonify({"results": similar_text}), 200
    else:
        return jsonify({"message": "No text provided"}), 400


@app.route("/upsert-doc", methods=["POST"])
def upsert_doc():
    """
    This function is used for two purposes: updating title and updating the content.

    However, it should only be used when the doc has content. If the doc only has title, even when the title was changed by the user, don't call this function. In fact, don't call the backend at all. So when a new doc is created with only title, don't call this function. Only call when there starts to be content.

    When the doc has title and content, when:
    - the title changes, pass in old_title and new_title, leave new_blocks undefined
    - the content changes, pass in old_title and new_blocks, leave new_title undefined
    - both title and content change, pass in old_title, new_title, and new_blocks
    """
    data = request.get_json()
    old_title = data.get("old_title")
    new_title = data.get("new_title")
    new_blocks = data.get("new_blocks")

    if old_title is None:
        return jsonify({"message": "old_title is required"}), 400

    try:
        res = dao.upsert_doc(old_title, new_title, new_blocks)
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
