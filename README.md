# reault.tech — Portfolio Site

> Personal portfolio / résumé site for **Corentin Réault** — SysOps & Network Engineer

---

## 🌐 Live

- **Production** : https://reault.tech
- **Staging** : https://staging.reault.tech (non-crawlable via `robots.txt`)

---

## 🛠 Stack

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML / CSS / JS (ES6 modules) |
| Styling | Custom design tokens + Bootstrap 5.2 (utilities only) |
| Animations | AOS (Animate On Scroll) + Typed.js + Particles.js |
| Icons | Font Awesome 6.4 |
| i18n | Lightweight JSON-driven (FR/EN) — no framework |
| Runtime | Nginx (Alpine) — multi-stage Docker build |
| CI/CD | Forgejo Actions → Kaniko → `git.reault.tech/forgejo_admin/frontend` |
| Deploy | Kubernetes (OVH Managed K8s) + Pomerium Ingress |
| Analytics | Umami (self-hosted, `tracker.reault.tech`) |

---

## 🚀 Local Dev

```bash
# Serve static files (no build step needed)
npx serve . -l 8080

# Or with Docker
docker build -t reault-tech-frontend .
docker run -p 8080:80 reault-tech-frontend
```

Open http://localhost:8080

---

## 🏗 Build & Deploy (CI)

Pipeline: `.forgejo/workflows/build.yml`

- Triggers: push to `main`
- Builder: Kaniko (rootless, in-cluster)
- Output tags: `build-<run>-<sha>` + `latest`
- Registry: `git.reault.tech/forgejo_admin/frontend`

No manual Docker push needed — Forgejo runner handles it.

---

## ⚙️ Configuration

| File | Purpose |
|------|---------|
| `default.conf` | Nginx config (SPA fallback, caching, security headers, dynamic `robots.txt` via `$host`) |
| `Dockerfile` | Multi-stage: Node builder (injects `{{VERSION}}` → `build-<n>-<sha>`) → Nginx runtime |
| `index.html` | Single-page app — all content, i18n dicts, JSON-LD structured data |
| `assets/` | CSS, JS, images, CV PDF |
| `libs/` | Vendored libs (Bootstrap, FontAwesome, AOS, Typed.js) — no CDN at runtime |

### Cache Busting

Version injected at build time via `--build-arg VERSION=build-XX-<sha>` → replaces `{{VERSION}}` in `index.html`. All static assets referenced with `?v={{VERSION}}` in HTML.

---

## 🌍 Staging vs Production

- **Single Docker image** for both environments
- Nginx `$host` variable drives `robots.txt`:
  - `staging.reault.tech` → `Disallow: /`
  - `reault.tech` → `Allow: /`
- Ingresses: separate Pomerium Ingress resources per env

---

## 📁 Structure

```
.
├── index.html              # Single-page app (all sections, i18n, JSON-LD)
├── Dockerfile              # Multi-stage build
├── default.conf            # Nginx config
├── assets/
│   ├── css/style.css       # Design tokens + components
│   ├── js/main.js          # App logic (theme, i18n, particles, contact form)
│   ├── img/                # Avatar, favicon, cert logos (white bg #fff)
│   └── cv-corentin-reault.pdf
├── libs/                   # Vendored dependencies (no runtime CDN)
│   ├── bootstrap-5.2.3-dist/
│   ├── fontawesome-free-6.4.2-web/
│   ├── aos/
│   └── typed.js/
├── .forgejo/workflows/
│   └── build.yml           # Forgejo Actions → Kaniko
└── k8s/                    # K8s manifests (runner, secrets) — cluster-specific
```

---

## 📄 License

MIT — feel free to fork & adapt for your own portfolio.

---

## 👤 Author

**Corentin Réault**  
SysOps & Network Engineer — Kubernetes, Cloud, Networking, Automation  
🔗 [reault.tech](https://reault.tech) • [LinkedIn](https://linkedin.com/in/corentin-reault) • [GitHub](https://github.com/corentin-reault)