# PRIMER Admin Dashboard

A modern, responsive admin dashboard template built with Next.js, TypeScript, and Tailwind CSS. This project replicates the PRIMER admin template design with a clean Material Design-inspired interface.

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Development**: Hot reload with Next.js dev server

## 📁 Project Structure

```
primer-admin-dashboard/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── Sidebar.tsx          # Navigation sidebar component
│   ├── StatCard.tsx         # Statistics card component
│   ├── Newsfeed.tsx         # Newsfeed component
│   └── UserProfile.tsx      # User profile component
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🛠️ Installation & Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd primer-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Features

### Dashboard Components
- **Statistics Cards**: Display key metrics with icons
- **Newsfeed**: Recent activity feed with user avatars
- **User Profile**: Profile card with stats
- **Image Gallery**: Visual content with engagement metrics
- **Map Section**: Location-based content display

### Navigation
- **Sidebar Navigation**: Complete menu structure with badges
- **Active State Management**: Interactive menu items
- **Responsive Design**: Mobile-friendly layout

### Design Elements
- **Material Design**: Clean, modern interface
- **Card-based Layout**: Organized content sections
- **Hover Effects**: Interactive UI elements
- **Typography**: Consistent text hierarchy

## 📊 Dashboard Sections

1. **Header Bar**: Search functionality
2. **Statistics Overview**: Campaigns, Customers, Queries, Opens
3. **Main Content Area**:
   - Newsfeed with recent stories
   - Image posts with engagement metrics
   - User profiles with follower stats
   - Map views and landscape images

## 🎯 Customization

### Adding New Components
1. Create new component files in the `components/` directory
2. Import and use them in `app/page.tsx`
3. Style with Tailwind CSS classes

### Modifying Colors
Update the `tailwind.config.js` file to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Adding New Menu Items
Edit the `menuItems` array in `components/Sidebar.tsx`:
```javascript
const menuItems = [
  // Add new menu items here
]
```

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deployment Options
- **Vercel**: Recommended for Next.js projects
- **Netlify**: Static site deployment
- **AWS**: Custom server deployment
- **Docker**: Containerized deployment

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Build
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Tailwind CSS docs](https://tailwindcss.com/docs)
3. Open an issue in the project repository

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
