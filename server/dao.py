import numpy as np
from pinecone import Pinecone
from transformers import pipeline
from load_env import pinecone_api_key

# Initialize the text embedding model
embedding_pipeline = pipeline(
    "feature-extraction", model="sentence-transformers/all-MiniLM-L6-v2"
)


# Function to generate embeddings
def _generate_embeddings(texts: list[str]):
    embeddings = [np.mean(embedding_pipeline(text)[0], axis=0) for text in texts]
    return embeddings


# Initialize Pinecone
pinecone = Pinecone(api_key=pinecone_api_key)


# Create or connect to an index
index_name = "text-similarity"
index = pinecone.Index(index_name)


# Function to save embeddings to Pinecone
def _save_embeddings_to_pinecone(titles, texts, embeddings):
    items = [
        {
            "id": str(i),
            "values": embedding.tolist(),
            "metadata": {"text": text, "title": title},
        }
        for i, (title, text, embedding) in enumerate(zip(titles, texts, embeddings))
    ]
    index.upsert(items)


def save_text_to_db(titles, texts):
    # Generate embeddings
    embeddings = _generate_embeddings(texts)

    # Save embeddings to Pinecone
    _save_embeddings_to_pinecone(titles, texts, embeddings)


def query_similar_texts(text: str, top_k=5):
    embeddings = _generate_embeddings([text])
    results = index.query(queries=[embeddings], top_k=top_k)
    similar_texts = [
        {"text": match["metadata"]["text"], "title": match["metadata"]["title"]}
        for match in results["matches"]
    ]
    return similar_texts
