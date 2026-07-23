# AWS Student Builder Community Day 🚀

![AWS Community Day Banner](https://img.shields.io/badge/AWS-Community_Day-00A8E1?style=for-the-badge&logo=amazonwebservices)
![Vercel Deployment](https://img.shields.io/badge/Vercel-Deploy_Ready-000000?style=for-the-badge&logo=vercel)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Welcome to the official repository for the **AWS Student Builder Community Day at Rungta University**. 
This project is a high-performance, fully responsive, and highly animated static website built for tech communities, bootcamps, and hackathons. It features a modern, cyberpunk-inspired aesthetic tailored for developers.

---

## ✨ Features

- **Cyberpunk UI/UX:** Deep dark mode `(#02040a)` paired with neon cyan accents, `IBM Plex Mono` typography, and glowing CSS layers.
- **Interactive Backgrounds:** Custom HTML5 Canvas network particle animation mimicking neural networks and cloud infrastructure routing.
- **Fully Responsive:** Fluid layouts built with CSS Grid/Flexbox, working flawlessly from ultra-wide monitors down to mobile devices.
- **Form Integration:** Pre-configured with an interactive, multi-step registration wizard integrated directly with EmailJS for automated confirmations.
- **Zero Dependencies:** Built entirely with raw HTML, CSS, and Vanilla JavaScript. No bulky frameworks, no build steps. Lightning fast.
- **Vercel Ready:** Includes a `vercel.json` file enforcing clean URLs for immediate, zero-config deployment on Vercel.

---

## 📂 Project Structure

```text
/
├── assets/
│   ├── app.js         # Core JS: Navigation, Modals, Canvas Network Animation
│   └── style.css      # Core CSS: Variables, Globals, Components, Cyber theme
├── index.html         # Landing page with hero, tracks, speakers, and CTA
├── register.html      # Multi-step registration wizard
├── agenda.html        # Detailed event schedule and timeline
├── speakers.html      # Speaker profiles and session overviews
├── tracks.html        # Workshop tracks (Generative AI, Serverless, DevOps)
├── venue.html         # Location details, maps, and FAQ
├── about.html         # Event statistics and community impact
├── schedule.html      # Standalone detailed schedule
└── vercel.json        # Vercel configuration for clean routing
```

---

## 🚀 Getting Started

### Local Development
Since this project uses pure HTML/JS/CSS, you can run it instantly using any local development server. 
If you have Node.js installed, simply run:

```bash
npx serve .
```
Navigate to `http://localhost:3000` to view the site.

### Deployment

This repository is optimized for **Vercel**. 
1. Import this repository into your Vercel dashboard.
2. Vercel will automatically detect it as a static project.
3. The included `vercel.json` ensures that `.html` extensions are cleanly masked (e.g., `/register` instead of `/register.html`).

---

## 🎨 Design System

- **Typography:** `IBM Plex Mono` (Google Fonts) used globally for a unified, terminal-like developer experience.
- **Primary Colors:** 
  - AWS Blue: `#00A8E1`
  - Cyber Cyan: `#4DB5FF`
  - Deep Space (Background): `#02040a`
- **Icons:** Professional SVG icons supplied by Lucide.

---

## 📝 License
This project is open-source and free to use for community events and student groups.
