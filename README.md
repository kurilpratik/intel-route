# Intel Route - Intelligent Route Prediction <br>and Prefetching using ML

Intel Route is an intelligent web routes prediction system. It uses a machine learning model trained on the user's activity to predict the route the user is most likey to hit next and loads it in the background to improve website performance and speed.

## Tech Stack

Web App - Nextjs, TailwindCSS, Mongoose <br>
Database - MongoDb<br>
Backend - FastAPI, pymongo, uvicorn<br>
Machine Learning - NumPy, ScikitLearn<br>
Hosting - AWS Amplify (Web App), Atlas (Database), Render (Backend)

## Setting Up

```bash
git clone https://github.com/kurilpratik/intel-route.git
```

**Frontend** <br>
Add .env.local inside next-app <br>

```bash
.env.local
MONGODB_URI=your-mongodb-uri
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:8000/
NEXT_PUBLIC_FRONTEND_URL=
```

<br>

```bash
cd next-app
npm install
npm run dev
```

<br>

**Backend** <br>
Add .env inside py-backend <br>

```bash
.env
MONGO_URI=your-mongodb-uri
BACKEND_DEV_DOMAIN=http://localhost:3000
```

```bash
cd py-backend
venv/Scripts/activate
python app.py
```
