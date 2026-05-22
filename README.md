# RevoShop 🛍️

A full-stack e-commerce platform built with **Next.js**, **React 19**, and **TypeScript** as Milestone 3 of the RevoU Full Stack Software Engineering program.

🔗 **Live Demo:** [https://milestone-3-hilmisalsabilla.vercel.app/](https://milestone-3-hilmisalsabilla.vercel.app/)
📁 **Repository:** [https://github.com/Revou-FSSE-Oct25/milestone-3-HilmiSalsabilla](https://github.com/Revou-FSSE-Oct25/milestone-3-HilmiSalsabilla)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Routes](#pages--routes)
- [Data Fetching Strategies](#data-fetching-strategies)
- [State Management](#state-management)
- [API Reference](#api-reference)
- [Design System](#design-system)
- [Demo Credentials](#demo-credentials)
- [Screenshots](#screenshots)

---

## Overview

RevoShop is a fictional online store that allows:

- **Customers** to browse products, view detailed product pages, manage a shopping cart, and sign in to their account.
- **Administrators** to manage product listings through a protected dashboard with full CRUD functionality.

Products and authentication are powered by [FakeStoreAPI](https://fakestoreapi.com), a free mock REST API for e-commerce prototyping.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | ^15.x | React framework with App Router |
| [React](https://react.dev/) | ^19.1.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Static type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Utility-first CSS framework |
| [FakeStoreAPI](https://fakestoreapi.com/) | — | Mock product data & authentication |

---

## Features

### 🛍️ Customer Features
- **Product Listing** — Browse all products with live search, category filter, and sort by price or rating
- **Product Detail** — Full product page with description, star rating, related products, and tabbed info
- **Shopping Cart** — Add/remove items, adjust quantity, order summary with subtotal — persisted in localStorage
- **Authentication** — Sign in via FakeStoreAPI credentials, session persisted across reloads
- **Promotions Page** — Static promotional banners and category deals
- **FAQ Page** — Accordion-style FAQ with category filtering

### 🛠️ Admin Features
- **Dashboard** — Protected admin panel (login required)
- **Product Stats** — Total products, category count, average price, average rating
- **Create Product** — Add new products via modal form
- **Edit Product** — Update existing product details inline
- **Delete Product** — Remove products with inline confirmation
- **Product Search** — Filter dashboard table by name or category

### ⚙️ Technical Features
- CSR, SSR, and SSG data fetching strategies across different pages
- Loading skeleton animations during data fetch
- Error boundary with custom error UI
- Custom 404 not-found page
- Responsive design with mobile hamburger navigation
- Cart and auth state persisted in `localStorage`

---

## Project Structure

```
revoshop/
├── src/
│   └── app/                          # Next.js App Router
│       ├── layout.tsx                # Root layout — metadata + Providers wrapper
│       ├── page.tsx                  # Home page — product listing (CSR)
│       ├── globals.css               # Global styles, CSS variables, animations
│       ├── loading.tsx               # Route-level loading UI
│       ├── not-found.tsx             # Custom 404 page
│       ├── error.tsx                 # Error boundary (client component)
│       │
│       ├── types/
│       │   └── index.ts              # TypeScript interfaces (Product, User, CartItem, etc.)
│       │
│       ├── context/
│       │   ├── AuthContext.tsx       # Auth state — login, logout, user session
│       │   └── CartContext.tsx       # Cart state — items, quantities, totals
│       │
│       ├── components/
│       │   ├── Providers.tsx         # Client boundary wrapping AuthProvider + CartProvider
│       │   ├── Navbar.tsx            # Navigation bar with cart badge and mobile menu
│       │   ├── ProductCard.tsx       # Reusable product grid card
│       │   └── Footer.tsx            # Site footer with links
│       │
│       ├── product/[id]/
│       │   └── page.tsx              # Product detail page (CSR with dynamic route)
│       ├── cart/
│       │   └── page.tsx              # Shopping cart page
│       ├── login/
│       │   └── page.tsx              # Sign in page
│       ├── faq/
│       │   └── page.tsx              # FAQ — static content (SSG)
│       ├── promotions/
│       │   └── page.tsx              # Promotions — static content (SSG)
│       └── dashboard/
│           └── page.tsx              # Admin CRUD dashboard (auth protected)
│
├── next.config.mjs                   # Next.js config (image domains)
├── tailwind.config.ts                # Tailwind theme config
├── postcss.config.js                 # PostCSS config
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Revou-FSSE-Oct25/milestone-3-HilmiSalsabilla.git

# 2. Navigate into the project folder
cd milestone-3-HilmiSalsabilla/revoshop

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

---

## Pages & Routes

| Route | Page | Strategy | Access |
|---|---|---|---|
| `/` | Home — product listing with search & filter | CSR | Public |
| `/product/[id]` | Product detail with add to cart | CSR (dynamic) | Public |
| `/cart` | Shopping cart with order summary | CSR | Public |
| `/login` | Sign in page | CSR | Public |
| `/faq` | Frequently asked questions | SSG | Public |
| `/promotions` | Current promotions and deals | SSG | Public |
| `/dashboard` | Admin product management (CRUD) | CSR | 🔒 Auth required |

---

## Data Fetching Strategies

### CSR — Client-Side Rendering

Used on the **Home page** (`/`) and **Product Detail page** (`/product/[id]`). Data is fetched in the browser using `useEffect` + `fetch`, enabling interactive filtering, searching, and dynamic content loading.

```tsx
useEffect(() => {
  const fetchProducts = async () => {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch("https://fakestoreapi.com/products"),
      fetch("https://fakestoreapi.com/products/categories"),
    ]);
    const products = await productsRes.json();
    const categories = await categoriesRes.json();
    setProducts(products);
    setCategories(categories);
  };
  fetchProducts();
}, []);
```

### SSG — Static Site Generation

Used on the **FAQ** (`/faq`) and **Promotions** (`/promotions`) pages. These pages use static data defined directly in the component — no external API calls needed. They are pre-rendered at build time, resulting in instant load performance.

---

## State Management

State is managed using React **Context API** with `useState` and `useEffect`. All context providers are wrapped in a single `Providers.tsx` client component that is mounted in `layout.tsx`.

### AuthContext

Manages authentication state throughout the app. Login posts credentials to FakeStoreAPI, receives a token, then fetches the user profile.

```tsx
const { user, isAuthenticated, isLoading, error, login, logout } = useAuth();
```

| Value | Type | Description |
|---|---|---|
| `user` | `User \| null` | Signed-in user object (name, email, token) |
| `isAuthenticated` | `boolean` | Whether a user is currently logged in |
| `isLoading` | `boolean` | Loading state during login request |
| `error` | `string \| null` | Error message from failed login |
| `login(credentials)` | `function` | Authenticates via FakeStoreAPI `/auth/login` |
| `logout()` | `function` | Clears user from state and localStorage |

### CartContext

Manages shopping cart items with full CRUD operations. Cart is automatically persisted to and restored from `localStorage`.

```tsx
const { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isInCart } = useCart();
```

| Value | Type | Description |
|---|---|---|
| `items` | `CartItem[]` | All items currently in the cart |
| `addToCart(product)` | `function` | Add a product or increment its quantity |
| `removeFromCart(id)` | `function` | Remove a product entirely from cart |
| `updateQuantity(id, qty)` | `function` | Set a specific quantity (removes if ≤ 0) |
| `clearCart()` | `function` | Empty the entire cart |
| `totalItems` | `number` | Sum of all item quantities |
| `totalPrice` | `number` | Total value of all items |
| `isInCart(id)` | `function` | Check if a product is already in the cart |

---

## API Reference

All product and auth data comes from [FakeStoreAPI](https://fakestoreapi.com).

| Method | Endpoint | Used In |
|---|---|---|
| `GET` | `/products` | Home page product listing |
| `GET` | `/products/:id` | Product detail page |
| `GET` | `/products/category/:name` | Related products on detail page |
| `GET` | `/products/categories` | Category filter on home page |
| `POST` | `/products` | Create product (Dashboard) |
| `PUT` | `/products/:id` | Edit product (Dashboard) |
| `DELETE` | `/products/:id` | Delete product (Dashboard) |
| `POST` | `/auth/login` | User authentication (Login page) |
| `GET` | `/users/1` | Fetch user profile after login |

> **Note:** FakeStoreAPI is a mock API. POST, PUT, and DELETE operations return simulated responses but do not persist data changes between sessions.

---

## Design System

The UI uses a custom dark industrial aesthetic. Design tokens are defined as CSS variables in `globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-surface` | `#141414` | Card and panel backgrounds |
| `--color-border` | `#2a2a2a` | Borders and dividers |
| `--color-text` | `#e8e8e8` | Primary text |
| `--color-muted` | `#6a6a6a` | Secondary / placeholder text |
| `--color-accent` | `#e8ff00` | Primary accent (yellow-green) |
| `--color-accent2` | `#ff3d3d` | Danger and error states |
| `--color-accent3` | `#00d4ff` | Info and highlight accent |

**Fonts (via Google Fonts):**
- **Display:** [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) — headings, prices, labels
- **Body:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — all UI text
- **Mono:** [DM Mono](https://fonts.google.com/specimen/DM+Mono) — IDs, codes, numeric values

---

## Demo Credentials

To access the protected **Dashboard**, sign in using the FakeStoreAPI test account:

```
Username: johnd
Password: m38rmF$
```

> These credentials are provided by FakeStoreAPI for testing purposes. All users have access to the dashboard since FakeStoreAPI does not support role-based accounts.

---

## Screenshots

### Home Page
![Landing Page](./revoshop/assets/landing-page.webp)

### Promotions Page
![Promotions Page](./revoshop/assets/promo-page.webp)

### FAQ Page
![FAQ Page](./revoshop/assets/faq-page.webp)

### Login Page
![Login Page](./revoshop/assets/login-page.webp)


---

## 👤 Author

**Hilmi Salsabilla**  
RevoU FSSE Oct25 Batch