---
title: "Premier tutoriel : Démarrer avec l'IA locale"
category: "Démarrage"
tags: ["ollama", "local", "débutant"]
published: true
created_at: "2024-01-15T10:00:00Z"
updated_at: "2024-01-15T10:00:00Z"
---

# Premier tutoriel : Démarrer avec l'IA locale

Bienvenue dans ce premier tutoriel pour apprendre à faire tourner des modèles d'IA localement sur votre machine.

## Pourquoi l'IA locale ?

- **Confidentialité** : Vos données ne quittent jamais votre machine
- **Coût** : Gratuit après l'installation (pas d'API payante)
- **Contrôle** : Vous choisissez le modèle et ses paramètres
- **Hors ligne** : Fonctionne sans connexion internet

## Installation d'Ollama

Ollama est le moyen le plus simple de démarrer.

### macOS
```bash
brew install ollama
```

### Linux
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Windows
Téléchargez l'installateur depuis [ollama.com](https://ollama.com/download)

## Premier modèle

Une fois Ollama installé, lancez votre premier modèle :

```bash
ollama run llama3.2
```

## Conclusion

Vous avez maintenant une IA locale fonctionnelle ! Dans les prochains tutos, nous verrons comment :
- Personnaliser les modèles avec des Modelfiles
- Utiliser l'API Ollama depuis du code
- Optimiser les performances sur votre matériel