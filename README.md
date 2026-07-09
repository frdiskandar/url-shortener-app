# URL Shortener 🔗

<img width="1920" height="1049" alt="Screenshot From 2026-07-09 15-11-05" src="https://github.com/user-attachments/assets/134f7ba8-7227-4cdf-bd32-7bb227e89781" />

**URL Shortener** adalah aplikasi web untuk mempersingkat tautan panjang menjadi tautan pendek yang mudah dibagikan. Dibangun dengan arsitektur **backend** berbasis Express.js, **frontend** React yang modern, serta menggunakan **PostgreSQL** sebagai database utama dan **Redis** untuk caching.

---

## ✨ Fitur Utama

- **Memperpendek URL** — Ubah tautan panjang menjadi tautan pendek (5 karakter) secara otomatis
- **Redirect otomatis** — Akses URL pendek dan langsung diarahkan ke tujuan asli (301 redirect)
- **Manajemen Pengguna** — Registrasi dan pencarian data pengguna
- **Daftar URL** — Lihat semua URL yang telah dibuat oleh pengguna
- **Copy URL** — Salin tautan pendek ke clipboard dengan satu klik
- **Caching Redis** — URL populer di-cache untuk akses lebih cepat
- **Analitik Request** — Setiap akses ke URL pendek dicatat (IP, User-Agent, referrer, dll.)
- **Tema Retro 8-bit** — Desain UI pixel art bernuansa retro dengan font *Press Start 2P*
- **Dark/Light Mode** — Dukungan tema gelap dan terang
- **Animasi Circuit Board** — Visualisasi arsitektur sistem di halaman utama
- **Responsive Design** — Tampilan optimal di berbagai ukuran layar

---

## 🧱 Tech Stack

### Backend

| Teknologi | Kegunaan |
|-----------|----------|
| **Express.js** | Framework HTTP server |
| **PostgreSQL** | Database relasional |
| **Redis** | Caching URL |
| **pg** (node-postgres) | Koneksi PostgreSQL |
| **Winston** | Logging |
| **dotenv** | Konfigurasi environment |
| **Jade/Pug** | Template engine |
| **Morgan** | HTTP request logger |

### Frontend

| Teknologi | Kegunaan |
|-----------|----------|
| **React 19** | Library UI |
| **TanStack Router** | Routing berbasis file |
| **TanStack Query** | Data fetching & caching |
| **TanStack Form** | Manajemen form |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animasi |
| **Radix UI** | Komponen aksesibilitas |
| **Class Variance Authority** | Variasi komponen |
| **Lucide React** | Ikon |
| **Vite** | Build tool |

### DevOps & Testing

| Teknologi | Kegunaan |
|-----------|----------|
| **k6** | Load testing & benchmarking |
| **Vitest** | Unit testing |
| **Biome** | Linting & formatting |

---

## 📁 Struktur Folder

