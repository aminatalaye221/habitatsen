# HabitatSen

Application mobile/web de catalogue et vente de plans de construction modernes adapt�s au S�n�gal.

## Structure

- `backend/` : Django + Django REST Framework API
- `frontend/` : React + Vite interface utilisateur

## Installation

### Backend

1. Aller dans `backend/`
2. Cr�er un environnement virtuel : `python -m venv venv`
3. Activer l'environnement :
   - Windows : `venv\Scripts\activate`
4. Installer les d�pendances : `pip install -r requirements.txt`
5. Lancer les migrations : `python manage.py migrate`
6. D�marrer le serveur : `python manage.py runserver`

### Charger des plans de d�monstration

1. Aller dans `backend/`
2. Ex�cuter : `python manage.py loaddata sample_plans`

### Frontend

1. Aller dans `frontend/`
2. Installer les d�pendances : `npm install`
3. D�marrer l'application : `npm run dev`

## API principales

- `GET /api/plans/` : liste des plans
- `POST /api/contact/` : soumission d'un formulaire de contact/WhatsApp
- `POST /api/submission/` : soumission d'un plan personnel
- `POST /api/custom-plan/` : soumission d'une demande de plan personnalisé / génération de message WhatsApp

## Déploiement

### Backend sur Render

1. Crée un nouveau service Web sur Render en liant le dépôt `habitatsen`.
2. Dans la configuration du service :
   - Build Command : `pip install -r backend/requirements.txt`
   - Start Command : `gunicorn habitat.wsgi --chdir backend --log-file -`
3. Ajoute les variables d'environnement :
   - `DJANGO_SECRET_KEY` : clé secrète production
   - `DJANGO_DEBUG` : `False`
   - `DJANGO_ALLOWED_HOSTS` : domaine Render (Ex: `habitatsen.onrender.com`)
   - `DATABASE_URL` : URL PostgreSQL fournie par Render si tu utilises une base de données persistante.

### Frontend sur Vercel

1. Crée un nouveau projet Vercel et connecte-le à ce dépôt.
2. Configure le chemin `frontend/` comme répertoire du projet.
3. Build Command : `npm install && npm run build`
4. Output Directory : `dist`
5. Ajoute la variable d'environnement :
   - `VITE_API_BASE_URL` : `https://<ton-backend>.onrender.com/api`

### Déploiement local

- Backend : `cd backend && python manage.py migrate && python manage.py runserver`
- Frontend : `cd frontend && npm install && npm run dev`

> Sur Vercel, le frontend appellera ton backend via `VITE_API_BASE_URL`. Sur Render, le backend utilisera `DJANGO_ALLOWED_HOSTS` et `DATABASE_URL`.
