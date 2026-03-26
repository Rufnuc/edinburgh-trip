import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

const PackList = () => {
  const { tripData, updatePackItems } = useTrip();
  const [newItem, setNewItem] = useState('');

  const toggleItem = (index) => {
    const updated = [...tripData.packItems];
    updated[index].checked = !updated[index].checked;
    updatePackItems(updated);
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    const newId = 'pack_' + Date.now();
    const updated = [...tripData.packItems, { id: newId, label: newItem.trim(), checked: false }];
    updatePackItems(updated);
    setNewItem('');
  };

  return (
    <div className="pack-wrapper">
      <div className="pack-grid">
        {tripData.packItems.map((item, idx) => (
          <div key={item.id} className={`pack-item ${item.checked ? 'checked' : ''}`} onClick={() => toggleItem(idx)}>
            <span className="pack-check">{item.checked ? '✓' : '○'}</span> {item.label}
          </div>
        ))}
      </div>
      <div className="add-pack">
        <input type="text" placeholder="Add custom item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        <button onClick={addItem} className="btn-secondary">+ Add</button>
      </div>
    </div>
  );
};

export default PackList;