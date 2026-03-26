import React from 'react';
import { useTrip } from '../context/TripContext';

const RouteToggle = () => {
  const { tripData, setRoute } = useTrip();

  return (
    <div className="route-switch">
      <div className="toggle-group">
        <button
          className={`toggle-btn ${tripData.route === 'museum' ? 'active' : ''}`}
          onClick={() => setRoute('museum')}
        >
          🏛️ Indoor · National Museum
        </button>
        <button
          className={`toggle-btn ${tripData.route === 'hike' ? 'active' : ''}`}
          onClick={() => setRoute('hike')}
        >
          ⛰️ Outdoor · Arthur's Seat
        </button>
      </div>
    </div>
  );
};

export default RouteToggle;