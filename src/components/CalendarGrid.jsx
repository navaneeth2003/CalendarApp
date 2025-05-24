import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import DayCell from './DayCell';

export default function CalendarGrid({ currentDate, onDayClick, events, selectedDate, selectedColors }) {
  try {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

    return (
      <div className="mt-3 w-full">
        <div className="grid grid-cols-7 gap-1 text-center text-xs md:text-sm font-medium text-gray-500">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
            <div key={d} className="py-1 md:py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <DayCell
              key={day}
              day={day}
              currentDate={currentDate}
              onClick={() => onDayClick(day)}
              events={events.filter((event) => {
                try {
                  const [eventDay, eventMonth, eventYear] = event.date.split('/').map(Number);
                  const eventDate = new Date(eventYear, eventMonth - 1, eventDay);
                  return (
                    eventDate.getDate() === day.getDate() &&
                    eventDate.getMonth() === day.getMonth() &&
                    eventDate.getFullYear() === day.getFullYear()
                  );
                } catch (error) {
                  return false;
                }
              })}
              selectedDate={selectedDate}
              selectedColors={selectedColors}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div className="text-red-500">Error rendering calendar grid. Check console for details.</div>;
  }
}