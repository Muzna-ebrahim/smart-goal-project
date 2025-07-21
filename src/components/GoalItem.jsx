import { useState } from 'react';

function GoalItem({ goal, onEdit, onDelete }) {
  const { name, targetAmount, savedAmount, category, deadline } = goal;
  
  // Calculate progress percentage
  const progress = Math.min((savedAmount / targetAmount) * 100, 100);
  const remaining = targetAmount - savedAmount;
  
  // Calculate days left
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  
  // Determine status
  let status = "On Track";
  let statusClass = "status-normal";
  
  if (savedAmount >= targetAmount) {
    status = "Completed";
    statusClass = "status-completed";
  } else if (daysLeft < 0) {
    status = "Overdue";
    statusClass = "status-overdue";
  } else if (daysLeft <= 30) {
    status = "Warning";
    statusClass = "status-warning";
  }

  return (
    <div className="goal-item">
      <div className="goal-header">
        <h3>{name}</h3>
        <span className={`goal-status ${statusClass}`}>{status}</span>
      </div>
      
      <div className="goal-details">
        <p>Category: {category}</p>
        <p>Target: ${targetAmount.toFixed(2)}</p>
        <p>Saved: ${savedAmount.toFixed(2)}</p>
        <p>Remaining: ${remaining.toFixed(2)}</p>
        <p>Deadline: {new Date(deadline).toLocaleDateString()}</p>
        {daysLeft > 0 ? (
          <p>Time left: {daysLeft} days</p>
        ) : (
          <p>Deadline passed</p>
        )}
      </div>
      
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">{progress.toFixed(0)}%</span>
      </div>
      
      <div className="goal-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default GoalItem;