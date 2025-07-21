import { useState, useEffect } from 'react';

// Receive apiBaseUrl as a prop
function DepositForm({ onDeposit, onCancel, apiBaseUrl }) {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    goalId: '',
    amount: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error
        // CORRECTED FETCH URL: Use apiBaseUrl
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch goals: ${response.statusText}`);
        }
        const data = await response.json();
        setGoals(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching goals in DepositForm:', error);
        setError(error.message); // Set error message
        setIsLoading(false);
      }
    };

    if (apiBaseUrl) { // Only fetch if apiBaseUrl is provided
      fetchGoals();
    }
  }, [apiBaseUrl]); // Rerun effect if apiBaseUrl changes

  if (isLoading) return <div>Loading goals for deposit...</div>;
  if (error) return <div>Error loading goals: {error}</div>; // Display error

  return (
    <form className="deposit-form" onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>

      <div className="form-group">
        <label htmlFor="goalId">Select Goal:</label>
        <select
          id="goalId"
          name="goalId"
          value={formData.goalId}
          onChange={handleChange}
          required
        >
          <option value="">Select a goal</option>
          {goals.length === 0 ? (
            <option disabled>No goals available. Add one first.</option>
          ) : (
            goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (${goal.savedAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)})
              </option>
            ))
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount ($):</label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="0.01"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">Make Deposit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default DepositForm;