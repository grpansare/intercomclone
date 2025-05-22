// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Inbox from './pages/Inbox';
import Contacts from './pages/Contacts';

function App() {
  return (
    <Router>
      {/* <Sidebar /> */}
      {/* <Topbar /> */}
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
}

export default App;
