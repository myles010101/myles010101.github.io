# Portfolio — Your Name

> Personal portfolio website for a 4th Year Computer Engineering student.
> Built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies beyond CDN links.

## 🚀 Live Site
[your-username.github.io](https://your-username.github.io)

## 🛠️ Tech Used
- HTML5 (semantic)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (IntersectionObserver, cursor, typewriter, filter, counter)
- Font Awesome (icons via CDN)
- Google Fonts — Bricolage Grotesque, DM Sans + DM Mono

## 📁 Project Structure
```
portfolio/
├── index.html      ← Main HTML file
├── style.css       ← All styles
├── script.js       ← All interactivity
├── resume.pdf      ← Your resume (add this)
└── assets/
    ├── photo.jpg   ← Your photo (add this)
    └── project*.png ← Project screenshots (optional)
```

## 📋 Customization Checklist
- [ ] Replace `Your Name` in `index.html` with your real name
- [ ] Update the logo initials `YN` → your initials
- [ ] Add your photo to `assets/photo.jpg` and uncomment the `<img>` tag
- [ ] Fill in your university, GWA, graduation year
- [ ] Update experience, achievements
- [ ] Add real project titles, descriptions, and GitHub links
- [ ] Add/remove tech stack items to match your actual skills
- [ ] Update social links (GitHub, LinkedIn, email)
- [ ] Add your resume as `resume.pdf`
- [ ] Set up form handler (Formspree or EmailJS)
- [ ] Update `<title>` and meta tags
- [ ] (Optional) Add a favicon

## 🌐 Deploying to GitHub Pages
1. Create a repository named `your-username.github.io`
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source → main branch → / (root)**
4. Your site will be live at `https://your-username.github.io`

## 🔌 Setting Up the Contact Form (Formspree)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy the endpoint URL
3. In `script.js`, replace the simulated handler with:
```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(form)
}).then(res => {
  if (res.ok) {
    formNote.textContent = '✅ Message sent!';
    formNote.className = 'form-note success';
    form.reset();
  }
}).catch(() => {
  formNote.textContent = '❌ Something went wrong.';
  formNote.className = 'form-note error';
});
```

## ✨ Features
- Custom animated cursor
- Typewriter effect (hero section)
- Smooth scroll reveal animations
- Project category filter
- Animated stat counters
- 3D card tilt effect
- Sticky nav with active section highlight
- Mobile-responsive hamburger menu
- Warm editorial design with an orange-led palette
- Engineering-inspired grid and project artwork
- Ambient blob background

---
Made with ♥ by Your Name
