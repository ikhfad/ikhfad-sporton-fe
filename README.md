# Ikhfad Sporton Frontend

A modern web application built with **Next.js 16** and **React 19**, designed for high performance and a seamless developer experience.

## 🚀 Development Environment

This project is developed and optimized using [DDEV](https://ddev.com/), a Docker-based local development tool. Using DDEV ensures a consistent environment across different machines and handles SSL, networking, and performance optimizations (like Mutagen) automatically.

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/)
- [Mise (Optional)](https://github.com/jdx/mise)

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
  ```

---

## 🛠 Manual Installation (Without DDEV)

If you prefer to run the project natively on your host machine, ensure you have **Node.js 24+** and **pnpm** installed.

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

- **Next.js (v16.1.1):** React framework for production.
- **React (v19.2.3):** For building the user interface.
- **TypeScript:** For type-safe development.
- **Zustand**: Lightweight state management for the shopping cart.

### UI & Styling

- **Tailwind CSS (v4):** A utility-first CSS framework.
- **React Icons:** High-quality icons for the UI.
- **React Toastify:** Elegant notifications and alerts.

### Dev Dependencies

- **ESLint:** Pluggable linting utility for JavaScript/TypeScript.
- **PostCSS:** Tool for transforming CSS with JavaScript.

### Development Tools

- **mise**: Reproducible tool versions (Node 24.13.0, pnpm 10.28.0).
- **ddev**: Consistent and containerized development experience.

---

## 📂 Project Structure

```bash
ikhfad-sporton-fe/
├── .ddev/                   # DDEV docker-based local development environment
│   ├── commands/            # Custom project-specific bash scripts
│   │   └── web/             # Scripts running in container (e.g., next-clean)
│   └── config.yaml          # Main DDEV project configuration
├── .next/                   # Next.js build cache (Automatically Git ignored)
├── app/                     # Next.js 16 App Router (Core Source Code)
│   ├── (landing)/           # Marketing/Public pages (Route Group)
│   │   ├── components/      # UI blocks specific to the landing page
│   │   │   ├── categories.tsx
│   │   │   └── product-section.tsx
│   │   └── page.tsx         # Root landing page entry point
│   ├── checkout/            # Checkout flow and payment pages
│   ├── order-status/        # Dynamic [id] routes for order tracking
│   ├── hooks/               # Custom React hooks (e.g., useCart, useAuth)
│   ├── lib/                 # Core logic and Third-party wrappers
│   │   └── api.ts           # Central fetchAPI utility with error handling
│   ├── services/            # Pure data fetching (Separated from UI)
│   │   ├── bank.service.ts  # Bank data integration
│   │   ├── category.service.ts
│   │   └── product.service.ts
│   ├── store/               # State management (Zustand)
│   │   └── useCartStore.ts  # Shopping cart logic with persist middleware
│   ├── types/               # Global TypeScript interfaces
│   │   ├── api.d.ts         # Generic API response shapes
│   │   └── models.ts        # Business models (Category, Product)
│   ├── utils/               # Pure helper functions (formatting, helpers)
│   │   ├── format-price.ts  # Currency/Number formatting
│   │   └── image-helper.ts  # getImageUrl logic for Remote Patterns
│   ├── globals.css          # Tailwind CSS v4 directives
│   └── layout.tsx           # Root layout with fonts and metadata
├── public/                  # Static assets (favicons, brand images)
├── .editorconfig            # Standardizes indentation across VS Code
├── .gitignore               # Files excluded from Version Control
├── mise.toml                # Single source of truth for Node & pnpm versions
├── next.config.ts           # Next.js config (RemotePatterns, etc.)
├── package.json             # Scripts and dependency list
├── pnpm-lock.yaml           # Deterministic dependency tree
└── tailwind.config.ts       # Design system and theme customization
```

---

## 📝 Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Type       | Description                                                      |
| :--------- | :--------------------------------------------------------------- |
| `feat`     | New features (e.g., `feat: add bank interface`)                  |
| `fix`      | Bug fixes (e.g., `fix: fix missing properties in button`)        |
| `style`    | UI/CSS changes (e.g., `style: change main section min height`)   |
| `refactor` | Code cleanup (e.g., `refactor: simplify customer contact input`) |
| `chore`    | Tool/Config updates (e.g., `chore: bump node to v24.13.0`)       |
| `docs`     | Documentation updates                                            |
