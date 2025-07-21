import { useState, useEffect } from 'react';

function GoalForm({ goal, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
    savedAmount: 0
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name || '',
        targetAmount: goal.targetAmount || '',
        savedAmount: goal.savedAmount || 0,
        category: goal.category || '',
        deadline: goal.deadline ? goal.deadline.split('T')[0] : ''
      });
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'targetAmount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.targetAmount || !formData.category || !formData.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    const goalData = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: goal ? goal.savedAmount : 0,
      createdAt: goal ? goal.createdAt : new Date().toISOString().split('T')[0]
    };

    onSave(goalData);
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2>{goal ? 'Edit Goal' : 'Add New Goal'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Goal Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="targetAmount">Target Amount ($):</label>
        <input
          type="number"
          id="targetAmount"
          name="targetAmount"
          min="1"
          step="0.01"
          value={formData.targetAmount}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Emergency">Emergency</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Retirement">Retirement</option>
          <option value="Home">Home</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">{goal ? 'Update Goal' : 'Add Goal'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default GoalForm;