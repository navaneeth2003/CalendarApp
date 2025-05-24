import { format } from 'date-fns';

export default function CalendarHeader({ currentDate, setCurrentDate, onAddEvent }) {
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  const handleToday = () => setCurrentDate(new Date(2025, 4, 25));

  return (
    <div className="flex flex-wrap items-center justify-between p-2 md:p-3 bg-white rounded-xl shadow-sm w-full gap-2 md:gap-4">
      <button
        onClick={handleToday}
        className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-1 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-600 transition"
      >
        Today
      </button>
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-base md:text-lg font-normal text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {format(currentDate, 'MMMM yyyy')}
        </span>
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      <button
        onClick={onAddEvent}
        className="bg-pink-500 text-white px-3 py-1 md:px-4 md:py-1 rounded-lg flex items-center space-x-1 hover:bg-pink-600 transition text-xs md:text-sm"
      >
        <span>+</span>
        <span>Add Event</span>
      </button>
    </div>
  );
}