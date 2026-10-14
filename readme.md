# 📌 MoodLocation Backend & Performance Testing Framework

ระบบบริการหลังบ้าน (Backend API Service) สำหรับแอปพลิเคชัน **MoodLocation** พัฒนาด้วย **Node.js + Express.js** รองรับการทำงานแบบ Real-time ด้วย **Socket.io** ระบบค้นหาสถานที่ตามอารมณ์ด้วย AI และมีระบบการทดสอบประสิทธิภาพภาระงาน (Load & Performance Testing) แบบอัตโนมัติด้วย **k6**

## 📑 สารบัญ (Table of Contents)

* [ฟีเจอร์หลัก (Key Features)](#-ฟีเจอร์หลัก-key-features)

* [โครงสร้างโปรเจกต์ (Project Structure)](#-โครงสร้างโปรเจกต์-project-structure)

* [เทคโนโลยีที่ใช้ (Tech Stack)](#-เทคโนโลยีที่ใช้-tech-stack)

* [ข้อกำหนดเบื้องต้น (Prerequisites)](#-ข้อกำหนดเบื้องต้น-prerequisites)

* [การติดตั้งและการตั้งค่า (Setup & Installation)](#-การติดตั้งและการตั้งค่า-setup--installation)

* [การใช้งาน API (API Routes)](#-การใช้งาน-api-api-routes)

* [การทดสอบประสิทธิภาพระบบด้วย k6 (Performance Testing)](#-การทดสอบประสิทธิภาพระบบด้วย-k6-performance-testing)

* [การใช้งานผ่าน Docker & Docker Compose](#-การใช้งานผ่าน-docker--docker-compose)

* [การบริหารจัดการ Process ด้วย PM2](#-การบริหารจัดการ-process-ด้วย-pm2)

## 🚀 ฟีเจอร์หลัก (Key Features)

1. **Authentication & User Management:**

   * ระบบลงทะเบียน, เข้าสู่ระบบ, ยืนยันตัวตนผ่าน JWT (JSON Web Token)

   * การจัดการข้อมูลผู้ใช้งาน และระบบส่งอีเมลยืนยัน/รีเซ็ตรหัสผ่าน

2. **AI-Powered Location & Emotion Search:**

   * ระบบค้นหาสถานที่ให้สอดคล้องกับอารมณ์/ความรู้สึกของผู้ใช้

   * ตรวจสอบความถูกต้องและจัดหมวดหมู่สถานที่ (`directEmotion`, `placeCategories`, `emotionValidator`)

3. **Real-time Chat & Socket.io Integration:**

   * ห้องแชตและการส่งข้อความแบบ Real-time (`chatRoomController`, `lib/socket.js`)

4. **Favorites & History Tracking:**

   * จัดเก็บประวัติการค้นหา/เข้าชม และบันทึกสถานที่โปรดของผู้ใช้

5. **Admin Management & Announcements:**

   * ระบบจัดการข้อมูลแอดมิน ประกาศข่าวสารของแอปพลิเคชัน

6. **Performance & Load Testing:**

   * สคริปต์การทดสอบ Load/Stress Test ฝั่ง Backend ด้วย Grafana k6 (`loadtest.js`)

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

```
Performance-Test-k6-main/
├── config/                  # ไฟล์กำหนดการเชื่อมต่อ Database และ Supabase
│   ├── db.js                # Database Configuration (Sequelize / PostgreSQL)
│   └── supabase.js          # Supabase Client Configuration
├── controllers/             # Logic การทำงานหลักของแต่ละ Domain
│   ├── adminController.js
│   ├── aiSearchController.js
│   ├── announcementController.js
│   ├── authController.js
│   ├── chatRoomController.js
│   ├── favoriteController.js
│   ├── historyController.js
│   ├── mapsController.js
│   └── userController.js
├── lib/                     # Library ส่วนเสริม
│   └── socket.js            # Socket.io Server Handler
├── middleware/              # Middleware สำหรับจัดการ Request
│   ├── authMiddleware.js    # JWT Verification & Authorization
│   └── uploadMiddleware.js  # File/Image Upload Middleware (Multer)
├── models/                  # Database Schema Models (Sequelize ORM)
│   ├── Announcement.js
│   ├── ChatMessage.js
│   ├── ChatRoom.js
│   ├── Favorite.js
│   ├── History.js
│   ├── User.js
│   └── index.js
├── routes/                  # API Endpoints Entry Routes
│   ├── adminRoutes.js
│   ├── aiSearchRoutes.js
│   ├── announcementRoutes.js
│   ├── authRoutes.js
│   ├── chatRoomRoutes.js
│   ├── favoriteRoutes.js
│   ├── historyRoutes.js
│   ├── mapsRoutes.js
│   └── userRoutes.js
├── utils/                   # Utility Functions
│   ├── directEmotion.js
│   ├── email.js
│   ├── emotionValidator.js
│   └── placeCategories.js
├── .dockerignore
├── .gitignore
├── Dockerfile               # Docker Image Configuration
├── docker-compose.yml       # Multi-container Deployment Setup
├── ecosystem.config.js      # PM2 Process Manager Configuration
├── loadtest.js              # k6 Performance & Load Testing Script
├── package.json
└── server.js                # Main Application Entry Point

```

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

* **Core Runtime:** Node.js, Express.js

* **Real-time Engine:** Socket.io

* **Database & ORM:** PostgreSQL / Supabase, Sequelize

* **Testing Tools:** Grafana k6 (Load Testing), Postman (API Unit/Integration Testing)

* **DevOps & Process Manager:** Docker, Docker Compose, PM2

* **Utilities:** Nodemailer, Multer, JsonWebToken, Bcrypt

## 💻 ข้อกำหนดเบื้องต้น (Prerequisites)

ก่อนเริ่มต้นใช้งาน กรุณาตรวจสอบว่าเครื่องของคุณติดตั้งเครื่องมือดังต่อไปนี้เรียบร้อยแล้ว:

* [Node.js](https://nodejs.org/) (v18.x ขึ้นไป)

* [npm](https://www.npmjs.com/) หรือ [yarn](https://yarnpkg.com/)

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (กรณีต้องการรันด้วย Docker)

* [k6 Framework](https://k6.io/docs/getting-started/installation/) (สำหรับทำการทดสอบ Load Test)

## ⚙️ การติดตั้งและการตั้งค่า (Setup & Installation)

### 1. Clone Repository & Install Dependencies

```
git clone <repository-url>
cd Performance-Test-k6-main
npm install

```

### 2. กำหนด Environment Variables (`.env`)

สร้างไฟล์ `.env` ที่ Root Directory ของโปรเจกต์ และระบุค่าพารามิเตอร์ดังนี้:

```
PORT=5000
NODE_ENV=development

# Database Settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=moodlocation_db
DB_USER=postgres
DB_PASSWORD=your_password

# Supabase Credentials (if used)
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# JWT Secret
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email Service Setup
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

```

### 3. เริ่มต้นรันเซิร์ฟเวอร์ (Development Mode)

```
# รันด้วย Nodemon
npm run dev

# หรือรันปกติ
npm start

```

ระบบจะเริ่มต้นทำงานที่ `http://localhost:5000`

## 🔌 การใช้งาน API (API Routes)

| Prefix Path | Route File | คำอธิบายการทำงาน | 
| ----- | ----- | ----- | 
| `/api/auth` | `authRoutes.js` | ลงทะเบียน, เข้าสู่ระบบ, ยืนยันตัวตน, รีเซ็ตรหัสผ่าน | 
| `/api/users` | `userRoutes.js` | จัดการข้อมูลส่วนตัวผู้ใช้ และการอัปโหลดโปรไฟล์ | 
| `/api/maps` | `mapsRoutes.js` | ค้นหาข้อมูลแผนที่ และพิกัดสถานที่ | 
| `/api/ai-search` | `aiSearchRoutes.js` | ระบบค้นหาสถานที่อัจฉริยะตามอารมณ์/ความรู้สึก | 
| `/api/chat` | `chatRoomRoutes.js` | สร้างห้องแชต และประวัติการสนทนา | 
| `/api/favorites` | `favoriteRoutes.js` | จัดการรายการสถานที่โปรดของผู้ใช้ | 
| `/api/history` | `historyRoutes.js` | บันทึกและดึงประวัติการเข้าชม/ค้นหา | 
| `/api/announcements` | `announcementRoutes.js` | ดึงข้อมูลประกาศข่าวสารระบบ | 
| `/api/admin` | `adminRoutes.js` | API สำหรับผู้ดูแลระบบ (Admin Control Panel) | 

## 🧪 การทดสอบประสิทธิภาพระบบด้วย k6 (Performance Testing)

ไฟล์ `loadtest.js` ถูกออกแบบมาเพื่อทำ **Load / Stress Testing** บนระบบหลังบ้าน เพื่อดูอัตราการรองรับผู้ใช้พร้อมกัน (Virtual Users: VUs) และวัดค่า Latency/Response Time

### 1. ติดตั้ง k6

* **macOS (via Homebrew):**

  ```
  brew install k6
  
  ```

* **Windows (via Chocolatey):**

  ```
  choco install k6
  
  ```

* **Linux (Debian/Ubuntu):**

  ```
  sudo gpg -k
  sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
  echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
  sudo apt-get update
  sudo apt-get install k6
  
  ```

### 2. การสั่งรันสคริปต์ทดสอบ k6

```
# รันการทดสอบ Load Test ด้วยสคริปต์ loadtest.js
k6 run loadtest.js

# รันพร้อมส่งออกผลลัพธ์เป็น JSON Report
k6 run --out json=test_results.json loadtest.js

```

### 3. ตัววัดผลที่สำคัญ (Key Performance Indicators)

* **http_req_duration:** ระยะเวลาในการตอบสนองของ API (p95 ควรต่ำกว่า 500ms)

* **http_req_failed:** อัตราข้อผิดพลาดของ Request (ควรต่ำกว่า 1%)

* **iterations / http_reqs:** จำนวน Request ทั้งหมดที่ระบบสามารถรับได้ต่อวินาที (Throughput - RPS)

## 🐳 การใช้งานผ่าน Docker & Docker Compose

คุณสามารถเริ่มรันโปรเจกต์ทั้งระบบรวมถึง Database ได้ทันทีผ่าน Container:

### 1. สร้าง และเริ่มทำงาน Container

```
docker-compose up -d --build

```

### 2. ตรวจสอบสถานะ Container

```
docker-compose ps

```

### 3. ปิดการทำงานของ Container

```
docker-compose down

```

## 🔄 การบริหารจัดการ Process ด้วย PM2

สำหรับสภาวะแวดล้อม Production สามารถใช้ **PM2** ในการทำ Cluster Mode และ Auto-restart:

```
# เริ่มต้นการทำงานตามไฟล์ ecosystem.config.js
npx pm2 start ecosystem.config.js

# ตรวจสอบสถานะการทำงาน
npx pm2 status

# ดู Logs การทำงานแบบ Real-time
npx pm2 logs

# หยุดการทำงานระบบ
npx pm2 stop all

```