# 🏫 CampusKey – Student Accommodation Platform

**CampusKey** is a smart, student-first web platform that connects university students with trusted and verified landlords offering housing near campuses. Built with a modern full-stack architecture, it offers secure listings, real-time messaging, and transparent reviews to streamline the student housing experience.

---

## 🔧 Tech Stack

### 💻 Frontend
- [Next.js](https://nextjs.org/) – React-based frontend framework
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS for modern UI
- [shadcn/ui](https://ui.shadcn.com/) – Accessible, customizable UI components

### 🚀 Backend
- [Spring Boot](https://spring.io/projects/spring-boot) – Java-based backend framework
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) – ORM & database integration
- [Spring Security](https://spring.io/projects/spring-security) – Authentication & Authorization
- PostgreSQL – Relational database (can switch to MySQL)
- H2 – In-memory DB for development/testing
- Spring Boot Actuator – System monitoring endpoints
- Springdoc OpenAPI – API documentation (Swagger UI)

---

## 📦 Features

### 👨‍🎓 For Students
- Browse and filter verified property listings
- View photos, amenities, pricing, and landlord info
- Book accommodation and leave reviews

### 🧑‍💼 For Landlords
- Register and verify account
- Add and manage listings
- Receive student inquiries
- Build trust through student reviews

---

## 📁 Project Structure

```

campuskey/
├── backend/              # Spring Boot project
│   ├── src/main/java/
│   ├── resources/
│   └── build.gradle
├── frontend/             # Next.js app
│   ├── pages/
│   ├── components/
│   └── tailwind.config.js

````

---

## 🧪 Getting Started

### ✅ Backend Setup (Spring Boot)

1. Install JDK 17+
2. Make sure MySQL is installed and running locally
3. Create a MySQL database:
   ```sql
   CREATE DATABASE campuskey;

4. API will be available at: `http://localhost:8080`

### ✅ Frontend Setup (Next.js)

1. Install Node.js (18+ recommended)
2. Navigate to `frontend/`
3. Install dependencies:

   ```bash
   npm install
   ```
4. Run the development server:

   ```bash
   npm run dev
   ```
5. App will be live at: `http://localhost:3000`

---

## 🔐 Environment Variables

### Frontend (`.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Backend (`application.properties`)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/campuskey
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

---

## 🌍 Live Demo

Coming soon: [https://campuskey.co.zw](https://campuskey.co.zw)

---


## 📬 Contact

Developed with ❤️ by [Terryktee](https://linkedin.com/in/terryktee)
🌐 Website: [https://Karvellie.co.zw](https://Karvellie.co.zw)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
