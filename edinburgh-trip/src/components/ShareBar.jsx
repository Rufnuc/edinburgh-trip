import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

const ShareBar = () => {
  const { tripId } = useTrip();
  const [showJoin, setShowJoin] = useState(false);
  const [joinId, setJoinId] = useState('');

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?trip=${tripId}`;
    navigator.clipboard.writeText(url);
    alert('Trip link copied! Share with friends.');
  };

  const joinTrip = () => {
    if (!joinId.trim()) return;
    window.location.href = `${window.location.origin}${window.location.pathname}?trip=${joinId.trim()}`;
  };

  return (
    <div className="share-bar">
      <div>
        <button onClick={copyLink} className="share-btn">📋 Copy trip link</button>
        <button onClick={() => setShowJoin(!showJoin)} className="join-btn">🔗 Join a trip</button>
      </div>
      <div>
        <span className="trip-id">{tripId}</span>
      </div>
      {showJoin && (
        <div className="join-prompt">
          <input type="text" placeholder="Enter trip ID" value={joinId} onChange={(e) => setJoinId(e.target.value)} />
          <button onClick={joinTrip} className="btn-secondary">Join</button>
          <button onClick={() => setShowJoin(false)} className="btn-secondary">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ShareBar;