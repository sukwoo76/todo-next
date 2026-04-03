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
- `npm test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with interactive UI
- `npm run test:coverage` - Generate test coverage report

## Git & GitHub
- Repository: https://github.com/sukwoo76/todo-next
- Push changes: `git push origin master`
- Create PR: `git push origin feature-branch && gh pr create`

## Deployment
- Hosted on: Vercel
- Auto-deploy on push to GitHub
- Deploy button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sukwoo76/todo-next)

## Testing

### Test Framework
- **Framework**: Vitest
- **Testing Library**: @testing-library/react
- **Test Files**: `.test.tsx` files co-located with components

### Test Coverage
- **TodoForm.test.tsx**: Input validation, form submission, edge cases
- **TodoItem.test.tsx**: Checkbox toggle, delete functionality, UI states
- **TodoList.test.tsx**: List rendering, multiple todos, special characters
- **page.test.tsx**: Integration tests, localStorage, filtering, complex scenarios

### Running Tests
```bash
npm test              # Run all tests
npm run test:ui       # Interactive UI mode
npm run test:coverage # Generate coverage report
```

### Test Principles
- Real functionality validation (not just snapshot testing)
- Edge cases and boundary value testing
- Error scenario testing
- No hardcoding for test passing
- Integration tests for complex workflows

## Development Notes
- Components use 'use client' for client-side rendering
- Animations defined in globals.css
- All styles use Tailwind CSS utilities
- Responsive classes for mobile/tablet/desktop
- Filter state managed in page.tsx
- localStorage mocked in tests for isolation

## Future Enhancements
- [ ] Backend API integration (database)
- [ ] User authentication
- [ ] Categories/tags for todos
- [ ] Due dates
- [ ] Dark mode toggle
- [ ] PWA support

##다음을 반드시 지켜주세요

##테스트 코드의 품질
- 반드시 실제 기능을 검증할 것
- 각 테스트는 구체적인 입력과 예상 출력의 검증을 포함할 것

##하드코딩 금지
- 테스트 통과만을 위한 하드코딩 절대 금지
- 환경변수나 설정 파일을 활용해 테스트 환경과 프로덕션 환경을 분리할 것

##테스트 구현 원칙
- 경곗값, 예외 상황, 오류가 발생할 수 있는 경우도 테스트
- 빈틈없이 테스트
- 꼭 실패하는 경우도 테스트

##구현 전 확인
- 기능 명세를 정확히 이해한 후 테스트 작성
- 불명확한 점이 있으면 사용자에게 반드시 확인후에 작성
