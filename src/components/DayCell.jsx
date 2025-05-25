import { format, isSameMonth, isSameDay } from 'date-fns';

export default function DayCell({ day, currentDate, onClick, events, selectedDate, selectedColors }) {
  const isCurrentMonth = isSameMonth(day, currentDate);
  const dayNumber = format(day, 'd');
  const isToday = isSameDay(day, new Date());
  const isSelected = selectedDate && isSameDay(day, selectedDate);
  const isMay5 = dayNumber === '5' && day.getMonth() === 4 && day.getFullYear() === 2025;

  const filteredEvents = events.filter((event) => selectedColors.includes(event.color));
  const displayedEvents = filteredEvents.slice(0, 1);
  const remainingEvents = filteredEvents.length > 1 ? filteredEvents.length - 1 : 0;

  return (
    <div
      onClick={onClick}
      className={`p-1 md:p-2 rounded-3xl transition-all duration-200 cursor-pointer border flex flex-col items-start justify-start md:aspect-square
        ${isToday ? 'border-3 border-blue-400' : ''}
        ${isSelected ? 'border-2 border-pink-500' : ''}
        ${isMay5 ? 'border-2 border-teal-400' : !isToday && !isSelected ? 'border-gray-200' : ''}
        ${isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-400'}
        hover:bg-blue-50 hover:shadow-md relative shadow-sm min-h-[60px]`}
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
    </div>
  );
}