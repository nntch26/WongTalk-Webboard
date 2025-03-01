# WongTalk-Webboard

โปรเจกต์รายวิชาการพัฒนาเว็บฝั่งไคลเอนต์ 06016429 CLIENT-SIDE WEB DEVELOPMENT (2/2024) <br>

# บทคัดย่อ รายละเอียดโครงงาน

ในปัจจุบัน เรามักพบเจอปัญหาหรือคำถามมากมายในชีวิตประจำวัน แต่ไม่สามารถจะไปปรึกษาหรือพูดคุยกับใครได้ หรือบางทีเราอยากจะหาแหล่งข้อมูลความรู้เพิ่ม การมีพื้นที่สำหรับการพูดคุยและแลกเปลี่ยนความคิดเห็น ที่ให้ผู้ใช้สามารถตั้งกระทู้ถามคำถาม แบ่งปันประสบการณ์ หรือขอคำแนะนำจากคนอื่นๆ ในชุมชนได้ จึงเป็นเรื่องที่ดี ซึ่งจะทำให้การหาคำตอบหรือการแบ่งปันข้อมูลกลายเป็นเรื่องง่ายขึ้น โดยไม่จำกัดการเข้าร่วม

ดังนั้นผู้จัดทำจึงมีความคิดที่อยากจะพัฒนาเว็บไซต์ชุมชนที่เป็นพื้นที่พูดคุยกัน เพื่อแบ่งปันความรู้ แลกเปลี่ยนความคิดเห็น เพื่อเป็นแหล่งเรียนรู้ให้กับสมาชิกคนอื่น ๆ ที่สนใจเนื้อหานั้น อีกทั้งสมาชิกยังสามารถตั้งกระทู้ โพสต์คำถาม หรือขอความช่วยเหลือในการแก้ปัญหาต่าง ๆ ได้อย่างอิสระ และสามารถติดตามหัวข้อที่สนใจได้อีกด้วย

**WongTalk-Webboard** เป็นเว็บบอร์ดออนไลน์ (Online Forum) เป็นพื้นที่ให้ผู้ใช้สามารถเข้ามาพูดคุยและแลกเปลี่ยนความคิดเห็น หรือแบ่งปันข้อมูลในหัวข้อต่าง ๆ ได้อย่างอิสระ โดยผู้ใช้สามารถโพสต์กระทู้และแสดงความคิดเห็นได้

## เทคโนโลยีที่ใช้

### Frontend