```
url-shortener-app/
├── backend/                          # Backend API (Express.js)
│   ├── app.js                        # Entry point aplikasi Express
│   ├── bin/www                       # Startup server
│   ├── .env.example                  # Contoh konfigurasi environment
│   ├── modules/
│   │   ├── shortener/                # Modul URL shortener
│   │   │   ├── index.js              # Router & handler endpoints
│   │   │   ├── handler.js            # Request handler
│   │   │   ├── service.js            # Business logic
│   │   │   ├── dto.js                # Data access layer (query DB)
│   │   │   └── handler.test.js       # Unit test
│   │   └── user/                     # Modul user
│   │       ├── index.js              # Router user (register, get)
│   │       └── dto.js                # Data access layer user
│   ├── shared/
│   │   ├── Errors/
│   │   │   └── ErrorResponse.js      # Custom error class
│   │   ├── lib/
│   │   │   ├── postgres-connection.js  # Koneksi PostgreSQL
│   │   │   └── redis-connection.js     # Koneksi & operasi Redis
│   │   ├── middleware/
│   │   │   └── ErrorMiddleware.js    # Error handling middleware
│   │   └── utils/
│   │       ├── analiticUrl.js        # Pencatatan log akses URL
│   │       ├── config.js             # Konfigurasi environment
│   │       └── logger.js             # Logger Winston
│   ├── routes/
│   │   ├── index.js                  # Route utama (Jade view)
│   │   └── users.js                  # Route users (legacy)
│   └── views/                        # Template Jade
│       ├── index.jade
│       ├── error.jade
│       └── layout.jade
│
├── frond-end/                        # Frontend (React + TanStack)
│   ├── .env.example                  # Contoh konfigurasi
│   ├── vite.config.ts                # Konfigurasi Vite
│   ├── tsconfig.json                 # Konfigurasi TypeScript
│   ├── types.ts                      # File tidak ada
│   └── src/
│       ├── styles.css                # Global CSS + Tailwind
│       ├── router.tsx                # Konfigurasi router
│       ├── routeTree.gen.ts          # Route tree (auto-generated)
│       ├── routes/
│       │   ├── __root.tsx            # Root layout (theme, head)
│       │   └── index.tsx             # Halaman utama
│       ├── components/
│       │   ├── Form.tsx              # Form input URL
│       │   ├── ListUrlShorted.tsx    # Daftar URL pendek
│       │   ├── ThemeToggle.tsx       # Toggle dark/light mode
│       │   └── ui/
│       │       ├── button.tsx        # Shadcn button
│       │       ├── card.tsx          # Shadcn card
│       │       ├── circuit-board.tsx # Animasi circuit board
│       │       └── 8bit/             # Komponen tema retro 8-bit
│       │           ├── button.tsx
│       │           ├── card.tsx
│       │           ├── input.tsx
│       │           ├── badge.tsx
│       │           ├── toast.tsx
│       │           ├── styles/retro.css
│       │           └── blocks/
│       │               ├── hero1.tsx         # Hero section
│       │               └── login-form.tsx    # Form login (template)
│       ├── integrations/
│       │   └── tanstack-query/
│       │       ├── root-provider.tsx  # QueryClient provider
│       │       └── devtools.tsx       # React Query devtools
│       └── lib/
│           ├── utils.ts              # Utility (cn function)
│           └── sampleUrls.ts         # Contoh data URL
│
├── url-shortener-documentation/       # Dokumentasi tambahan
│   ├── database/schema.sql            # Skema database
│   ├── k6.js                          # Load testing script
│   ├── API/folder.yml                 # Koleksi API (Bruno)
│   ├── *.yml                          # Endpoint collection (Bruno)
│   └── Screenshot*.png               # Screenshot website
│
├── CLAUDE.md                          # Petunjuk untuk Claude Code
└── .gitignore
```

---

## 🗄️ Skema Database

### Table: `Users`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `ID` | `INT (GENERATED ALWAYS AS IDENTITY)` | Primary Key |
| `username` | `VARCHAR(255)` | Nama pengguna |
| `updated_at` | `TIMESTAMP` | Waktu update |
| `deleted_at` | `TIMESTAMP` | Waktu hapus (soft delete) |
| `created_at` | `TIMESTAMP` | Waktu dibuat (default: now) |

### Table: `Shorter_url`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `ID` | `INT (GENERATED ALWAYS AS IDENTITY)` | Primary Key |
| `user_ID` | `INT` | Foreign Key → Users(ID) |
| `original_url` | `VARCHAR(500)` | URL asli |
| `shorter_url` | `VARCHAR(500)` | URL pendek (5 karakter) |
| `updated_at` | `TIMESTAMP` | Waktu update |
| `deleted_at` | `TIMESTAMP` | Waktu hapus |
| `created_at` | `TIMESTAMP` | Waktu dibuat |

