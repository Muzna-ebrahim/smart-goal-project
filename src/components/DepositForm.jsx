import { useState, useEffect } from 'react';


function DepositForm({ onDeposit, onCancel }) {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    goalId: '',
    amount: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('https://smart-goal-project.onrender.com');
        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }
        const data = await response.json();
        setGoals(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching goals:', error);
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? value : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.goalId || !formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please select a goal and enter a valid amount');
      return;
    }

    onDeposit({
      goalId: parseInt(formData.goalId),
      amount: parseFloat(formData.amount)
    });
  };

  if (isLoading) return <div>Loading goals...</div>;

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
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.savedAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)})
            </option>
          ))}
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