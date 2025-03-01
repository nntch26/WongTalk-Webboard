# WongTalk-Webboard

โปรเจกต์รายวิชาการพัฒนาเว็บฝั่งไคลเอนต์ 06016429 CLIENT-SIDE WEB DEVELOPMENT (2/2024) <br>

# บทคัดย่อ รายละเอียดโครงงาน
ในปัจจุบัน เรามักพบเจอปัญหาหรือคำถามมากมายในชีวิตประจำวัน แต่ไม่สามารถจะไปปรึกษาหรือพูดคุยกับใครได้ หรือบางทีเราอยากจะหาแหล่งข้อมูลความรู้เพิ่ม การมีพื้นที่สำหรับการพูดคุยและแลกเปลี่ยนความคิดเห็น ที่ให้ผู้ใช้สามารถตั้งกระทู้ถามคำถาม แบ่งปันประสบการณ์ หรือขอคำแนะนำจากคนอื่นๆ ในชุมชนได้ จึงเป็นเรื่องที่ดี ซึ่งจะทำให้การหาคำตอบหรือการแบ่งปันข้อมูลกลายเป็นเรื่องง่ายขึ้น โดยไม่จำกัดการเข้าร่วม

ดังนั้นผู้จัดทำจึงมีความคิดที่อยากจะพัฒนาเว็บไซต์ชุมชนที่เป็นพื้นที่พูดคุยกัน เพื่อแบ่งปันความรู้ แลกเปลี่ยนความคิดเห็น เพื่อเป็นแหล่งเรียนรู้ให้กับสมาชิกคนอื่น ๆ ที่สนใจเนื้อหานั้น อีกทั้งสมาชิกยังสามารถตั้งกระทู้ โพสต์คำถาม หรือขอความช่วยเหลือในการแก้ปัญหาต่าง ๆ  ได้อย่างอิสระ และสามารถติดตามหัวข้อที่สนใจได้อีกด้วย

**WongTalk-Webboard** เป็นเว็บบอร์ดออนไลน์ (Online Forum) เป็นพื้นที่ให้ผู้ใช้สามารถเข้ามาพูดคุยและแลกเปลี่ยนความคิดเห็น หรือแบ่งปันข้อมูลในหัวข้อต่าง ๆ ได้อย่างอิสระ โดยผู้ใช้สามารถโพสต์กระทู้และแสดงความคิดเห็นได้
## Frontend Dependencies
แพ็กเกจที่ใช้ในในโปรเจคฝั่ง Frontend
- axios: ใช้สำหรับการทำ HTTP requests (เช่น GET, POST) ไปยังเซิร์ฟเวอร์
- @types/js-cookie: ติดตั้งชนิดข้อมูลสำหรับการใช้ไลบรารี js-cookie ใน TypeScript ใช้สำหรับการจัดการคุกกี้
- @fortawesome/fontawesome-free: ใช้สำหรับนำเข้าไอคอนจาก Font Awesome ฟรี แสดงไอคอนต่างๆ ในหน้าเว็บ

## Backend Dependencies
แพ็กเกจที่ใช้ในในโปรเจคฝั่ง Backend
- cryptjs: ใช้สำหรับการแฮชรหัสผ่านอย่างปลอดภัย
- body-parser: ใช้ในการแปลงข้อมูลที่มาจาก body ของคำขอ
- cookie-parser: ใช้ในการแยกและจัดการคุกกี้ในคำขอ HTTP
- cors: ใช้สำหรับเปิดการเข้าถึงข้อมูลระหว่างโดเมน (Cross-Origin Resource Sharing)
- dotenv: ใช้ในการโหลดตัวแปรจากไฟล์ .env
- express: เฟรมเวิร์กสำหรับสร้าง API และเว็บแอป
- jsonwebtoken: ใช้สำหรับสร้างและตรวจสอบ JSON Web Tokens (JWT) สำหรับการยืนยันตัวตน
- mongoose: ใช้ในการเชื่อมต่อและทำงานกับ MongoDB
- morgan: ใช้ในการบันทึกข้อมูลคำขอ HTTP สำหรับการดีบัก
- nodemon: ใช้ในการรีสตาร์ทเซิร์ฟเวอร์โดยอัตโนมัติเมื่อมีการเปลี่ยนแปลงโค้ด
- moment-timezone: ใช้สำหรับจัดการเวลาภายในเขตเวลาต่างๆ


## Installation and Setup
### 1. Setup Backend
1. เปิดเทอร์มินัล (หรือ Command Prompt) และไปที่โฟลเดอร์ที่ ```backend```
```bash
cd backend
```

2.สร้างไฟล์ ```package.json``` (ถ้ายังไม่มี)
```bash
npm init -y
```

3.ติดตั้ง Backend Dependencies
```bash
npm install bcryptjs body-parser cookie-parser cors dotenv express jsonwebtoken mongoose morgan nodemon moment-timezone
```

4.สร้างไฟล์ ```.env```  ตั้งค่าตัวแปรในไฟล์ที่ใช้ในการตั้งค่าคอนฟิกต่างๆ สำหรับแอปพลิเคชัน ดังนี้
### Environment Variables
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET =  
```

- PORT=  กำหนดพอร์ตสำหรับเซิร์ฟเวอร์
- MONGO_URI=  เชื่อมต่อกับ MongoDB ที่ localhost ใช้ฐานข้อมูลชื่อ mydb 
- JWT_SECRET =   รหัสสำหรับเข้ารหัสและถอดรหัส JWT

5.เริ่มต้นเซิร์ฟเวอร์ สำหรับ backend ใช้ ```nodemon``` เพื่อรันเซิร์ฟเวอร์
```bash
nodemon index.js
```



## NextJS

```bash
npm install axios
```

```bash
npm install --save-dev @types/js-cookie
```

## Install Express

```bash
npm install bcryptjs body-parser cookie-parser cors dotenv express jsonwebtoken mongoose morgan nodemon moment-timezone
```

## ใช้ไอคอน Font Awesome

```bash
npm install --save @fortawesome/fontawesome-free
```
