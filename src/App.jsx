import { useState } from 'react';
import './App.css';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm'; // Optional, if you use a form to add goals
import DepositForm from './components/DepositForm';

// ✅ Your deployed API URL
const API_BASE_URL = 'https://smart-goal-project.onrender.com/goals';

function App() {
  const [view, setView] = useState('list');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Optional: could be used to pre-fill form if editing
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setView('edit'); // Only needed if you have a GoalForm for editing
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${goalId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1); // Trigger re-fetch
      } else {
        console.error('Failed to delete goal');
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleDeposit = async (goalId, amount) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${goalId}`);
      const goal = await res.json();

      const updatedGoal = {
        ...goal,
        savedAmount: goal.savedAmount + amount,
      };

      const updateRes = await fetch(`${API_BASE_URL}/${goalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal),
      });

      if (updateRes.ok) {
        setRefreshTrigger((prev) => prev + 1);
        setView('list');
      } else {
        console.error('Failed to update goal');
      }
    } catch (error) {
      console.error('Error during deposit:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Smart Goal Tracker</h1>
        <nav>
          <button onClick={() => setView('list')}>View Goals</button>
          <button onClick={() => setView('deposit')}>Deposit</button>
        </nav>
      </header>

      <main className="app-content">
        {view === 'list' && (
          <GoalList
            key={refreshTrigger}
            onEditGoal={handleEditGoal}
            onDeleteGoal={handleDeleteGoal}
            apiBaseUrl={API_BASE_URL}
          />
        )}

        {view === 'deposit' && (
          <DepositForm
            key={refreshTrigger}
            onDeposit={handleDeposit}
            onCancel={() => setView('list')}
            apiBaseUrl={API_BASE_URL}
          />
        )}

        {view === 'edit' && (
          <GoalForm
            goal={selectedGoal}
            onCancel={() => {
              setView('list');
              setSelectedGoal(null);
            }}
            onSaved={() => {
              setRefreshTrigger((prev) => prev + 1);
              setView('list');
              setSelectedGoal(null);
            }}
            apiBaseUrl={API_BASE_URL}
          />
        )}
      </main>
    </div>
  );
}

export default App;
