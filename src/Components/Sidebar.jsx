// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 fixed">
      <h2 className="text-2xl font-bold mb-8">Intercom Clone</h2>
      <nav className="space-y-4">
        <Link to="/" className="block hover:text-blue-400">Inbox</Link>
        <Link to="/contacts" className="block hover:text-blue-400">Contacts</Link>
      </nav>
    </div>
  );
}
