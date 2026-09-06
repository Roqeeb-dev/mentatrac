# Mentatrac — Mental Health & Wellness Application

Mentatrac is a simple, secure, and intuitive digital wellness platform designed to help students, working professionals, and individuals manage everyday stress, foster emotional self-awareness, and build healthy mental hygiene habits.

Through a 5-step guided check-in flow, dynamic mood analytics, and integrated reflective journaling, Mentatrac provides a private, judgment-free space for users to understand their mental well-being over time.

---

## Key Features

- **Dynamic Daily Check-Ins**
  - Interactive 5-step modal flow capturing mood scores (1–5 scale), emotion categories, contributing lifestyle factors (influencers), and personalized notes.
  - Custom interactive sliders, option chips, and animated modal transitions.

- **Personalized Dashboard & Hero Banner**
  - Time-aware greeting (`Good morning`, `Good afternoon`, `Good evening`) with inline skeleton loading states.
  - Real-time metrics highlighting active day streaks, total check-ins, and journal entry counts.
  - Pixel-accurate **Today's Mood** summary card and **This Week** interactive squircle mood strip with color-coded score indicators.

- **14-Day Mood Trends & Analytics**
  - Graphical visualization of mood progression over weekly and bi-weekly ranges.
  - Highlighted patterns linking emotions to lifestyle influencers (work, sleep, family, school).

- **Private Reflective Journal**
  - Create, edit, search, and manage personal journal entries linked directly to daily check-ins.
  - Quick-entry widgets and journal history views.

- **Guided Quick Exercises & Wellness**
  - Built-in breathing techniques (e.g., 4-7-8 Breathing Technique) and actionable stress management suggestions.

---

## Tech Stack & Architecture

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Client/Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management & Data Fetching:** [@tanstack/react-query](https://tanstack.com/query/latest) (React Query)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) Icons
- **UI Components:** Custom component library built with accessibility, glassmorphism, depth layering, and slate/emerald color palettes.

---

## Getting Started

### Prerequisites

- Node.js `18.x` or later
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Roqeeb-dev/mentatrac.git
   cd mentatrac
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open application:**

   Navigate to `http://localhost:3000` in your browser.

---

---

## API Endpoints Summary

| Method | Endpoint         | Description                                                        |
| ------ | ---------------- | ------------------------------------------------------------------ |
| `GET`  | `/api/profile`   | Retrieve the authenticated user's profile and streak details.      |
| `GET`  | `/api/check-ins` | Fetch complete check-in history for data charts and count metrics. |
| `POST` | `/api/check-ins` | Submit a new multi-step daily check-in payload.                    |
| `GET`  | `/api/journal`   | Fetch all journal entries for the current user.                    |
| `POST` | `/api/journal`   | Create a new journal entry.                                        |
