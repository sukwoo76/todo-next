# Todo Next - Claude Code Project

## Project Overview

A modern, colorful todo list application built with Next.js 14, React 18, and Tailwind CSS.

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks + localStorage
- **Deployment**: Vercel
- **Repository**: https://github.com/sukwoo76/todo-next

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Project Structure
```
todo-next/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page & state management
│   └── globals.css         # Global styles & animations
├── components/
│   ├── TodoForm.tsx        # Input form
│   ├── TodoItem.tsx        # Individual todo item
│   ├── TodoList.tsx        # List container
│   └── TodoStats.tsx       # Statistics display
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Key Features
- ✅ Add, complete, and delete todos
- ✅ Filter by status (all, pending, completed)
- ✅ Real-time statistics
- ✅ Persistent storage (localStorage)
- ✅ Animated UI with gradients
- ✅ Responsive design
- ✅ Modern, colorful interface

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## Git & GitHub
- Repository: https://github.com/sukwoo76/todo-next
- Push changes: `git push origin master`
- Create PR: `git push origin feature-branch && gh pr create`

## Deployment
- Hosted on: Vercel
- Auto-deploy on push to GitHub
- Deploy button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sukwoo76/todo-next)

## Development Notes
- Components use 'use client' for client-side rendering
- Animations defined in globals.css
- All styles use Tailwind CSS utilities
- Responsive classes for mobile/tablet/desktop
- Filter state managed in page.tsx

## Future Enhancements
- [ ] Backend API integration (database)
- [ ] User authentication
- [ ] Categories/tags for todos
- [ ] Due dates
- [ ] Dark mode toggle
- [ ] PWA support
