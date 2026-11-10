---
title: "Serveur llama.cpp avec API OpenAI compatible"
category: "Serveur"
tags: ["llama.cpp", "server", "openai-compatible", "api"]
published: true
created_at: "2024-01-12T11:00:00Z"
updated_at: "2024-01-12T11:00:00Z"
---

# Serveur llama.cpp avec API OpenAI compatible

Montez un serveur d'inférence haute performance compatible avec l'API OpenAI.

## Installation

### Via binaire précompilé
```bash
# Linux/macOS
wget https://github.com/ggerganov/llama.cpp/releases/latest/download/llama-server
chmod +x llama-server
```

### Via Docker (recommandé)
```bash
docker run -d \
  --name llama-server \
  -p 8080:8080 \
  -v $(pwd)/models:/models \
  ghcr.io/ggerganov/llama.cpp:server \
  -m /models/votre-modele.gguf \
  -c 4096 \
  --host 0.0.0.0 \
  --port 8080
```

## Lancement direct

```bash
./llama-server \
  -m ./models/llama-3.2-3b-instruct.Q4_K_M.gguf \
  -c 8192 \
  --host 0.0.0.0 \
  --port 8080 \
  --parallel 4 \
  --cont-batching
```

## Paramètres de performance

| Paramètre | Description | Recommandé |
|-----------|-------------|------------|
| `-c` | Taille du contexte | 8192 |
| `--parallel` | Requêtes parallèles | 4 |
| `--cont-batching` | Batch continu | Activé |
| `-ngl` | GPU layers | 35 (RTX 3060) |
| `--batch-size` | Taille batch | 512 |
| `--ubatch-size` | Micro-batch | 512 |

## Utilisation comme API OpenAI

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="sk-no-key-required"
)

response = client.chat.completions.create(
    model="llama-3.2-3b-instruct",
    messages=[
        {"role": "system", "content": "Tu es un assistant."},
        {"role": "user", "content": "Bonjour !"}
    ],
    temperature=0.7,
    max_tokens=512
)
print(response.choices[0].message.content)
```

## Endpoints disponibles

- `GET /v1/models` - Lister les modèles
- `POST /v1/chat/completions` - Chat completion
- `POST /v1/completions` - Text completion
- `POST /v1/embeddings` - Embeddings (si modèle supporté)
- `GET /health` - Health check

## Monitoring

```bash
# Métriques Prometheus
curl http://localhost:8080/metrics

# Logs
docker logs -f llama-server
```