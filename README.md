# Tito Kilonzo Kinyambu — Portfolio v2

> **Full-Stack Developer · Cybersecurity Analyst · ICT Consultant**  
> Built with React + Vite · Framer Motion · CSS Houdini · Live APIs

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://tito-portfolio-official.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📸 What This Is

A production-grade personal portfolio and developer dashboard for **Tito Kilonzo Kinyambu**, showcasing real-world engineering work across full-stack development, cybersecurity, fiber optic infrastructure, and open-source tooling.

This is **Version 2** — rebuilt on top of the original dashboard with five major new features inspired by modern portfolio design:

- 🎬 Cinematic preloader with glitch text animation
- 🧲 Magnetic buttons with spring physics
- 🪟 Bento skills grid with cursor-following spotlight
- 🌗 Light / Dark theme toggle (persisted + system-aware)
- 💬 Testimonials page with interactive expand cards

---

## 🚀 Tech Stack

| Layer             | Technology                                          |
|-------------------|-----------------------------------------------------|
| Framework         | React 18 + Vite 5                                   |
| Routing           | React Router DOM v6                                 |
| Animations        | Framer Motion 11                                    |
| CSS Effects       | CSS Houdini Paint Worklets · CSS `@property`        |
| Theming           | CSS custom properties · `data-theme` attribute      |
| Security          | DOMPurify · Honeypot · CSP meta · Abort controllers |
| Icons             | Lucide React                                        |
| Fonts             | Syne · JetBrains Mono · DM Sans (Google Fonts)      |
| Live Data         | GitHub REST API · Dev.to API                        |
| Deployment        | Vercel (recommended) · Netlify · Nginx VPS          |

---

## 📁 Project Structure

```
tito-portfolio-updated/
│
├── public/
│   ├── favicon.svg
│   ├── cv/
│   │   └── TITO_KILONZO_KINYAMBU-CV.pdf     ← swap with your latest CV
│   ├── backgrounds/                          ← page-specific bg images
│   │   ├── bg-home.jpg
│   │   ├── bg-about.jpg
│   │   ├── bg-blog.jpg
│   │   ├── bg-contact.jpg
│   │   ├── bg-projects.jpg
│   │   └── bg-services.jpg
│   └── worklets/
│       └── circuit-paint.js                 ← CSS Houdini paint worklet
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← responsive nav · mobile drawer · theme toggle
│   │   ├── Footer.jsx          ← sitemap links · socials · copyright
│   │   ├── ScrollProgress.jsx  ← spring-animated scroll progress bar
│   │   ├── WaveCard.jsx        ← 3D mouse-tilt card with shine layer    [v1]
│   │   ├── AnimatedBackground.jsx ← per-page canvas background          [v1]
│   │   ├── Preloader.jsx       ← cinematic fullscreen intro animation   [v2 NEW]
│   │   ├── MagneticButton.jsx  ← spring-physics cursor pull wrapper     [v2 NEW]
│   │   ├── BentoSkills.jsx     ← bento grid · spotlight hover effect    [v2 NEW]
│   │   └── ThemeToggle.jsx     ← dark/light toggle + ThemeProvider ctx  [v2 NEW]
│   │
│   ├── hooks/
│   │   ├── useGitHubProjects.js  ← fetches + TTL-caches GitHub repos
│   │   ├── useTechBlog.js        ← fetches + TTL-caches Dev.to articles
│   │   └── useResponsive.js      ← breakpoint hooks (md, lg)
│   │
│   ├── pages/
│   │   ├── Home.jsx          ← hero · typewriter · stats · quick links
│   │   ├── About.jsx         ← bento skills grid · experience timeline · flip card
│   │   ├── Projects.jsx      ← live GitHub repos · language filter · shimmer
│   │   ├── Blog.jsx          ← Dev.to auto-feed · cybersec + dev articles
│   │   ├── Services.jsx      ← SynthLink service categories + accordion
│   │   ├── Contact.jsx       ← terminal-style form · validation · honeypot
│   │   └── Testimonials.jsx  ← stats bar · expandable testimonial cards [v2 NEW]
│   │
│   ├── utils/
│   │   └── security.js       ← DOMPurify helpers · session cache with TTL
│   │
│   ├── App.jsx               ← ThemeProvider · Preloader gate · route tree
│   ├── main.jsx
│   └── index.css             ← design tokens · light theme · keyframes · utilities
│
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites

- **Node.js** ≥ 18 — [download here](https://nodejs.org)
- **npm** ≥ 9 (bundled with Node)
- A terminal (PowerShell, iTerm, WSL — whatever you vibe with)

### Step-by-step

```bash
# 1. Unzip the project or clone your repo
cd tito-portfolio-updated

