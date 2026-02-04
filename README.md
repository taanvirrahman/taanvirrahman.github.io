# Tanvir Rahman | Personal Portfolio

A minimalist, high-performance personal portfolio website designed to showcase projects, share professional notes, and explore the intersection of art, design, and AI.

![License](https://img.shields.io/github/license/taanvirrahman/taanvirrahman.github.io?style=flat-square)
![Vercel](https://img.shields.io/badge/deployment-GitHub_Pages-blue?style=flat-square)

## ✨ Overview

This repository contains the source code for my personal website. The design philosophy centers on minimalism, typography, and subtle interactive experiences. It serves as a central hub for my professional identity and creative explorations.

## 🚀 Key Features

- **Minimalist Aesthetic**: Clean, typography-driven UI inspired by Swiss design and modern software interfaces.
- **Dynamic Content**: A custom-built 'Notes' section using Markdown rendering for easy technical writing.
- **Interactive Elements**: Micro-animations, custom cursor effects, and grid-based visual experiments.
- **Responsive Design**: Fully optimized for all device sizes, from mobile to desktop.
- **Newsletter Subscription**: integrated contact form for stay connected.

## 🛠 Technology Stack

- **Core**: Semantic HTML5, Vanilla JavaScript (ESLint compliant modules).
- **Styling**: Modern CSS3 using CSS Custom Properties (Variables) and Grid/Flexbox layouts.
- **Typography**: IBM Plex Mono for a technical, yet approachable feel.
- **Libraries**:
  - `marked.js`: For client-side Markdown rendering.
  - `canvas-confetti`: For interactive micro-moments.

## 📂 Project Structure

```text
├── content/            # Markdown content for notes
├── src/
│   ├── css/            # Main stylesheet (style.css)
│   └── js/             # MVC Architecture (controller, model, view, effects)
├── index.html          # Portfolio landing page
├── notes.html          # Technical notes & blog system
└── README.md           # Project documentation
```

## 💻 Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/taanvirrahman/taanvirrahman.github.io.git
   cd taanvirrahman.github.io
   ```

2. **Serve the project**:
   Since this is a static site, you can use any local server. For example:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (serve)
   npx serve .
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:8000` (or the port provided by your server).

## 🌍 Deployment

The site is automatically deployed to **GitHub Pages** whenever changes are pushed to the `main` branch.

---

Built with 🖤 by [Tanvir Rahman](https://github.com/taanvirrahman)
