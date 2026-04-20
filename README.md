# Modern Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark/Light Theme**: Toggle between dark and light modes
- **Smooth Animations**: Framer Motion for beautiful animations
- **SEO Optimized**: Meta tags, proper headings, and semantic HTML
- **Type Safety**: Full TypeScript support
- **Modern UI**: Clean, minimal design with custom components

## 📱 Pages

- **Home**: Hero section with introduction and call-to-action
- **About**: Detailed biography, skills, experience, and education
- **Projects**: Portfolio showcase with filtering and project details
- **Blog**: Article listing with search and tag filtering
- **Contact**: Contact form with validation and social links

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── pages/              # Page components
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   └── Projects.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── assets/             # Static assets
│   └── images/
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      },
      dark: {
        // Your dark theme colors
      }
    }
  }
}
```

### Content

Update the content in each page component:

- Personal information in `Home.tsx`
- Skills and experience in `About.tsx`
- Projects data in `Projects.tsx`
- Blog posts in `Blog.tsx`
- Contact information in `Contact.tsx`

### Styling

- Global styles: `src/index.css`
- Component styles: Tailwind classes in component files
- Custom animations: `tailwind.config.js` keyframes

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Theme System

The app includes a built-in theme system with:

- Light and dark mode support
- System preference detection
- Persistent theme selection
- Smooth transitions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms

The app can be deployed to any static hosting platform that supports SPA routing.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

If you have any questions or need help, feel free to reach out:

- Email: contact@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

---

Made with ❤️ by [Your Name]
