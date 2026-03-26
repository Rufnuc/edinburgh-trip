import React, { useState, useEffect } from 'react';
import { useTrip } from './context/TripContext';
import TravelInfo from './components/TravelInfo';
import ProgressBar from './components/ProgressBar';
import RouteToggle from './components/RouteToggle';
import Timeline from './components/Timeline';
import AddStopForm from './components/AddStopForm';
import PackList from './components/PackList';
import Notes from './components/Notes';
import ShareBar from './components/ShareBar';
import { getFilteredStops } from './data/itinerary';
import './App.css';

function App() {
  const { tripData, loading } = useTrip();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getNextEvent = () => {
    const stops = getFilteredStops(tripData.route, tripData.customStops);
    const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    for (let stop of stops) {
      const [hour, minute] = stop.time.split(':').map(Number);
      const stopMinutes = hour * 60 + minute;
      if (stopMinutes > nowMinutes) {
        return stop;
      }
    }
    return null;
  };

  const nextEvent = getNextEvent();
  const timeStr = currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (loading) {
    return <div className="loading">Loading trip...</div>;
  }

  return (
    <div className="App">
      <header className="hero">
        <h1>Edinburgh · shared trip</h1>
        <p>collaborative itinerary with friends</p>
        <div className="date-badge">🏴󠁧󠁢󠁳󠁣󠁴󠁿 saturday 28 march 2026</div>
      </header>

      <div className="info-bar">
        <div><span>⏱️ local</span><br /><span className="live-clock">{timeStr}</span></div>
        <div className="next-event-chip">
          ⏰ next up: <strong>{nextEvent ? nextEvent.title : '—'}</strong>
          {nextEvent && (() => {
            const [h,m] = nextEvent.time.split(':').map(Number);
            const target = h*60 + m;
            const now = currentTime.getHours()*60 + currentTime.getMinutes();
            const diff = target - now;
            if (diff > 0) return <span> ({diff < 60 ? `in ${diff} min` : `in ${Math.floor(diff/60)}h ${diff%60}m`})</span>;
            return null;
          })()}
        </div>
      </div>

      <div className="weather-card">
        <span>🌦️ Edinburgh forecast</span>
        <span>7°C · light showers possible</span>
        <span className="weather-tag">🧥 waterproof + layers</span>
      </div>

      <div className="container">
        <ShareBar />
        <TravelInfo />
        <ProgressBar />
        <RouteToggle />
        <div className="section-title"><span>🗺️ full itinerary</span></div>
        <Timeline />
        <AddStopForm />
        <div className="section-title"><span>🎒 pack & gear</span></div>
        <PackList />
        <div className="section-title"><span>📓 group notes</span></div>
        <Notes />
      </div>
      <footer>✓ tap any stop to mark done · edits sync live with all friends</footer>
    </div>
  );
}

export default App;