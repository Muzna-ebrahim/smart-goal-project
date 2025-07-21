# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# SMART GOAL PROJECT

A financial goal tracking application built with React and Vite that helps users manage their savings goals and track progress toward financial targets.

## Features

- Create, update, and delete financial goals
- Track progress for each goal with visual progress bars
- Make deposits to increase saved amounts for any goal
- View overview statistics (total goals, total saved, completed goals)
- Status indicators for goals (completed, warning, overdue)
- Deadline tracking with warnings for approaching deadlines

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the JSON server (for the mock API):
   ```
   npm run server
   ```
4. In a separate terminal, start the development server:
   ```
   npm run dev
   ```

## Technologies Used

- React
- Vite
- JSON Server (for mock API)
- CSS for styling

## Project Structure

- `src/components/` - React components
- `db.json` - Mock database for goals

