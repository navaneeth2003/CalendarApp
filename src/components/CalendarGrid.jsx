import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isBefore, isAfter } from 'date-fns';
import DayCell from './DayCell';

export default function CalendarGrid({ currentDate, onDayClick, events, selectedDate, selectedColors, setCurrentDate }) {
  try {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

    const handleDayClick = (day) => {
      onDayClick(day);
      // If the clicked day is in the previous month, go to that month
      if (isBefore(day, monthStart)) {
        setCurrentDate(new Date(day.getFullYear(), day.getMonth()));
      }
      // If the clicked day is in the next month, go to that month
      else if (isAfter(day, monthEnd)) {
        setCurrentDate(new Date(day.getFullYear(), day.getMonth()));
      }
    };

    return (
      <div className="mt-2 md:mt-3 w-full">
        <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-[10px] md:text-sm font-medium text-gray-500">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
            <div key={d} className="py-0.5 md:py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[1px] md:gap-0.5">
          {days.map((day) => (
            <DayCell
              key={day}
              day={day}
              currentDate={currentDate}
              onClick={() => handleDayClick(day)}
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
              onAddEvent={onDayClick}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div className="text-red-500">Error rendering calendar grid. Check console for details.</div>;
  }
}