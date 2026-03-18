# Tito Kilonzo — Dashboard Portfolio

A modern, production-grade portfolio and dashboard built with **React + Vite**, **Framer Motion**, and **CSS Houdini**, featuring live GitHub project feeds, auto-updated tech blogs, 3D wave cards, rotating conic-gradient animations, and a terminal-style contact form.

---

## 🚀 Tech Stack

| Layer          | Technology                                   |
|---------------|----------------------------------------------|
| Framework      | React 18 + Vite 5                            |
| Routing        | React Router DOM v6                          |
| Animations     | Framer Motion 11                             |
| CSS Effects    | CSS Houdini Paint Worklets + CSS `@property` |
| Security       | DOMPurify, honeypot, CSP meta, input sanitization |
| Icons          | Lucide React                                 |
| Fonts          | Syne (display) · JetBrains Mono · DM Sans    |
| APIs           | GitHub REST API · Dev.to API                 |

---

## 📁 Project Structure

```
tito-portfolio/
├── public/
│   ├── favicon.svg
│   ├── cv/
│   │   └── TITO_KILONZO_KINYAMBU-CV.pdf   ← place CV here
│   └── worklets/
│       └── circuit-paint.js               ← Houdini worklet
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         ← responsive nav with mobile drawer
│   │   ├── Footer.jsx
│   │   ├── ScrollProgress.jsx ← scroll-driven spring progress bar
│   │   └── WaveCard.jsx       ← 3D mouse-tilt perspective card
│   ├── hooks/
│   │   ├── useGitHubProjects.js  ← fetches + caches GitHub repos
│   │   └── useTechBlog.js        ← fetches + caches Dev.to articles
│   ├── pages/
│   │   ├── Home.jsx       ← hero, typewriter, stats, quick links
│   │   ├── About.jsx      ← tech-stack accordion, experience timeline, flip ref card
│   │   ├── Projects.jsx   ← live GitHub repos with language filter
│   │   ├── Blog.jsx       ← auto-updated Dev.to tech + cyber articles
│   │   ├── Services.jsx   ← accordion service categories
│   │   └── Contact.jsx    ← terminal-style form with validation + honeypot
│   ├── utils/
│   │   └── security.js   ← DOMPurify helpers, session cache with TTL
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         ← Houdini @property, keyframes, design tokens
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Navigate into the project folder
cd tito-portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🌐 Pages

| Route        | Description |
|-------------|-------------|
| `/`          | Hero section, typewriter role switcher, stats, quick-link cards |
| `/about`     | Tech-stack accordion (6 categories), experience timeline, flip reference card, education |
| `/projects`  | Live GitHub repos auto-fetched from @TitoKilonzo, language filter, shimmer loading |
| `/blog`      | Auto-curated articles from Dev.to — Cybersecurity, Technology, Dev |
| `/services`  | 6 service categories with expandable sub-service cards |
| `/contact`   | Terminal-style form with validation, honeypot, mailto fallback |

---

## 🔒 Security Features

- **DOMPurify** sanitizes all API content (GitHub, Dev.to) before rendering
- **Input sanitization** on contact form (`<`, `>`, `"` escaped)
- **Honeypot field** on contact form catches bots
- **Abort controllers** on all API fetch hooks (prevents memory leaks)
- **Session cache with TTL** — no sensitive data stored, 1-hour expiry
- **CSP meta tags** in `index.html`
- **`X-Frame-Options: DENY`**, `X-Content-Type-Options: nosniff` on dev server
- **Source maps disabled** in production build

---

## ✨ Special Features

| Feature | Details |
|---------|---------|
| **3D Wave Cards** | `WaveCard.jsx` — mouse-tracking perspective tilt + refraction shine |
| **Rotating Conic Border** | CSS `@property --angle` + `conic-gradient` spinning border |
| **Typewriter** | Role switcher on hero — cycles through 5 roles with delete effect |
| **Scroll Progress** | Spring-animated conic-gradient progress bar |
| **Houdini Worklet** | Circuit-board canvas paint worklet registered at runtime |
| **Flip Reference Card** | 3D card flip reveals reference availability |
| **Mobile Drawer** | Smooth spring-animated slide-in nav for mobile |
| **Shimmer Loading** | CSS shimmer skeleton for GitHub + Blog loading states |

---

## 🛠️ Customization

### Personal Details
Update the following constants:
- `src/hooks/useGitHubProjects.js` → `GITHUB_USER`
- `src/pages/Contact.jsx` → email address
- `src/pages/Home.jsx` → intro copy, social links
- `src/components/Navbar.jsx` / `Footer.jsx` → name, links

### CV File
Place your CV at `public/cv/TITO_KILONZO_KINYAMBU-CV.pdf`  
(already included in this build)

### Colors / Tokens
All design tokens live in `src/index.css` under `:root { ... }`.

---

## 📦 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag and drop the /dist folder to Netlify dashboard
```

### VPS (Nginx)
```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /var/www/tito-portfolio/dist;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
  add_header X-Frame-Options "DENY";
  add_header X-Content-Type-Options "nosniff";
}
```

---

## 👤 Author

**Tito Kilonzo Kinyambu**  
Back-End Developer · Cybersecurity Analyst · ICT Consultant  
📍 Nairobi, Kenya  
🔗 [github.com/TitoKilonzo](https://github.com/TitoKilonzo) · [linkedin.com/in/titokinyambu](https://linkedin.com/in/titokinyambu)  
✉️ titokilonzo3@gmail.com

---

© 2025 Tito Kilonzo Kinyambu — SynthLink Technologies