# 2. Install all dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the preloader fires first, then the site loads.

### Build for production

```bash
npm run build
```

This outputs an optimised static site to `/dist` — minified JS, inlined CSS, tree-shaken imports, no source maps.

```bash
# Preview the production build locally before deploying
npm run preview
```

---

## ☁️ Deploying to Vercel (Recommended)

Vercel is the cleanest option for Vite + React — zero config, auto HTTPS, global edge CDN, and instant preview URLs per commit.

### Option A — Vercel CLI (fastest, ~2 minutes)

```bash
# 1. Install the Vercel CLI globally
npm install -g vercel

# 2. Log in (opens browser for OAuth)
vercel login

# 3. Deploy from inside the project folder
cd tito-portfolio-updated
vercel
```

Answer the prompts like this:

```
? Set up and deploy? → Y
? Which scope? → your personal account
? Link to existing project? → N  (first deploy)
? What's your project name? → tito-portfolio
? In which directory is your code? → ./
? Want to override the settings? → N  (Vite is auto-detected)
```

Your **preview URL** is printed instantly. To push to production:

```bash
vercel --prod
```

Your live URL will look like: `https://tito-portfolio.vercel.app`

---

### Option B — Vercel Dashboard (no CLI, all browser)

1. Push your project to GitHub (`git push`)
2. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository**
3. Select `TitoKilonzo/Tito_Portfolio_Official`
4. Vercel auto-detects **Vite** — leave all settings as default
5. Click **Deploy**

From this point, every `git push` to `main` auto-deploys to production. Every PR gets its own preview URL.

---

### Option C — Manual drag-and-drop

```bash
npm run build
# Then drag the /dist folder into vercel.com/new
```

---

### Vercel Build Settings (if you need to set manually)

| Setting           | Value           |
|-------------------|-----------------|
| Framework Preset  | Vite            |
| Build Command     | `npm run build` |
| Output Directory  | `dist`          |
| Install Command   | `npm install`   |
| Node.js Version   | **18.x**        |

> ⚠️ Set Node.js to 18.x explicitly in **Project Settings → General → Node.js Version** to avoid build failures.

---

### Fix React Router on Vercel (important!)

By default, refreshing a page like `/about` on Vercel returns a 404 because Vercel doesn't know to serve `index.html` for all routes. Fix this by creating a `vercel.json` in the project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Then redeploy. This is already included in this project.

---

### Adding a Custom Domain on Vercel

1. In your Vercel project → **Settings → Domains**
2. Type your domain (e.g. `titokilonzo.dev`) → **Add**
3. Vercel shows you DNS records — add them in your registrar (Namecheap, GoDaddy, etc.)
4. SSL certificate is auto-provisioned — takes 1–5 minutes

---

## 🌐 Deploying to Netlify (Alternative)

```bash
npm run build

# Option 1: Drag-and-drop
# Go to netlify.com → drag the /dist folder onto the deploy zone

# Option 2: Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --dir=dist          # preview deploy
netlify deploy --dir=dist --prod   # production
```

**Important for Netlify:** Create a `_redirects` file inside `/public` so React Router works:

```
/* /index.html 200
```

---

## 🖥️ Deploying on a VPS with Nginx

