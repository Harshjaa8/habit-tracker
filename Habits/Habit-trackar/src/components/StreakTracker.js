import React, { useMemo } from 'react';

const StreakTracker = ({ completed }) => {
  const streak = useMemo(() => {
    let count = 0;
    for (const day in completed) {
      if (completed[day]) count++;
    }
    return count;
  }, [completed]);

  return <div>🔥 Current streak: {streak} days</div>;
};

export default StreakTracker;
