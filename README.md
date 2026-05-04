# HabitatSen

Application mobile/web de catalogue et vente de plans de construction modernes adaptés au Sénégal.

## Structure

- `backend/` : Django + Django REST Framework API
- `frontend/` : React + Vite interface utilisateur

## Installation

### Backend

1. Aller dans `backend/`
2. Créer un environnement virtuel : `python -m venv venv`
3. Activer l'environnement :
   - Windows : `venv\Scripts\activate`
4. Installer les dépendances : `pip install -r requirements.txt`
5. Lancer les migrations : `python manage.py migrate`
6. Démarrer le serveur : `python manage.py runserver`

### Charger des plans de démonstration

1. Aller dans `backend/`
2. Exécuter : `python manage.py loaddata sample_plans`

### Frontend

1. Aller dans `frontend/`
2. Installer les dépendances : `npm install`
3. Démarrer l'application : `npm run dev`

## API principales

- `GET /api/plans/` : liste des plans
- `POST /api/contact/` : soumission d'un formulaire de contact/WhatsApp
- `POST /api/submission/` : soumission d'un plan personnel
- `POST /api/custom-plan/` : soumission d'une demande de plan personnalisé / génération de message WhatsApp
