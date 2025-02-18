# FullStackImageUploader

This project is a full-stack DICOM file upload and viewing system using Django REST Framework (DRF) with GraphQL for the backend and React with Apollo Client for the frontend. It also uses Docker to containerize the application, including a MySQL database. Also you can analyze uploaded images with OpenAi API.

## Project Structure

```
FullStackImageUploader/
│── dicom-images-backend/     # Django backend (Django REST + GraphQL)
│── dicom-images-frontend/    # React frontend (Apollo Client + Material-UI)
│── .env                      # Your environment variables
│── docker-compose.yml        # Docker setup for backend, frontend, and MySQL
│── .gitignore                # Files to exclude from Git tracking
│── my.cnf                    # MySQL configuration file
│── README.md                 # Project documentation
│── LICENSE.txt               # Project license
```

## Technologies Used

### Backend:

- **Django REST** (REST Framework, GraphQL via Graphene)
- **MySQL** (database)
- **Docker** (to containerize the backend and database)

### Frontend:

- **React** (with Apollo Client)
- **Material-UI** (for UI components)

### Other Tools:

- **Docker Compose** (multi-container setup)
- **Axios** (for HTTP requests)

## Setup and Installation

### Prerequisites:

- Docker and Docker Compose installed
- Node.js and npm (if running frontend locally)
- Python 3.10.11 (if running backend locally)

### Running the Application (Docker)

1. Clone the repository:
   ```sh
   git clone https://github.com/artembatyr/FullStackImageUploader.git
   cd FullStackImageUploader
   ```
2. Start the backend, frontend, and database containers:
   ```sh
   docker-compose up --build
   ```
3. The application should now be running:
   - Backend: [http://localhost:8000](http://localhost:8000)
   - Frontend: [http://localhost:3000](http://localhost:3000)

### Running Without Docker

#### Backend:

1. Navigate to `dicom-images-backend` and create a virtual environment:
   ```sh
   cd dicom-images-backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Apply migrations and start the server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

#### Frontend:

1. Navigate to `dicom-images-frontend`:
   ```sh
   cd ../dicom-images-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm start
   ```

## Environment Variables

Create a `.env` file inside `dicom-images-backend/` with the following:

```
DJANGO_SECRET_KEY=your_secret_key
DJANGO_SETTINGS_MODULE=dicom.settings

DB_ENGINE=django.db.backends.mysql
MYSQL_DATABASE=dicom_db
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_ROOT_PASSWORD=root
DB_HOST=dicom-images-db
DB_PORT=3306

FRONTEND_PORT=3000

OPENAI_API_KEY=your_secret_key
```


Create a `.env` file inside `dicom-images-frontend/` with the following:

```
REACT_APP_BACKEND_URL=http://localhost:8000
```




Ceate `.env` file inside your root folder: `FullStackImageUploader/`. You need it for your docker-compose.yaml file

```
DJANGO_SECRET_KEY=your_key
DJANGO_SETTINGS_MODULE=dicom.settings
BACKEND_PORT=8000

MYSQL_DATABASE=dicom_db
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_ROOT_PASSWORD=root
DB_PORT=33066

FRONTEND_PORT=3000

OPENAI_API_KEY=your_secret_key
```

##  How to create OPENAI_API_KEY:
1. Sign up to https://auth.openai.com/create-account
2. Create organisation(Sign up process)
3. Create API key with the name: "OPENAI_API_KEY" and choose Project name: 'Default project'
4. Copy your created api key and paste inside your .env files (inside root folder in .env file and in dicom-images-backend folder in .env file). Change 'your_secret_key' string for your key.
5. Inside https://platform.openai.com/settings/organization/billing/overview. Put 5$ to your account(minimum amount to start using OpenAi API).
6. Now you can analyse your uploaded DICOM images in this app.

## API Endpoints

- **GraphQL Playground**: `http://localhost:8000/graphql`
- **DICOM Upload**: `POST /api/upload`
- **Fetch DICOM Files**: `GET /api/media/dicom_images`
- **Analyze Images**: `POST /api/analyze-image/`

## Troubleshooting

- **Database connection issues**: Ensure MySQL is running and accessible
- **Port conflicts**: Change ports in `docker-compose.yml` if needed
- **Frontend not updating**: Restart the frontend with `npm start`

## 📜 License

MIT License