-   [Next.js](https://nextjs.org/) - React Framework สำหรับการสร้างเว็บแอปพลิเคชัน
-   [TypeScript](https://www.typescriptlang.org/) - Superset ของ JavaScript ที่เพิ่ม Type Safety
-   [TailwindCSS](https://tailwindcss.com/) - สำหรับการจัดการ Style

### Backend

-   [Node.js](https://nodejs.org/) - JavaScript Runtime
-   [Express](https://expressjs.com/) - Web Framework สำหรับ Node.js
-   [JWT](https://jwt.io/) - สำหรับการยืนยันตัวตนผู้ใช้

### Database

-   [MongoDB](https://www.mongodb.com/) - NoSQL Database

## Frontend Dependencies

แพ็กเกจที่ใช้ในในโปรเจคฝั่ง Frontend

-   axios: ใช้สำหรับการทำ HTTP requests (เช่น GET, POST) ไปยังเซิร์ฟเวอร์
-   @types/js-cookie: ติดตั้งชนิดข้อมูลสำหรับการใช้ไลบรารี js-cookie ใน TypeScript ใช้สำหรับการจัดการคุกกี้
-   @fortawesome/fontawesome-free: ใช้สำหรับนำเข้าไอคอนจาก Font Awesome ฟรี แสดงไอคอนต่างๆ ในหน้าเว็บ

## Backend Dependencies

แพ็กเกจที่ใช้ในในโปรเจคฝั่ง Backend

-   cryptjs: ใช้สำหรับการแฮชรหัสผ่านอย่างปลอดภัย
-   body-parser: ใช้ในการแปลงข้อมูลที่มาจาก body ของคำขอ
-   cookie-parser: ใช้ในการแยกและจัดการคุกกี้ในคำขอ HTTP
-   cors: ใช้สำหรับเปิดการเข้าถึงข้อมูลระหว่างโดเมน (Cross-Origin Resource Sharing)
-   dotenv: ใช้ในการโหลดตัวแปรจากไฟล์ .env
-   express: เฟรมเวิร์กสำหรับสร้าง API และเว็บแอป
-   jsonwebtoken: ใช้สำหรับสร้างและตรวจสอบ JSON Web Tokens (JWT) สำหรับการยืนยันตัวตน
-   mongoose: ใช้ในการเชื่อมต่อและทำงานกับ MongoDB
-   morgan: ใช้ในการบันทึกข้อมูลคำขอ HTTP สำหรับการดีบัก
-   nodemon: ใช้ในการรีสตาร์ทเซิร์ฟเวอร์โดยอัตโนมัติเมื่อมีการเปลี่ยนแปลงโค้ด
-   moment-timezone: ใช้สำหรับจัดการเวลาภายในเขตเวลาต่างๆ

# Installation and Setup

## 1. Setup Backend

1. เปิดเทอร์มินัล (หรือ Command Prompt) และไปที่โฟลเดอร์ที่ `backend`

```bash
cd backend
```

2. สร้างไฟล์ `package.json` (ถ้ายังไม่มี)

```bash
npm init -y
```

3. ติดตั้ง Backend Dependencies

```bash
npm install bcryptjs body-parser cookie-parser cors dotenv express jsonwebtoken mongoose morgan moment-timezone
npm install --save-dev nodemon
```

4. สร้างไฟล์ `.env` จากนั้นตั้งค่าตัวแปรในไฟล์ ที่ใช้ในการตั้งค่าคอนฟิกต่างๆ สำหรับแอปพลิเคชัน ดังนี้

### Environment Variables

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET =
```

-   PORT= กำหนดพอร์ตสำหรับเซิร์ฟเวอร์
-   MONGO_URI= เชื่อมต่อกับ MongoDB ที่ localhost ใช้ฐานข้อมูลชื่อ mydb
-   JWT_SECRET = รหัสสำหรับเข้ารหัสและถอดรหัส JWT

## 2. Setup Frontend (Next.js)

1. เปิดเทอร์มินัล (หรือ Command Prompt) และไปที่โฟลเดอร์ที่ `wongtalk-app`

```bash
cd frontend
cd wongtalk-app
```

2. สร้างไฟล์ `package.json` (ถ้ายังไม่มี)

```bash
npm init -y
```

3. ติดตั้ง Frontend Dependencies

```bash
npm install axios
npm install --save-dev @types/js-cookie
npm install --save @fortawesome/fontawesome-free
```

## รันแอปพลิเคชัน

-   สำหรับ backend ใช้ `nodemon` เพื่อรันเซิร์ฟเวอร์ (ต้องอยู่ในโฟลเดอร์ backend )

```bash
cd backend
nodemon index.js
```

หากรันสำเร็จจะแสดงความข้อความบนเทอร์มินัล ว่า

```
-------------------------
Server is running on port: 8000
MongoDB Connected: localhost
```

-   สำหรับ frontend ใช้คำสั่ง `npm run dev` เพื่อเริ่มต้นเซิร์ฟเวอร์ของ Next.js (ต้องอยู่ในโฟลเดอร์ frontend/wongtalk-app )

```bash
cd frontend
cd wongtalk-app
npm run dev
```

หากรันสำเร็จ เข้าถึงได้ที่

```
http://localhost:3000
```

## API Endpoints

### **Authentication**

| **Method** | **Endpoint** | **Description** |
| ---------- | ------------ | --------------- |
| POST       | /register    | สมัครสมาชิกใหม่ |
| POST       | /login       | เข้าสู่ระบบ     |

### **User Profile**

| **Method** | **Endpoint** | **Description**       |
| ---------- | ------------ | --------------------- |
| GET        | /users       | ดูข้อมูลผู้ใช้ทั้งหมด |
| POST       | /profile     | แก้ไขโปรไฟล์          |
| POST       | /showfollow  | แสดง Topic ที่ติดตาม  |

### **Topic Management**

| **Method** | **Endpoint** | **Description**   |
| ---------- | ------------ | ----------------- |
| POST       | /follow      | ติดตาม Topic      |
| GET        | /getAllTopic | ดึง Topic ทั้งหมด |

### **Post Management**

| **Method** | **Endpoint**     | **Description**       |
| ---------- | ---------------- | --------------------- |
| GET        | /posts           | ดึงรายการโพสต์ทั้งหมด |
| POST       | /posts           | สร้างโพสต์ใหม่        |
| PUT        | /posts/:id       | แก้ไขโพสต์            |
| DELETE     | /posts/:id       | ลบโพสต์               |
| PUT        | /posts/reactions | กดไลค์โพสต์           |

### **Comment Management**

| **Method** | **Endpoint**                 | **Description**  |
| ---------- | ---------------------------- | ---------------- |
| POST       | /comments/                   | สร้างความคิดเห็น |
| PUT        | /comments/:commentId/        | แก้ไขความคิดเห็น |
| DELETE     | /comments/:commentId/:postId | ลบความคิดเห็น    |

### **Search**

| **Method** | **Endpoint** | **Description** |
| ---------- | ------------ | --------------- |
| GET        | /search      | ค้นหาโพสต์      |

## หน้าหลักของเว็บไซต์

![image](https://github.com/user-attachments/assets/afe79de7-b770-4c18-ab0c-849a11ffb2e8)

## หน้าเนื้อหาในโพสต์กระทู้และส่วนแสดงความคิดเห็น

![image](https://github.com/user-attachments/assets/c608daed-cc92-45f4-bb95-298ca480b0f2)

## หน้าหมวดหมู่หัวข้อเนื้อหา (Topic)

![image](https://github.com/user-attachments/assets/c154b653-3392-438c-9a0f-509cd3734996)

## หน้าโปรไฟล์ของผู้ใช้

![image](https://github.com/user-attachments/assets/33e11583-1df0-4cde-9a42-ad98ce4705d2)
