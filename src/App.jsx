// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inbox from './Pages/Inbox';



function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Inbox />} />

      </Routes>
    </Router>
  );
}

export default App;