### Table: `RequestLogs`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `ID` | `INT (GENERATED ALWAYS AS IDENTITY)` | Primary Key |
| `ipAddress` | `VARCHAR(24)` | Alamat IP pengakses |
| `userAgent` | `VARCHAR(255)` | User-Agent browser |
| `referrer` | `VARCHAR(255)` | Sumber referal |
| `timeReq` | `TIMESTAMP` | Waktu request |
| `url` | `VARCHAR(255)` | URL yang diakses |
| `method` | `VARCHAR(20)` | Metode HTTP |
| `protocol` | `VARCHAR(28)` | Protokol (http/https) |
| `hostname` | `VARCHAR(255)` | Hostname |

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3030
```

### 1. Register User
Mendaftarkan pengguna baru.

```
POST /user/register
```

**Request Body:**
```json
{
  "username": "farid iskandar"
}
```

**Response:**
```json
{
  "message": "success",
  "user": { ... }
}
```

### 2. Get User Data
Mendapatkan data pengguna berdasarkan username.

```
GET /user/me
```

**Request Body:**
```json
{
  "username": "farid"
}
```

**Response:**
```json
{
  "data": [ ... ]
}
```

### 3. Create Short URL
Membuat URL pendek dari URL asli.

```
POST /shorted
```

**Request Body:**
```json
{
  "url": "https://google.com",
  "user_id": 1
}
```

**Response:**
```json
{
  "message": "success",
  "data": {
    "shorted_url": "aB3xZ",
    ...
  }
}
```

### 4. Get All Short URLs
Mendapatkan semua URL pendek milik pengguna.

```
GET /all?userID=1
```

**Response:**
```json
{
  "data": [ ... ]
}
```

### 5. Access Short URL (Redirect)
Mengakses URL pendek dan di-redirect ke URL asli.

```
GET /{short_url}
```

**Example:**
```
GET /aB3xZ
```
→ Redirect 301 ke `https://google.com`

### 6. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "Ok!"
}
```

---

## 🚀 Cara Menjalankan di Local

### Prasyarat

Pastikan Anda telah menginstal:

- **Node.js** (v18 atau lebih baru)
- **PostgreSQL** (database utama)
- **Redis** (caching)
- **pnpm** (package manager untuk frontend — opsional, npm juga bisa)

### 1. Clone Repository

```bash
git clone <repository-url>
cd url-shortener-app
```

### 2. Setup Database

Buat database dan jalankan skema dari `url-shortener-documentation/database/schema.sql`:

```bash
psql -U root -c "CREATE DATABASE shortener_url;"
psql -U root -d shortener_url -f url-shortener-documentation/database/schema.sql
```

### 3. Konfigurasi Environment

**Backend** — Salin `.env.example` menjadi `.env` di folder `backend/`:

```bash
cp backend/.env.example backend/.env
```

Sesuaikan nilai-nilai di `backend/.env`:

```env
NODE_ENV="development"
PORT=3030
REDIS_HOST="localhost"
REDIS_PORT=6379
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432
POSTGRES_USER="root"
POSTGRES_PASSWORD="rootpassword"
POSTGRES_DATABASE="shortener_url"
```

> **Catatan:** Jika menggunakan Docker untuk Redis/PostgreSQL, sesuaikan host dan port sesuai kontainer Anda.

**Frontend** — Salin `.env.example` menjadi `.env` di folder `frond-end/`:

```bash
cp frond-end/.env.example frond-end/.env
```

```env
BACKEND_URL="http://localhost:3030"
```

### 4. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frond-end
pnpm install   # atau npm install
```

### 5. Jalankan Aplikasi

**Backend** (dari folder `backend/`):
```bash
npm run dev
```
Server backend berjalan di `http://localhost:3030`.

**Frontend** (dari folder `frond-end/`, di terminal terpisah):
```bash
npm run dev
```
Server frontend berjalan di `http://localhost:3000`.

### 6. Buka Aplikasi

Buka browser dan akses:

```
http://localhost:3000
```

Masukkan URL panjang di form, klik **Submit!**, dan URL pendek akan langsung muncul di daftar.

---

## 🧪 Testing

### Load Testing dengan k6

Jalankan benchmark untuk menguji performa endpoint redirect:

```bash
k6 run url-shortener-documentation/k6.js
```

### Unit Test Backend

```bash
cd backend
npm test
```

### Frontend Test

```bash
cd frond-end
npm run test
```

---

## 🐳 Catatan Docker

Jika Anda menggunakan Docker untuk PostgreSQL dan Redis, contoh konfigurasi dengan port yang sudah umum digunakan:

```bash
# Pull images
docker pull postgres:16
docker pull redis:7

# Jalankan PostgreSQL
docker run --name postgres-dev -e POSTGRES_PASSWORD=rootpassword -e POSTGRES_DB=shortener_url -p 5432:5432 -d postgres:16

# Jalankan Redis
docker run --name redis-dev -p 6379:6379 -d redis:7
```

---

## 📦 Build untuk Production

### Backend

```bash
cd backend
npm run build
node dist/server/index.mjs
```

### Frontend

```bash
cd frond-end
npm run build
```

Hasil build frontend tersedia di folder `dist/`.

---
