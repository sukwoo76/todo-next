# Todo List Application

A modern, clean todo list application built with Next.js 14, React, and Tailwind CSS.

## Features

- ✅ Add new todos
- ✅ Mark todos as completed
- ✅ Delete individual todos
- ✅ Clear all completed todos at once
- ✅ Real-time statistics (total, completed, pending)
- ✅ Persistent storage using localStorage
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **localStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page with todo logic
│   └── globals.css      # Global styles
├── components/
│   ├── TodoForm.tsx     # Input form for new todos
│   ├── TodoItem.tsx     # Individual todo item
│   ├── TodoList.tsx     # Todo list container
│   └── TodoStats.tsx    # Statistics display
└── package.json
```

## Usage

1. **Add a Todo**: Type in the input field and click "Add" or press Enter
2. **Complete a Todo**: Click the checkbox next to any todo
3. **Delete a Todo**: Click "Delete" button that appears on hover
4. **Clear Completed**: Click "Clear completed" button to remove all completed todos

## Features Details

### Local Storage
Todos are automatically saved to browser's localStorage and restored when you revisit the page.

### Responsive Design
The application works seamlessly on desktop, tablet, and mobile devices.

### Real-time Statistics
Track your progress with live stats showing total, completed, and pending todos.

## License

MIT
