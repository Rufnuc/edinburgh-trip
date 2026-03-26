import React from 'react';
import { useTrip } from '../context/TripContext';

const Notes = () => {
  const { tripData, updateNotes } = useTrip();

  return (
    <textarea
      className="notes-area"
      rows="3"
      placeholder="Add meeting points, pub recommendations, or anything the group should know..."
      value={tripData.notes}
      onChange={(e) => updateNotes(e.target.value)}
    />
  );
};

export default Notes;