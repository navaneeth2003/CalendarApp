import { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, addMonths, subMonths, isSameMonth } from 'date-fns';

export default function MiniCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <button onClick={handlePrevMonth} className="text-gray-600 text-xs md:text-sm">{'<'}</button>
        <span className="text-xs md:text-sm font-semibold text-gray-800">{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={handleNextMonth} className="text-gray-600 text-xs md:text-sm">{'>'}</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`p-1 rounded-full text-xs ${
              isSameDay(day, today)
                ? 'bg-blue-500 text-white'
                : isSameMonth(day, currentDate)
                ? 'text-gray-900'
                : 'text-gray-400'
            }`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}