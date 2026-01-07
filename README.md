# Ikhfad Sporton Frontend

A modern web application built with **Next.js 16** and **React 19**, designed for high performance and a seamless developer experience.

## 🚀 Development Environment

This project is developed and optimized using [DDEV](https://ddev.com/), a Docker-based local development tool. Using DDEV ensures a consistent environment across different machines and handles SSL, networking, and performance optimizations (like Mutagen) automatically.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/)
- [DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/)

### Getting Started with DDEV
1.  **Start the environment:**
    ```powershell
    ddev start
    ```
2.  **Install dependencies:**
    ```powershell
    ddev pnpm install
    ```
3.  **Run the development server:**
    The server starts automatically via a background daemon. You can access it at:
    `https://ikhfad-sporton-fe.ddev.site`

4.  **View Logs:**
    To see the Next.js output, use:
    ```powershell
    ddev logs -f
    ```

---

## Windows Development Notes (Crucial)

To ensure a smooth experience on Windows, especially when using **Mutagen** and **pnpm**, please follow these guidelines:

### 1. Enable Developer Mode
Windows requires **Developer Mode** to be active so that pnpm can create symbolic links on your host drive. Without this, Mutagen sync will fail with a "required privilege is not held" error.
- Go to **Settings > System > For developers** and toggle **Developer Mode** to **On**.

### 2. Managing node_modules
To avoid sync conflicts, **always run package commands inside DDEV**.
- **DO NOT** delete `node_modules` manually from Windows File Explorer while DDEV is running.
- If you need a clean install, run:
  ```powershell
  ddev stop

---

## 🛠 Manual Installation (Without DDEV)

If you prefer to run the project natively on your host machine, ensure you have **Node.js 20+** and **pnpm** installed.

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Run development server:**
    ```bash
    pnpm dev
    ```
3.  **Open the app:**
    Navigate to `http://localhost:3000`.

---

## 📦 Tech Stack & Dependencies

### Core
* **Next.js (v16.1.1):** React framework for production.
* **React (v19.2.3):** For building the user interface.
* **TypeScript:** For type-safe development.

### UI & Styling
* **Tailwind CSS (v4):** A utility-first CSS framework.
* **React Icons:** High-quality icons for the UI.
* **React Toastify:** Elegant notifications and alerts.

### Development Tools
* **ESLint:** Pluggable linting utility for JavaScript/TypeScript.
* **PostCSS:** Tool for transforming CSS with JavaScript.

---

## 📂 Project Structure
* `app/`: Contains the Next.js App Router, pages, and layouts.
* `public/`: Static assets like images and fonts.
* `.ddev/`: Local environment configuration and custom commands.

---

## 📝 Commit Convention
This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` New features
- `fix:` Bug fixes
- `build:` Changes to dependencies or build system
- `chore:` Maintenance tasks
- `refactor:` Code changes that neither fix bugs nor add features