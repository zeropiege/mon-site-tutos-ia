---
title: "RAG local avec Ollama et ChromaDB"
category: "Avancé"
tags: ["rag", "chromadb", "embeddings", "ollama"]
published: true
created_at: "2024-01-20T14:30:00Z"
updated_at: "2024-01-20T14:30:00Z"
---

# RAG local avec Ollama et ChromaDB

Apprenez à construire un système RAG (Retrieval-Augmented Generation) entièrement local.

## Architecture

```
Documents → Chunking → Embeddings → Vector Store (ChromaDB)
                                              ↓
Question → Embedding → Recherche similitude → Contexte → LLM → Réponse
```

## Installation

```bash
# ChromaDB
pip install chromadb

# Ollama (déjà installé)
ollama pull nomic-embed-text
ollama pull llama3.2
```

## Code complet

```python
import chromadb
from chromadb.utils import embedding_functions
import ollama

# Client ChromaDB
client = chromadb.PersistentClient(path="./chroma_db")

# Fonction d'embedding avec Ollama
embedding_fn = embedding_functions.OllamaEmbeddingFunction(
    model_name="nomic-embed-text",
    url="http://localhost:11434/api/embeddings"
)

# Collection
collection = client.get_or_create_collection(
    name="mes_docs",
    embedding_function=embedding_fn
)

# Ajouter des documents
documents = [
    "L'IA locale préserve la confidentialité des données.",
    "Ollama permet de faire tourner des LLM localement.",
    "ChromaDB est une base de données vectorielle légère."
]
collection.add(
    documents=documents,
    ids=["doc1", "doc2", "doc3"]
)

# Recherche
query = "Comment protéger mes données avec l'IA ?"
results = collection.query(query_texts=[query], n_results=2)

# Générer la réponse avec le contexte
context = "\n".join(results['documents'][0])
prompt = f"Contexte :\n{context}\n\nQuestion : {query}\nRéponse :"

response = ollama.generate(model='llama3.2', prompt=prompt)
print(response['response'])
```

## Optimisations

- **Chunking** : Découpez en paragraphes de 200-500 tokens
- **Overlap** : Chevauchez de 50 tokens entre chunks
- **Métadonnées** : Stockez source, date, auteur pour filtrer

## Conclusion

Vous avez maintenant un RAG 100% local, gratuit et privé !