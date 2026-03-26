import React from 'react';

const TravelInfo = () => {
  return (
    <div className="travel-card">
      <div className="travel-row">
        <div className="travel-item">
          <div className="travel-label">Depart Middlesbrough</div>
          <div className="travel-value">~7:00 AM</div>
        </div>
        <div className="travel-item">
          <div className="travel-label">Arrive Edinburgh Park</div>
          <div className="travel-value">~9:30 AM</div>
        </div>
        <div className="travel-item">
          <div className="travel-label">Return drive</div>
          <div className="travel-value">after 6:30 PM</div>
        </div>
      </div>
      <div className="public-tip">
        🅿️ <strong>Park at Edinburgh Park</strong> — tram stop "Edinburgh Park Station".<br />
        🎫 Buy an <strong>all‑day DayTicket</strong> (£4.80 adult) for unlimited tram/bus.<br />
        🚊 Tram to city centre: ~20 min, get off at <strong>Princes Street</strong>.
      </div>
    </div>
  );
};

export default TravelInfo;