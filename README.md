# RTSP Stream Viewer

A web application for viewing RTSP streams using Django and React.

## Prerequisites

- Python 3.x
- Node.js and npm
- Git

## Installation

### Backend Setup

1. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows using Git Bash
   # OR
   .\venv\Scripts\activate.bat  # On Windows CMD
   # OR
   .\venv\Scripts\Activate.ps1  # On Windows 

2. Install dependencies:
   ```bash
   pip install -r requirements.txt

3. Run migrations:
   ```bash
   python manage.py migrate

4. Start the Django server:
   ```bash
   python manage.py runserver

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the React development server:
   ```bash
   n

4. Open your browser and go to

4. Open your browser and go to URL_ADDRESS:3000 to view the application.

## Usage
1. Access the web interface at http://localhost:3000
2. Enter your RTSP stream URL in the input field
3. Click "Connect" to start viewing the stream

## Test Stream
You can use this test RTSP stream for development:
rtsp://807e9439d5ca.entrypoint.cloud.wowza.
com:1935/app-rC94792j/068b9c9a_stream2

## Project Structure
.
├── backend/              # Django backend
│   ├── rtsp_server/     # Django project settings
│   └── stream/          # Stream handling app
└── frontend/            # React frontend
    ├── public/
    └── src/
