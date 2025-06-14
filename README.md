# Quiz Wiz Worksheet Genie 🧙‍♂️📚

An AI-powered educational worksheet generator that helps teachers and educators create custom quizzes, worksheets, and study materials in seconds.

![Quiz Wiz Banner](https://img.shields.io/badge/Quiz%20Wiz-Educational%20AI-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌟 Overview

Quiz Wiz Worksheet Genie revolutionizes educational content creation by leveraging AI to generate customized learning materials. Teachers can create engaging worksheets, comprehensive study guides, and interactive quizzes tailored to their students' needs and curriculum requirements.

### 🎯 Key Features

- **AI-Powered Generation**: Create educational content with advanced AI assistance
- **Multiple Content Types**: Generate quizzes, worksheets, study guides, and more
- **Curriculum Alignment**: Content aligned with educational standards
- **Customizable Difficulty**: Adjust complexity for different grade levels
- **Export Options**: Download in various formats (PDF, DOCX, etc.)
- **Subject Coverage**: Support for all major subjects and topics
- **Answer Keys**: Automatic generation of answer sheets
- **Mobile-Friendly**: Access and create content on any device

## 🚀 Live Demo

Visit our live application: [https://quiz-wiz-worksheet-genie.netlify.app](https://quiz-wiz-worksheet-genie.netlify.app)

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Reusable component library
- **Lucide Icons** - Beautiful icon set

### State Management & Data
- **Zustand** - Lightweight state management (planned)
- **React Query** - Server state management (planned)
- **Supabase** - Backend services (planned)

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

## 📁 Project Structure

```
quiz-wiz-worksheet-genie/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Atomic design components
│   │   ├── compound/     # Molecule components
│   │   ├── blocks/       # Organism components
│   │   ├── layout/       # Layout templates
│   │   └── pages/        # Page components
│   ├── lib/              # Utility functions
│   ├── services/         # API services
│   ├── stores/           # State management
│   ├── types/            # TypeScript types
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
├── .ai-guides/          # AI development guides
└── docs/                # Documentation
```

## 🏗️ Architecture

### Component Architecture
Following **Atomic Design Principles**:
- **Atoms**: Basic UI elements (buttons, inputs)
- **Molecules**: Simple component groups
- **Organisms**: Complex component sections
- **Templates**: Page layouts
- **Pages**: Complete views

### Service Layer
Clean architecture with separation of concerns:
- Mock data services for development
- Interface-based design for easy backend migration
- Future-ready for Supabase integration

### Mobile-First Design
- Dynamic viewport height (`dvh`) for mobile browsers
- Touch-optimized interfaces
- Responsive breakpoints
- Progressive Web App capabilities

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/flexpertsdev/quiz-wiz-worksheet-genie.git
cd quiz-wiz-worksheet-genie
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## 📋 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with React + TypeScript + Vite
- [x] Tailwind CSS configuration
- [x] Basic landing page
- [x] GitHub repository
- [x] Netlify deployment

### Phase 2: Core Architecture 🚧
- [ ] Atomic design component structure
- [ ] Service layer implementation
- [ ] State management with Zustand
- [ ] React Router setup
- [ ] Authentication system

### Phase 3: Features 📝
- [ ] Quiz generation engine
- [ ] Worksheet templates
- [ ] Content management system
- [ ] Export functionality
- [ ] User dashboard

### Phase 4: Enhancement 🌟
- [ ] AI integration
- [ ] Collaborative features
- [ ] Analytics dashboard
- [ ] Premium features
- [ ] Mobile apps

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run linting
npm run lint

# Type checking
npm run typecheck
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide](https://lucide.dev)
- Component architecture inspired by [Atomic Design](https://atomicdesign.bradfrost.com)

## 📞 Contact

For questions or support, please reach out to:
- GitHub Issues: [Create an issue](https://github.com/flexpertsdev/quiz-wiz-worksheet-genie/issues)
- Email: support@quizwiz.edu (placeholder)

---

Made with ❤️ by educators, for educators