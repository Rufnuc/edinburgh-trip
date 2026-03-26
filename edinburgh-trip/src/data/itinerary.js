export const defaultStopsRaw = [
  { id: 'depart_mbro', time: '07:00', title: '🚗 Depart Middlesbrough', desc: 'Drive towards Edinburgh via A1/M8. Aim for Edinburgh Park.', badge: 'drive', type: 'travel', routeGroup: 'both' },
  { id: 'arrive_epark', time: '09:30', title: 'Arrive Edinburgh Park', desc: 'Park car. Follow signs for tram stop "Edinburgh Park Station".', badge: 'park & ride', type: 'travel', routeGroup: 'both' },
  { id: 'buy_ticket', time: '09:45', title: 'Buy all‑day DayTicket', desc: 'Ticket machine or via mobile app. Covers tram & bus for the whole day.', badge: 'public transport', type: 'info', routeGroup: 'both' },
  { id: 'tram_centre', time: '10:00', title: '🚊 Tram to city centre', desc: 'Tram to Princes Street (~20 min). Get off at "Princes Street" stop.', badge: 'tram ride', type: 'travel', routeGroup: 'both' },
  { id: 'arrive_centre', time: '10:20', title: 'Arrive Princes Street', desc: 'Start your Edinburgh exploration. Iconic views of the castle.', badge: 'city centre', type: 'sight', routeGroup: 'both' },
  { id: 'royalmile', time: '10:30', title: 'Royal Mile & Old Town', desc: 'Walk from Castlehill down to Holyrood. Explore closes, St Giles Cathedral (free).', badge: 'free walk', type: 'sight', routeGroup: 'both' },
  { id: 'lunch', time: '12:30', title: '🍽️ Lunch at Grassmarket', desc: 'Historic square with pubs, cafes, street food. Try local haggis or a cosy pub.', badge: '~£10–15', type: 'food', routeGroup: 'both' },
  { id: 'greyfriars', time: '13:45', title: 'Greyfriars Kirkyard & Bobby', desc: 'Famous cemetery, Greyfriars Bobby statue. Free, atmospheric.', badge: 'free', type: 'sight', routeGroup: 'both' },
  { id: 'museum', time: '14:15', title: '🏛️ National Museum of Scotland', desc: 'World‑class free museum: Scottish history, science, fashion. Rooftop terrace with castle views. Open until 5pm.', badge: 'free entry', type: 'museum', routeGroup: 'museum' },
  { id: 'gardens', time: '16:00', title: 'Princes Street Gardens', desc: 'Stroll through the gardens, best castle photo spot. Grab a coffee.', badge: 'free', type: 'park', routeGroup: 'museum' },
  { id: 'arthur', time: '14:15', title: '⛰️ Arthur’s Seat hike', desc: 'Ancient volcano, 30–45 min climb. Panoramic views of city and sea. Wear sturdy shoes.', badge: 'free hike', type: 'hike', routeGroup: 'hike' },
  { id: 'coffee_hike', time: '15:45', title: 'Recovery coffee & Holyrood', desc: 'Warm drink near the Parliament, then walk towards Princes Street.', badge: '~£4', type: 'food', routeGroup: 'hike' },
  { id: 'dinner', time: '17:00', title: 'Early dinner / bite', desc: 'Quick meal on Royal Mile, Cockburn Street, or near St Andrew Square.', badge: '~£10–15', type: 'food', routeGroup: 'both' },
  { id: 'headback_tram', time: '17:50', title: '⚠️ Tram back to Edinburgh Park', desc: 'Take tram from Princes Street / St Andrew Square. Allow 25 min travel. Last comfortable window.', badge: 'critical', type: 'warning', routeGroup: 'both' },
  { id: 'arrive_car', time: '18:20', title: 'Arrive Edinburgh Park → drive home', desc: 'Collect car. Drive back to Middlesbrough (approx 2.5–3h).', badge: 'return', type: 'travel', routeGroup: 'both' }
];

export const getFilteredStops = (route, customStops) => {
  const baseStops = defaultStopsRaw.filter(stop => {
    if (stop.routeGroup === 'both') return true;
    return stop.routeGroup === route;
  });
  return [...baseStops, ...customStops].sort((a,b) => a.time.localeCompare(b.time));
};