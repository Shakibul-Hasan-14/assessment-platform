# Assessment Platform

A simplified Online Assessment Platform built as a frontend engineering task. The platform features two panels — an **Employer Panel** for creating and managing online tests, and a **Candidate Panel** for taking those tests.

---

## Live Demo

> Coming Soon

---

## Video Walkthrough

> Coming Soon

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit |
| Forms | React Hook Form |
| Validation | Zod |
| API Handling | Axios |
| Mock API | Mock Service Worker (MSW) |
| Routing | React Router DOM v6 |

---

## Project Structure

```
src/
  pages/
    auth/             # Login page
    employer/         # Dashboard, manage-test/BasicInfo, manage-test/QuestionBuilder
    candidate/        # Dashboard, ExamScreen
  components/
    ui/               # Shared reusable components (Button, Card, Input etc.)
    employer/         # Employer-specific components
    candidate/        # Candidate-specific components
    layout/           # Header, Footer, Layout
  store/              # Redux slices (auth, tests, manageTest, candidateTests)
  services/           # Axios instance + API service functions
  mocks/              # MSW handlers and mock data
  hooks/              # Custom hooks (useLogin, useTests, useExam etc.)
  routes/             # AppRoutes, ProtectedRoute
```

---

## Features

### Employer Panel
- Login with role-based redirect
- Dashboard with exam cards, search, and pagination
- Create Online Test — Step 1: Basic Info (multi-field form with validation)
- Create Online Test — Step 2: Question Builder (add, edit, delete questions)
- Support for MCQ, Checkbox, and Paragraph question types
- Dynamic option builder with variable number of options

### Candidate Panel
- Login with role-based redirect
- Dashboard with available exam cards, search, and pagination
- Exam Screen with live countdown timer
- Answer tracking for MCQ, Checkbox, and Paragraph types
- Question navigator showing answered vs unanswered questions
- Auto-submit on timeout
- Manual submit on final question
- Behavioral tracking — tab switch and fullscreen exit detection with warning banner
- Test Completed and Timeout screens with personalized messaging

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Shakibul-Hasan-14/assessment-platform.git

# Navigate into the project
cd assessment-platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

> MSW (Mock Service Worker) starts automatically in development mode. You should see `[MSW] Mocking enabled.` in the browser console.

---

## Mock Credentials

| Role | Email | Password |
|---|---|---|
| Employer | employer@akij.com | password123 |
| Candidate | candidate@akij.com | password123 |

---

## Additional Questions

### MCP Integration

I haven't worked with MCP yet, but I see it as a powerful way to connect my development environment directly to the project's external tools. For this platform, I would use a **Figma MCP** to let an AI assistant pull design tokens and component dimensions directly from the source. This would ensure the UI is pixel-perfect to the Figma specs without the manual effort of inspecting every margin and hex code.

Additionally, I would use a **Database MCP** (like Supabase or PostgreSQL) to allow for real-time data management. Instead of manually checking a dashboard, I could use the AI to verify test submissions or update exam metadata directly through natural language. This would significantly speed up the debugging process when testing the multi-step form logic and candidate response tracking.

---

### AI Tools for Development

During this project I used **Claude** and **Gemini** to speed up development. These tools helped with scaffolding component structures, writing custom hooks, debugging logic, and ensuring best practices around Redux state management and React Hook Form integration. AI assistance was particularly useful for accelerating repetitive patterns like form validation schemas and API service functions, freeing up time to focus on the more complex UI workflows like the exam screen and behavioral tracking.

---

### Offline Mode

To handle offline mode, I would use **IndexedDB** or **LocalStorage** to persist candidate answers in the browser as they progress. By implementing a custom hook that monitors the `window.online` and `offline` events, the app would automatically notify the user of connection drops and queue any unsaved responses. Once connectivity is restored, a background synchronization process would push the queued data back to the server, ensuring no progress is lost while maintaining the integrity of the exam timer.

---

## Architecture Decisions

- **Unified Login** — A single login page handles both employer and candidate authentication. The MSW mock API returns a `role` field which determines the redirect destination, keeping the codebase DRY.
- **Custom Hooks** — All API calls and business logic are encapsulated in custom hooks (`useLogin`, `useTests`, `useBasicInfo`, `useQuestionBuilder`, `useCandidateTests`, `useExam`), keeping pages clean and logic reusable.
- **MSW for Mocking** — Mock Service Worker intercepts real HTTP requests at the network level, meaning the Axios service layer works identically to how it would against a real backend. Swapping to a real API only requires updating the `baseURL` in `src/services/api.js`.
- **Role-based Route Protection** — `ProtectedRoute` reads from Redux state to guard routes by both authentication status and user role, preventing candidates from accessing employer routes and vice versa.

---

## Repository

[https://github.com/Shakibul-Hasan-14/assessment-platform](https://github.com/Shakibul-Hasan-14/assessment-platform)