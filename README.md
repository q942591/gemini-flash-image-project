# Gemini Flash Image Project

<div align="center">

![Gemini Flash Image](https://img.shields.io/badge/Gemini-2.5%20Flash%20Image-blue?style=for-the-badge&logo=google)
![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38b2ac?style=for-the-badge&logo=tailwind-css)

**Revolutionary AI image editing tool that makes creativity accessible**

[Live Demo](https://gemini-flash-image.vercel.app) • [Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)

</div>

## 🚀 Overview

Gemini Flash Image is a cutting-edge AI-powered image editing platform that leverages Google's Gemini 2.5 Flash Image technology. It enables users to create professional-quality images, teaching illustrations, and creative artwork through natural language descriptions.

## ✨ Key Features

### 🎨 **Six Major Application Scenarios**
- **Teaching Before/After Comparison** - Transform handwritten notes into clear visual materials
- **Poster Generation** - Create stunning posters with AI assistance
- **Data Visualization** - Convert raw data into engaging charts and graphs
- **Whiteboard to Visual** - Transform sketches into professional diagrams
- **Moodboard Creation** - Generate inspirational moodboards for design projects
- **AI Sketch Enhancement** - Improve and refine AI-generated sketches

### 🔧 **Core Technology Features**
- **Intelligent Text Understanding** - Advanced NLP for accurate text interpretation
- **Image Generation Engine** - Large-scale pre-trained models for high-quality output
- **Real-time Optimization** - Flash architecture for millisecond-level response

### 🌍 **Internationalization**
- Full Chinese and English language support
- Seamless language switching without page refresh
- Context-aware translations

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 13 with App Router
- **UI Library**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Radix UI + Shadcn UI
- **3D Graphics**: WebGL with OGL library
- **Animations**: Framer Motion + Custom CSS animations
- **State Management**: React Context API
- **Build Tool**: Vite + Next.js
- **Deployment**: Vercel-ready

## 🎯 Use Cases

### 👨‍🏫 **Education Sector**
- Create engaging teaching materials
- Transform complex concepts into visual aids
- Generate educational illustrations and diagrams

### 🎨 **Design & Creative**
- Professional poster and banner design
- Moodboard and inspiration creation
- AI-assisted creative workflows

### 📊 **Business & Data**
- Data visualization and charts
- Professional presentations
- Marketing material creation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/q942591/gemini-flash-image-project.git
cd gemini-flash-image-project
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
gemini-flash-image-project/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── image-edit/        # Image editing page
│   ├── pricing/           # Pricing page
│   ├── about/             # About us page
│   ├── privacy-policy/    # Privacy policy
│   ├── terms-of-service/  # Terms of service
│   └── refund-policy/     # Refund policy
├── components/             # React components
│   ├── ui/                # Shadcn UI components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Hero section
│   ├── FunctionPage.tsx   # Main features page
│   ├── RollingGallery.tsx # 3D image gallery
│   ├── Prism.tsx          # WebGL background
│   └── ...                # Other components
├── hooks/                  # Custom React hooks
│   └── useLanguage.tsx    # Language management
├── locales/                # Translation files
│   └── translations.ts    # Chinese/English translations
├── lib/                    # Utility functions
│   └── utils.ts           # Helper functions
├── public/                 # Static assets
│   ├── logo.png           # Project logo
│   └── ...                # Other assets
└── tailwind.config.ts     # Tailwind CSS configuration
```

## 🌟 Features in Detail

### **Interactive Image Comparison**
- Before/After slider functionality
- Real-time image transformation preview
- Multiple comparison scenarios

### **3D Rolling Gallery**
- Cylindrical 3D perspective effects
- Interactive image navigation
- Smooth animations and transitions

### **Responsive Design**
- Mobile-first approach
- Cross-device compatibility
- Optimized for all screen sizes

### **Performance Optimization**
- React Server Components (RSC)
- Dynamic imports and lazy loading
- Optimized images and assets

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Gemini Flash Image
```

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom color schemes
- Extended animations
- Responsive breakpoints
- Custom component classes

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- Netlify
- AWS Amplify
- Docker deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI technology
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters

## 📞 Contact

- **Project**: [GitHub Issues](https://github.com/q942591/gemini-flash-image-project/issues)
- **Email**: media@aiqwen.cc
- **Website**: [Gemini Flash Image](https://gemini-flash-image.vercel.app)

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/q942591/gemini-flash-image-project)
![GitHub issues](https://img.shields.io/github/issues/q942591/gemini-flash-image-project)
![GitHub pull requests](https://img.shields.io/github/issues-pr/q942591/gemini-flash-image-project)
![GitHub stars](https://img.shields.io/github/stars/q942591/gemini-flash-image-project)

---

<div align="center">

**Made with ❤️ by the Gemini Flash Image Team**

[Star this repo](https://github.com/q942591/gemini-flash-image-project) • [Report a bug](https://github.com/q942591/gemini-flash-image-project/issues) • [Request a feature](https://github.com/q942591/gemini-flash-image-project/issues)

</div>
