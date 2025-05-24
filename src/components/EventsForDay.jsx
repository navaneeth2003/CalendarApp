export default function EventsForDay({ events, onDelete, onEdit }) {
  return (
    <div className="mt-2">
      <h2 className="text-sm md:text-base font-semibold text-pink-500">EVENTS FOR THE DAY</h2>
      <div className="mt-2 space-y-2 max-h-36 md:max-h-40 overflow-y-auto">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-2 md:p-3 rounded-lg shadow-sm hover:bg-gray-50 transition"
              style={{ backgroundColor: `#${event.color}20`, borderLeft: `4px solid #${event.color}` }}
            >
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium text-gray-800">{event.title}</p>
                <p className="text-xs text-gray-600">{event.time}</p>
              </div>
              <div className="hidden group-hover:flex space-x-2">
                <button
                  onClick={() => onEdit(event)}
                  className="text-gray-600 hover:text-gray-800 transition"
                  aria-label="Edit event"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(event)}
                  className="text-red-500 hover:text-red-700 transition"
                  aria-label="Delete event"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-xs md:text-sm">No events for this day.</p>
        )}
      </div>
    </div>
  );
}