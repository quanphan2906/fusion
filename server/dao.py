import numpy as np
import pinecone
from transformers import pipeline

# Initialize the text embedding model
embedding_pipeline = pipeline(
    "feature-extraction", model="sentence-transformers/all-MiniLM-L6-v2"
)


# Function to generate embeddings
def generate_embeddings(texts):
    embeddings = [np.mean(embedding_pipeline(text)[0], axis=0) for text in texts]
    return embeddings


# Initialize Pinecone
pinecone.init(api_key="your-pinecone-api-key", environment="your-pinecone-environment")

# Create or connect to an index
index_name = "your-index-name"
if index_name not in pinecone.list_indexes():
    pinecone.create_index(index_name, dimension=384, metric="cosine")
index = pinecone.Index(index_name)


# Function to save embeddings to Pinecone
def save_embeddings_to_pinecone(texts, embeddings):
    items = [
        {"id": str(i), "values": embedding.tolist(), "metadata": {"text": text}}
        for i, (text, embedding) in enumerate(zip(texts, embeddings))
    ]
    index.upsert(items)


def save_text_to_db(texts):
    # Generate embeddings
    embeddings = generate_embeddings(texts)

    # Save embeddings to Pinecone
    save_embeddings_to_pinecone(texts, embeddings)
