import { useState, useEffect } from 'react';
import GoalItem from './GoalItem';


function GoalList({ onEditGoal, onDeleteGoal }) {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:3000/goals');
        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }
        const data = await response.json();
        setGoals(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (isLoading) return <div>Loading goals...</div>;
  if (error) return <div>Error: {error}</div>;

  // Calculate totals for overview
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

  return (
    <div className="goal-list">
      <div className="overview">
        <h2>Overview</h2>
        <div className="stats">
          <div className="stat">
            <span>Total Goals:</span> {totalGoals}
          </div>
          <div className="stat">
            <span>Total Saved:</span> ${totalSaved.toFixed(2)}
          </div>
          <div className="stat">
            <span>Goals Completed:</span> {completedGoals}
          </div>
        </div>
      </div>
      
      <h2>Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add your first goal!</p>
      ) : (
        <div className="goals-container">
          {goals.map(goal => (
            <GoalItem 
              key={goal.id} 
              goal={goal} 
              onEdit={() => onEditGoal(goal)} 
              onDelete={() => onDeleteGoal(goal.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalList;