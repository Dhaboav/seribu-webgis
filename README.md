<br />
<div align="center">
  <h3 align="center">📊 SERIBU - WEB</h3>

  <p align="center">
    A simple and minimal web interface for Gemastik SERIBU built with Laravel and React.
  </p>
</div>

---

## 🚀 Overview

**SERIBU** is a lightweight web application designed to provide a simple interface to demo and display images sent from sensors.  
This project is a modified version of the Laravel React Starter Kit.

---

### 🔑 Current Features

- 🔐 User registration and authentication with Laravel Sanctum
- 🗳️ Dashboard with React frontend
- ✅ API Token Management
- 📈 Secure API endpoints for image submission
- 🧩 More features coming soon...

---

### 📦 Installation

> **Requirements:**
>
> - PHP >= 8.1
> - Composer
> - Node.js & NPM
> - A database (e.g., MySQL or PostgreSQL)

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Dhaboav/seribu-web.git
    cd seribu-web
    ```

2. **Install PHP dependencies:**

    ```bash
    composer install
    ```

3. **Install JavaScript dependencies:**

    ```bash
    npm install
    ```

4. **Copy the environment file:**

    ```bash
    cp .env.example .env
    ```

5. **Generate application key:**

    ```bash
    php artisan key:generate
    ```

6. **Configure your `.env` database and environment settings.**

7. **Run database migrations:**

    ```bash
    php artisan migrate
    ```

8. **Create symbolic link to public storage:**

    ```bash
    php artisan storage:link
    ```

9. **Build frontend assets:**

    ```bash
    npm run build
    ```

10. **Serve the application:**

    ```bash
    php artisan serve
    ```

---

### 💡 Development

During development, you can use hot reloading for React:

```bash
npm run dev
```

---

### 🧾 Attribution

This project is based on the following open-source work:

- **Laravel React Starter Kit**  
  Repository: [https://github.com/laravel/react-starter-kit](https://github.com/laravel/react-starter-kit)  
  License: MIT License

The Laravel React Starter Kit was used as the foundation for this project.  
Significant modifications and additional features have been implemented as part of the **SERIBU - WEB** project by Dhaboav.  
All original copyright notices from the upstream project are retained.
