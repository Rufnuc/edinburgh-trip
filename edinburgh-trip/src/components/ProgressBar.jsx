import React, { useMemo } from 'react';
import { useTrip } from '../context/TripContext';
import { getFilteredStops } from '../data/itinerary';

const ProgressBar = () => {
  const { tripData } = useTrip();
  const stops = getFilteredStops(tripData.route, tripData.customStops);

  const completedCount = useMemo(() => {
    return stops.filter(stop => tripData.doneMap[stop.id]).length;
  }, [stops, tripData.doneMap]);

  const total = stops.length;
  const percent = total === 0 ? 0 : (completedCount / total) * 100;

  return (
    <div className="progress-block">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>📋 stops completed</span>
        <span>{completedCount} / {total}</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;