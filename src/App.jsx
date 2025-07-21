import { useState } from 'react'
import './App.css'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import DepositForm from './components/DepositForm'
import { API_URL } from './config'

function App() {
  const [view, setView] = useState('list') // 'list', 'add', 'edit', 'deposit'
  const [currentGoal, setCurrentGoal] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Handle adding a new goal
  const handleAddGoal = async (goalData) => {
    try {
      const response = await fetch(`${API_URL}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      })

      if (!response.ok) {
        throw new Error('Failed to add goal')
      }

      setRefreshTrigger(prev => prev + 1)
      setView('list')
    } catch (error) {
      console.error('Error adding goal:', error)
      alert('Failed to add goal. Please try again.')
    }
  }

  // Handle updating an existing goal
  const handleUpdateGoal = async (goalData) => {
    try {
      const response = await fetch(`${API_URL}/goals/${currentGoal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...goalData,
          id: currentGoal.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update goal')
      }

      setRefreshTrigger(prev => prev + 1)
      setCurrentGoal(null)
      setView('list')
    } catch (error) {
      console.error('Error updating goal:', error)
      alert('Failed to update goal. Please try again.')
    }
  }

  // Handle deleting a goal
  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/goals/${goalId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete goal')
      }

      setRefreshTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error deleting goal:', error)
      alert('Failed to delete goal. Please try again.')
    }
  }

  // Handle making a deposit
  const handleDeposit = async ({ goalId, amount }) => {
    try {
      // First, get the current goal data
      const goalResponse = await fetch(`${API_URL}/goals/${goalId}`)
      if (!goalResponse.ok) {
        throw new Error('Failed to fetch goal')
      }
      const goal = await goalResponse.json()

      // Update the saved amount
      const updatedAmount = goal.savedAmount + amount
      const response = await fetch(`${API_URL}/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savedAmount: updatedAmount,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to make deposit')
      }

      setRefreshTrigger(prev => prev + 1)
      setView('list')
      alert(`Successfully deposited $${amount.toFixed(2)} to ${goal.name}`)
    } catch (error) {
      console.error('Error making deposit:', error)
      alert('Failed to make deposit. Please try again.')
    }
  }

  // Handle editing a goal
  const handleEditGoal = (goal) => {
    setCurrentGoal(goal)
    setView('edit')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Financial Goal Tracker</h1>
        <div className="nav-buttons">
          <button onClick={() => setView('list')}>Dashboard</button>
          <button onClick={() => { setCurrentGoal(null); setView('add'); }}>Add New Goal</button>
          <button onClick={() => setView('deposit')}>Make Deposit</button>
        </div>
      </header>

      <main className="app-content">
        {view === 'list' && (
          <GoalList 
            key={refreshTrigger}
            onEditGoal={handleEditGoal} 
            onDeleteGoal={handleDeleteGoal} 
          />
        
        )}

        {view === 'add' && (
          <GoalForm 
            onSave={handleAddGoal} 
            onCancel={() => setView('list')} 
          />
        )}

        {view === 'edit' && currentGoal && (
          <GoalForm 
            goal={currentGoal} 
            onSave={handleUpdateGoal} 
            onCancel={() => { setCurrentGoal(null); setView('list'); }} 
          />
        )}

        {view === 'deposit' && (
          <DepositForm 
            key={refreshTrigger}
            onDeposit={handleDeposit} 
            onCancel={() => setView('list')} 
          />
        )}
      </main>
    </div>
  )
}

export default App
