---
title: "Configuration API Ollama"
category: "API"
tags: ["ollama", "api", "configuration"]
published: true
created_at: "2024-01-10T09:00:00Z"
updated_at: "2024-01-10T09:00:00Z"
---

# Configuration API Ollama

Guide complet pour configurer et utiliser l'API REST d'Ollama.

## Endpoints principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tags` | Lister les modèles installés |
| POST | `/api/generate` | Génération simple |
| POST | `/api/chat` | Chat avec historique |
| POST | `/api/pull` | Télécharger un modèle |
| DELETE | `/api/delete` | Supprimer un modèle |

## Génération simple

```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "prompt": "Pourquoi le ciel est bleu ?",
    "stream": false
  }'
```

## Chat avec historique

```bash
curl -X POST http://localhost:11434/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "messages": [
      {"role": "system", "content": "Tu es un assistant utile."},
      {"role": "user", "content": "Bonjour !"}
    ],
    "stream": false
  }'
```

## Paramètres importants

```json
{
  "model": "llama3.2",
  "prompt": "...",
  "options": {
    "temperature": 0.7,
    "top_p": 0.9,
    "top_k": 40,
    "num_predict": 512,
    "stop": ["</s>"],
    "seed": 42
  }
}
```

## Python avec requests

```python
import requests

url = "http://localhost:11434/api/generate"
data = {
    "model": "llama3.2",
    "prompt": "Explique la photosynthèse",
    "stream": False
}
response = requests.post(url, json=data)
print(response.json()['response'])
```

## Variables d'environnement

```bash
# Port (défaut: 11434)
OLLAMA_HOST=0.0.0.0:11434

# Modèles (défaut: ~/.ollama/models)
OLLAMA_MODELS=/path/to/models

# GPU layers (défaut: auto)
OLLAMA_GPU_LAYERS=35
```