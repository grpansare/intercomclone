// src/components/Topbar.jsx
export default function Topbar() {
  return (
    <div className="h-16 bg-white shadow-md pl-64 flex items-center px-4 justify-between">
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-1 rounded-md"
      />
      <div className="flex gap-4">
        <span>Notifications</span>
        <span>User</span>
      </div>
    </div>
  );
}
