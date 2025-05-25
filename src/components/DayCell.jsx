import { useState, useEffect } from 'react';
import { format, isSameMonth, isSameDay, startOfDay } from 'date-fns';

export default function DayCell({ day, currentDate, onClick, events, selectedDate, selectedColors, onAddEvent }) {
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(null);

  const isCurrentMonth = isSameMonth(day, currentDate);
  const dayNumber = format(day, 'd');
  const today = startOfDay(new Date());
  const normalizedDay = startOfDay(day);
  const isToday = isSameDay(normalizedDay, today);
  const isSelected = selectedDate && isSameDay(day, selectedDate);

  const filteredEvents = events.filter((event) => selectedColors.includes(event.color));
  const displayedEvents = filteredEvents.slice(0, 2);
  const remainingEvents = filteredEvents.length > 2 ? filteredEvents.length - 2 : 0;

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowPopup(true);
    }, 300);
    setTimer(timeout);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setShowPopup(false);
  };

  let borderClass = 'border border-gray-100';
  if (isToday) {
    borderClass = 'border-2 border-blue-400';
  } else if (isSelected) {
    borderClass = 'border-2 border-pink-500';
  }

  const borderStyle = isToday ? { border: '2px solidrgb(73, 139, 247)' } : {};

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`p-1 md:p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${borderClass} flex flex-col items-start justify-start md:aspect-square
        ${isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-400'}
        hover:bg-blue-50 hover:shadow-md relative shadow-sm min-h-[50px]`}
      style={borderStyle}
    >
      <div
        className={`text-xs md:text-base font-medium w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full ${
          isToday ? 'bg-blue-400 text-white' : ''
        }`}
      >
        {dayNumber}
      </div>
      <div className="flex-1"></div>
      <div className="w-full space-y-0.5 md:space-y-1 overflow-hidden">
        {displayedEvents.map((event, index) => (
          <div
            key={index}
            className="text-[10px] md:text-xs text-gray-800 px-1 md:px-2 py-0.5 rounded-full truncate shadow-sm"
            style={{
              backgroundColor: `#${event.color}30`,
              borderLeft: `2px solid #${event.color}`,
            }}
            title={event.title}
          >
            {event.title}
          </div>
        ))}
        {remainingEvents > 0 && (
          <div className="text-[10px] md:text-xs italic text-gray-500">
            +{remainingEvents} events
          </div>
        )}
      </div>
      {showPopup && (
        <div className="absolute top-0 left-0 mt-12 bg-white p-3 rounded-lg shadow-lg z-10 w-64 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            {format(day, 'dd/MM/yyyy')}
          </h3>
          {filteredEvents.length > 0 ? (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-2 rounded-lg shadow-sm"
                  style={{ backgroundColor: `#${event.color}20`, borderLeft: `4px solid #${event.color}` }}
                >
                  <p className="text-xs font-medium text-gray-800">{event.title}</p>
                  <p className="text-xs text-gray-600">{event.startTime}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-xs">No events for this day.</p>
          )}
          <button
            onClick={() => onAddEvent(day)}
            className="mt-2 bg-pink-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-pink-600 transition"
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
}