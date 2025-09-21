# Bourgondier Weekly Wine Club

A bilingual (Russian/English) Astro website for a weekly wine tasting club. The word "bourgondier" means "lover of life" in Dutch, making it the perfect name for a community of wine enthusiasts.

## 🍷 About the Club

This website serves as the online presence for Bourgondier Weekly, a wine club that brings together like-minded people interested in wine and everything related to it. It's not a professional course or master class, but rather an opportunity for regular networking and knowledge sharing about wine selection, understanding, purchasing, storage, and enjoyment.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) v5.13.5
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v3.4.17
- **Language**: TypeScript
- **Deployment**: GitHub Pages (static site)
- **Forms**: Formspree integration

## 🌟 Features

- **Bilingual Support**: Full Russian and English language versions
- **Dark/Light Mode**: Theme switching capability
- **Responsive Design**: Mobile-first responsive layout
- **Contact Forms**: Integrated with Formspree for member registration
- **Admin Dashboard**: Administrative interface for club management
- **Club Information**: Sections for organizers, tastings, and calls to action

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── AK.webp            # Organizer photo
│   ├── KK.webp            # Organizer photo
│   ├── cta.webp           # Call-to-action image
│   └── favicon.svg        # Site favicon
├── src/
│   ├── components/        # Astro components
│   │   ├── en/           # English components
│   │   ├── CallToAction.astro
│   │   ├── Header.astro
│   │   ├── Navigation.astro
│   │   ├── Organizers.astro
│   │   ├── Signup.astro
│   │   ├── Tastings.astro
│   │   └── ...
│   ├── layouts/          # Page layouts
│   │   ├── en/          # English layouts
│   │   └── Layout.astro
│   ├── pages/           # Route pages
│   │   ├── en/         # English pages
│   │   ├── admin.astro # Admin dashboard
│   │   └── index.astro # Home page
│   └── styles/
│       └── tailwind.css # Global styles
├── data/
│   └── club.db         # Club data storage
├── astro.config.mjs    # Astro configuration
├── tailwind.config.cjs # Tailwind configuration
├── DEPLOYMENT_CHECKLIST.md
└── GITHUB_PAGES_SETUP.md
```

## 🎨 Design System

The website uses a sophisticated color palette and typography:

### Colors
- **Light Mode**: Clean whites and beiges with dark text
- **Dark Mode**: Deep wine-inspired reds with light text
- **Primary**: #333333 (light) / #4a1a1a (dark)
- **Background**: #FDFDFD (light) / #630800 (dark)

### Typography
- **Sans**: DM Mono for clean, modern text
- **Serif**: Noto Serif Display for elegant headings

## 🛠️ Development

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd puffy-pegasi

# Install dependencies
npm install
```

### Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally before deploying |
| `npm run astro ...` | Run Astro CLI commands |

### Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:4321`

## 🌐 Deployment

This site is configured for deployment on GitHub Pages. See the detailed deployment guides:

- `DEPLOYMENT_CHECKLIST.md` - Complete deployment checklist
- `GITHUB_PAGES_SETUP.md` - GitHub Pages setup instructions

### Configuration
- **Site URL**: `https://club.bourgondier.wine`
- **Output**: Static site generation
- **Forms**: Formspree integration for contact forms

## 📧 Form Integration

The website uses Formspree for handling contact forms and member registrations. Forms include:
- Club membership signup
- Contact inquiries
- Admin communications

## 🌍 Internationalization

The site supports two languages:
- **Russian** (default): `/` routes
- **English**: `/en/` routes

Each language has its own:
- Component variants in `src/components/[lang]/`
- Layout variants in `src/layouts/[lang]/`
- Page variants in `src/pages/[lang]/`

## 📱 Responsive Design

Built with mobile-first responsive design principles:
- Fluid layouts using CSS Grid and Flexbox
- Responsive images with WebP format
- Touch-friendly navigation
- Optimized for all device sizes

## 🔧 Configuration Files

- `astro.config.mjs` - Astro framework configuration
- `tailwind.config.cjs` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is for the Bourgondier Weekly wine club. Please contact the organizers for usage permissions.

## 📞 Contact

For questions about the wine club or website, please use the contact form on the website or reach out through the admin dashboard.

---

*Built with ❤️ for wine lovers by wine lovers*