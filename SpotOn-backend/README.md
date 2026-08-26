# SpotOn backend

Simple Express API with **SQLite** (one file, no extra database service). Fits a single AWS EC2 instance with the frontend.

## Run locally

```bash
cd SpotOn-backend
npm install
copy .env.example .env
npm run dev
```

API: `http://localhost:3000`

## Endpoints

| Method | Path | Body / params | What it does |
|---|---|---|---|
| GET | `/health` | | Health check |
| POST | `/api/guests` | `{ "table": "3235", "name": "Umair Khan" }` | Add a guest entry |
| GET | `/api/guests` | optional `?table=3235` | List all guests, or guests at one table |
| GET | `/api/guests/:id` | e.g. `/api/guests/1` | Get one guest by id |

Each submit creates a **new row**. Table number is not unique; only `id` is.

SQLite file: `data/spoton.db`

## Frontend (local)

In `SpotOn`, Vite proxies `/api` to this server. Open:

`http://localhost:5173/?table=3235`

## Deploy both on one EC2 instance

1. Build the app: `cd SpotOn && npm run build`
2. On the server, set in `.env`:

```env
PORT=3000
CORS_ORIGIN=http://YOUR_EC2_IP,https://your-domain.com
FRONTEND_DIR=/home/ubuntu/SpotOn/dist
```

3. Start the backend (`npm start` or pm2):

```bash
cd /home/ubuntu/SpotOn-backend
npm install
npm start
```

One Node process then serves the UI and the API. Put Nginx in front later if you want HTTPS on port 443.

```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
  }
}
```
