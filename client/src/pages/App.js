import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="*" element={<div />} />
    </Routes>
  );
}

export default App;