```bash
# 1. Build locally
npm run build

# 2. Upload /dist to your server
scp -r dist/ user@your-server:/var/www/tito-portfolio/

# 3. Create Nginx config
sudo nano /etc/nginx/sites-available/tito-portfolio
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/tito-portfolio/dist;
    index index.html;

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|svg|ico|woff2|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# 4. Enable site and reload Nginx
sudo ln -s /etc/nginx/sites-available/tito-portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 5. Free SSL with Certbot
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🗺️ Pages & Routes

| Route            | What's There                                                           |
|------------------|------------------------------------------------------------------------|
| `/`              | Hero · Python code card · typewriter · stats · magnetic CTA buttons   |
| `/about`         | Bento skills grid · experience timeline · flip reference card          |
| `/projects`      | Live GitHub repos (auto-fetched) · language filter · shimmer skeleton  |
| `/blog`          | Dev.to auto-feed — Cybersecurity, Technology, Dev tags                 |
| `/services`      | SynthLink Technologies service categories with expandable cards        |
| `/testimonials`  | Stats bar · click-to-expand testimonial cards                          |
| `/contact`       | Terminal-style form · input validation · honeypot · mailto fallback   |

---

## ✨ Full Feature Reference

### v1 Features (original — untouched)

| Feature                  | Details                                                              |
|--------------------------|----------------------------------------------------------------------|
| **3D Wave Cards**         | Mouse-tracking perspective tilt + refraction shine layer             |
| **Houdini Circuit BG**   | CSS Paint Worklet draws a circuit-board background at runtime        |
| **Rotating Conic Border**| CSS `@property --angle` + `conic-gradient` spinning logo border      |
| **Typewriter Hero**      | Cycles through 5 roles with real delete-and-retype animation         |
| **Scroll Progress Bar**  | Spring-animated conic-gradient bar fixed to top of viewport          |
| **Flip Reference Card**  | 3D CSS card flip — front: availability · back: reference info        |
| **Mobile Drawer Nav**    | Slide-in spring-animated drawer with numbered links                  |
| **Shimmer Loading**      | CSS skeleton shimmer for repos and blog cards while fetching         |
| **Live GitHub Feed**     | Real repos from `@TitoKilonzo` with language badges and stars        |
| **Dev.to Blog Feed**     | Auto-curated articles — Cybersecurity, Technology, Dev tags          |
| **Terminal Contact Form**| Monospaced `>_` aesthetic, validation + honeypot field               |
| **Session Cache TTL**    | 1-hour API response cache — no repeat fetches, no sensitive storage  |
| **Python Code Hero**     | Syntax-highlighted `class TitoKilonzo` rendered letter-by-letter     |

### v2 Features (new in this version)

| Feature                  | Details                                                              |
|--------------------------|----------------------------------------------------------------------|
| **Cinematic Preloader**  | Fullscreen intro: conic logo · glitch-scramble name · scanline · progress bar (~2.5s) |
| **Magnetic Buttons**     | Framer Motion spring physics cursor pull on all hero CTAs + Hire Me  |
| **Bento Skills Grid**    | 6 skill cards with cursor-following radial spotlight and hover glows |
| **Light / Dark Theme**   | Full toggle with CSS overrides · `localStorage` persistence · system preference on first load |
| **Testimonials Page**    | `/testimonials` — stats block + 4 click-to-expand cards with accent side-bar |

---

## 🔒 Security Implementation

| Measure                  | Where                          | What It Does                                      |
|--------------------------|--------------------------------|---------------------------------------------------|
| **DOMPurify**            | GitHub + Dev.to feeds          | Sanitizes all remote content before rendering     |
| **Input sanitization**   | Contact form                   | Escapes `<`, `>`, `"` on all inputs               |
| **Honeypot field**       | Contact form                   | Invisible field — bot submissions silently dropped|
| **Abort controllers**    | All `useEffect` fetch hooks    | Cancels pending requests on component unmount     |
| **Session cache TTL**    | `utils/security.js`            | Expires cached API data after 1 hour              |
| **CSP meta tags**        | `index.html`                   | Restricts resource loading origins                |
| **Security headers**     | `vite.config.js` dev server    | `X-Frame-Options: DENY`, `X-Content-Type-Options` |
| **Source maps off**      | Production build               | No source code exposed in browser DevTools        |

---

## 🛠️ Customization Guide

