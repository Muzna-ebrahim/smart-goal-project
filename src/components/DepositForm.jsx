import { useState, useEffect } from 'react';

function DepositForm({ onDeposit, onCancel, apiBaseUrl }) {
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(apiBaseUrl);
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        console.error('Failed to fetch goals:', err);
      }
    };

    fetchGoals();
  }, [apiBaseUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoalId || !amount) return;
    onDeposit(Number(selectedGoalId), parseFloat(amount));
    setAmount('');
  };

  return (
    <div className="deposit-form">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Goal:
          <select
            value={selectedGoalId}
            onChange={(e) => setSelectedGoalId(e.target.value)}
            required
          >
            <option value="">-- Choose a goal --</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit">Deposit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DepositForm;
