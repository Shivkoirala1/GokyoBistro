// Hardcoded floor plan. x/y are percentage positions (0-100) for rendering
// the blueprint on the frontend. Edit this array to match the real café
// layout - no DB needed since it rarely changes.
const TABLES = [
  { tableNumber: 1, x: 10, y: 15 },
  { tableNumber: 2, x: 35, y: 15 },
  { tableNumber: 3, x: 60, y: 15 },
  { tableNumber: 4, x: 85, y: 15 },
  { tableNumber: 5, x: 10, y: 50 },
  { tableNumber: 6, x: 35, y: 50 },
  { tableNumber: 7, x: 60, y: 50 },
  { tableNumber: 8, x: 85, y: 50 },
  { tableNumber: 9, x: 22, y: 85 },
  { tableNumber: 10, x: 72, y: 85 },
];

export default TABLES;
