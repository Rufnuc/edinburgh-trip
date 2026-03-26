import React from 'react';
import { useTrip } from '../context/TripContext';
import { getFilteredStops } from '../data/itinerary';

const Timeline = () => {
  const { tripData, toggleDone, deleteCustomStop } = useTrip();
  const stops = getFilteredStops(tripData.route, tripData.customStops);

  const getDotColor = (type) => {
    const colors = {
      travel: '#2c5f4a',
      food: '#c27e3a',
      sight: '#3a5f8a',
      museum: '#3a5f8a',
      warning: '#bc4742',
      hike: '#7b5e3b',
      default: '#6c8b6e'
    };
    return colors[type] || colors.default;
  };

  return (
    <div className="timeline">
      {stops.map(stop => {
        const isDone = tripData.doneMap[stop.id];
        return (
          <div key={stop.id} className="tl-item">
            <div className="tl-left">
              <div className="tl-dot" style={{ backgroundColor: getDotColor(stop.type), borderColor: getDotColor(stop.type) }}></div>
              <div className="tl-time">{stop.time.substring(0,5)}</div>
            </div>
            <div className={`tl-card ${isDone ? 'done-card' : ''}`} onClick={() => toggleDone(stop.id)}>
              <div className="tl-title">
                {stop.title}
                {!stop.isCustom && (
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(stop.title + ' Edinburgh')}`} target="_blank" rel="noopener noreferrer" className="map-link">📍</a>
                )}
              </div>
              <div className="tl-desc">{stop.desc}</div>
              <div className="tl-badge">{stop.badge}</div>
              {stop.isCustom && (
                <button className="delete-custom" onClick={(e) => { e.stopPropagation(); deleteCustomStop(stop.id); }}>✕</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;