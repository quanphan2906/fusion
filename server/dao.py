import numpy as np
from pinecone import Pinecone
from transformers import pipeline
from load_env import pinecone_api_key

# Initialize the text embedding model
embedding_pipeline = pipeline(
    "feature-extraction", model="sentence-transformers/all-MiniLM-L6-v2"
)


# Function to generate embeddings
def _generate_embeddings(texts):
    embeddings = [np.mean(embedding_pipeline(text)[0], axis=0) for text in texts]
    return embeddings


# Initialize Pinecone
pinecone = Pinecone(api_key=pinecone_api_key)


# Create or connect to an index
index_name = "text-similarity"
index = pinecone.Index(index_name)


# Function to save embeddings to Pinecone
def _save_embeddings_to_pinecone(texts, embeddings):
    items = [
        {"id": str(i), "values": embedding.tolist(), "metadata": {"text": text}}
        for i, (text, embedding) in enumerate(zip(texts, embeddings))
    ]
    index.upsert(items)


def save_text_to_db(texts):
    # Generate embeddings
    embeddings = _generate_embeddings(texts)

    # Save embeddings to Pinecone
    _save_embeddings_to_pinecone(texts, embeddings)


def process_text_input(texts):
    # Generate embeddings
    embeddings = _generate_embeddings(texts)
    result = index.query(queries=[embeddings], top_k=5)
    # Print results
    for match in result['matches']:
        print(f"ID: {match['id']}, Score: {match['score']}, Text: {texts[int(match['id'])]}")
