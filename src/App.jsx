// App.jsx
import { useState } from 'react'
import './App.css'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import DepositForm from './components/DepositForm'

// Define the base API URL for your goals resource
// CORRECTED: Use a relative path as both front-end and backend are on the same origin
const API_BASE_URL = '/goals'; // <--- CHANGE THIS LINE!

function App() {
  // ... rest of your App.jsx code ...
  return (
    <div className="app">
      {/* ... */}
      <main className="app-content">
        {view === 'list' && (
          <GoalList
            key={refreshTrigger}
            onEditGoal={handleEditGoal}
            onDeleteGoal={handleDeleteGoal}
            // Pass API_BASE_URL to GoalList
            apiBaseUrl={API_BASE_URL} // <--- Ensure this prop is passed
          />
        )}
        {/* ... */}
        {view === 'deposit' && (
          <DepositForm
            key={refreshTrigger}
            onDeposit={handleDeposit}
            onCancel={() => setView('list')}
            // Pass API_BASE_URL to DepositForm
            apiBaseUrl={API_BASE_URL} // <--- Ensure this prop is passed
          />
        )}
      </main>
    </div>
  )
}

export default App