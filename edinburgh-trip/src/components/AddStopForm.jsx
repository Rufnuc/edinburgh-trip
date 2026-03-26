import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

const AddStopForm = () => {
  const { addCustomStop } = useTrip();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('14:45');
  const [desc, setDesc] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return alert('Please enter a title');
    if (!time) return alert('Please select a time');
    const newStop = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      title: title.trim(),
      time: time,
      desc: desc.trim() || 'personal stop',
      badge: '✨ custom',
      type: 'custom',
      isCustom: true
    };
    addCustomStop(newStop);
    setTitle('');
    setDesc('');
    setTime('14:45');
  };

  return (
    <div className="add-stop-form">
      <div className="form-row">
        <input type="text" placeholder="Title (e.g., 'Scottish National Gallery')" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div className="form-row">
        <input type="text" placeholder="Short note / address" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={handleSubmit} className="btn-primary">Add to timeline</button>
      </div>
    </div>
  );
};

export default AddStopForm;