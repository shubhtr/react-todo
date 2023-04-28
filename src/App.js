import React from "react";
import Home from './components/Home';


const data = [
  { id: "t0", name: "Email team for updates" },
  { id: "t1", name: "Send out meeting request" },
  { id: "t2", name: "Book conference room" },
];

function App() {
  return (
    <Home tasks={data} />
  )
};

export default App;