### Personal details to update

| File                              | What to change                                         |
|-----------------------------------|--------------------------------------------------------|
| `src/hooks/useGitHubProjects.js`  | `GITHUB_USER` → your GitHub username                  |
| `src/pages/Contact.jsx`           | `mailto:` email address                               |
| `src/pages/Home.jsx`              | Intro copy, social links, STATS values                |
| `src/pages/About.jsx`             | `EXPERIENCE` array — real roles and highlights        |
| `src/components/BentoSkills.jsx`  | `SKILLS` array — your tools per category              |
| `src/pages/Testimonials.jsx`      | `TESTIMONIALS` array — real quotes from real people   |
| `src/components/Preloader.jsx`    | Your name strings and role tags                       |
| `src/components/Navbar.jsx`       | Name, social links                                    |
| `src/components/Footer.jsx`       | Name, social links                                    |

### Replace the CV

Drop your updated PDF at:
```
public/cv/TITO_KILONZO_KINYAMBU-CV.pdf
```

### Change colours

All tokens are in `src/index.css`:

```css
:root {
  --primary:   #00ff88;  /* main green accent */
  --secondary: #38d2f7;  /* cyan */
  --accent:    #a855f7;  /* purple */
}

[data-theme="light"] {
  --primary:   #00a854;  /* darker green for contrast on light bg */
  /* ... */
}
```

### Add a new page

1. Create `src/pages/YourPage.jsx`
2. Add the route in `src/App.jsx`:
   ```jsx
   <Route path="/your-page" element={<YourPage />} />
   ```
3. Add the link to the `LINKS` array in both `Navbar.jsx` and `Footer.jsx`

---

## 🐛 Troubleshooting

**Preloader shows but site never loads**  
The `onDone` callback gates rendering. If it freezes, temporarily set `const [ready, setReady] = useState(true)` in `App.jsx` to skip the preloader while debugging.

**GitHub repos not showing**  
GitHub's unauthenticated API allows 60 requests/hour per IP. To increase limits, create a GitHub personal access token and add it to `useGitHubProjects.js` as an `Authorization: Bearer <token>` header using a `VITE_GITHUB_TOKEN` env variable.

**Houdini background not visible**  
CSS Houdini (`CSS.paintWorklet`) only works in Chromium browsers (Chrome, Edge, Brave). Firefox and Safari gracefully fall back to a plain dark background — no errors thrown.

**Light theme looks wrong**  
All light overrides live in `src/index.css` under `[data-theme="light"]`. Adjust `--primary`, `--bg-*`, and `--text` tokens freely.

**Vercel 404 on page refresh**  
Add or verify `vercel.json` exists in the project root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify 404 on page refresh**  
Make sure `public/_redirects` contains:
```
/* /index.html 200
```

**Build failing on Vercel**  
Go to **Project Settings → General → Node.js Version** → set to `18.x` explicitly.

---

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "framer-motion": "^11.3.31",
  "lucide-react": "^0.439.0",
  "dompurify": "^3.1.6"
}
```

All animations are pure Framer Motion — no GSAP, no Three.js, keeping the bundle light and the build fast.

---

## 👤 Author

**Tito Kilonzo Kinyambu**  
Back-End Developer · Cybersecurity Analyst · ICT Consultant  
📍 Nairobi, Kenya

| Platform   | Link                                                                          |
|------------|-------------------------------------------------------------------------------|
| 🐙 GitHub  | [github.com/TitoKilonzo](https://github.com/TitoKilonzo)                     |
| 💼 LinkedIn| [linkedin.com/in/titokinyambu](https://linkedin.com/in/titokinyambu)          |
| ✉️ Email   | titokilonzo3@gmail.com                                                        |
| 🌐 Live    | [tito-portfolio-official.vercel.app](https://tito-portfolio-official.vercel.app) |
| 🏢 Company | SynthLink Technologies                                                        |

---

## 📄 License

MIT © 2025 Tito Kilonzo Kinyambu  
Free to fork, adapt, and build on — credit appreciated but not required.

---

*Caffeine → Code → Commit → Repeat* ☕
