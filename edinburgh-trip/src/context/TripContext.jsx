import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSearchParams } from 'react-router-dom';

const TripContext = createContext();

export const useTrip = () => useContext(TripContext);

const DEFAULT_TRIP_DATA = {
  route: 'museum',
  doneMap: {},
  customStops: [],
  packItems: [
    { id: 'wp_jacket', label: 'Waterproof jacket', checked: false },
    { id: 'layers', label: 'Warm layers / jumper', checked: false },
    { id: 'shoes', label: 'Comfortable walking shoes', checked: false },
    { id: 'scarf', label: 'Scarf & gloves', checked: false },
    { id: 'cash_card', label: 'Cash + bank card', checked: false },
    { id: 'phone', label: 'Fully charged phone', checked: false },
    { id: 'snacks', label: 'Snacks & water', checked: false },
    { id: 'ticket', label: 'Parking / DayTicket reminder', checked: false }
  ],
  notes: ''
};

export const TripProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tripId, setTripId] = useState(null);
  const [tripData, setTripData] = useState(DEFAULT_TRIP_DATA);
  const [loading, setLoading] = useState(true);

  const generateTripId = () => Math.random().toString(36).substring(2, 10);

  useEffect(() => {
    let unsub = null;
    const currentTripId = searchParams.get('trip') || generateTripId();

    const tripDocRef = doc(db, 'trips', currentTripId);
    unsub = onSnapshot(tripDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setTripData(docSnap.data());
      } else {
        // New trip: create document with default data
        setDoc(tripDocRef, DEFAULT_TRIP_DATA).then(() => {
          setTripData(DEFAULT_TRIP_DATA);
        });
      }
      setTripId(currentTripId);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    // Update URL if needed
    if (!searchParams.get('trip')) {
      setSearchParams({ trip: currentTripId });
    }

    return () => unsub && unsub();
  }, [searchParams, setSearchParams]);

  const updateTrip = (updates) => {
    if (!tripId) return;
    const tripDocRef = doc(db, 'trips', tripId);
    updateDoc(tripDocRef, updates).catch(console.error);
  };

  const setRoute = (route) => updateTrip({ route });
  const toggleDone = (stopId) => {
    const newDoneMap = { ...tripData.doneMap, [stopId]: !tripData.doneMap[stopId] };
    updateTrip({ doneMap: newDoneMap });
  };
  const addCustomStop = (stop) => {
    const newCustomStops = [...tripData.customStops, stop];
    updateTrip({ customStops: newCustomStops });
  };
  const deleteCustomStop = (stopId) => {
    const newCustomStops = tripData.customStops.filter(s => s.id !== stopId);
    updateTrip({ customStops: newCustomStops });
    // Also remove from doneMap if present
    const newDoneMap = { ...tripData.doneMap };
    delete newDoneMap[stopId];
    updateTrip({ doneMap: newDoneMap, customStops: newCustomStops });
  };
  const updatePackItems = (items) => updateTrip({ packItems: items });
  const updateNotes = (notes) => updateTrip({ notes });

  return (
    <TripContext.Provider value={{
      tripId,
      tripData,
      loading,
      setRoute,
      toggleDone,
      addCustomStop,
      deleteCustomStop,
      updatePackItems,
      updateNotes
    }}>
      {children}
    </TripContext.Provider>
  );
};