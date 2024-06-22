from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Access the variables
pinecone_api_key = os.getenv("PINECONE_API_KEY")
