export default function Sidebar() {
  return (
    <div className="h-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">📅 Calendar</h2>

      <nav className="flex flex-col gap-4 text-gray-700">
        <a href="#" className="hover:text-blue-500 transition">Dashboard</a>
        <a href="#" className="hover:text-blue-500 transition">Events</a>
        <a href="#" className="hover:text-blue-500 transition">Tasks</a>
        <a href="#" className="hover:text-blue-500 transition">Settings</a>
      </nav>

      <div className="mt-auto pt-6 border-t">
        <p className="text-sm text-gray-500">© 2025 Calendar App</p>
      </div>
    </div>
  );
}
