import { useState, useEffect } from 'react';

function GoalForm({ goal, onCancel, onSaved, apiBaseUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    savedAmount: '',
    category: '',
    deadline: '',
  });

  useEffect(() => {
    if (goal) {
      setFormData(goal);
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = goal ? 'PUT' : 'POST';
    const url = goal ? `${apiBaseUrl}/${goal.id}` : apiBaseUrl;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSaved();
      } else {
        alert('Failed to save goal');
      }
    } catch (err) {
      console.error('Error saving goal:', err);
    }
  };

  return (
    <div className="goal-form">
      <h2>{goal ? 'Edit Goal' : 'Add New Goal'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Target Amount:
          <input
            name="targetAmount"
            type="number"
            value={formData.targetAmount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Saved Amount:
          <input
            name="savedAmount"
            type="number"
            value={formData.savedAmount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <input name="category" value={formData.category} onChange={handleChange} required />
        </label>

        <label>
          Deadline:
          <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
        </label>

        <div className="form-actions">
          <button type="submit">{goal ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default GoalForm;
