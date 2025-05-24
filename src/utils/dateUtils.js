import { isSameDay } from 'date-fns';

export const getEventsForDay = (events, selectedDate) => {
  return events
    .filter((event) => {
      try {
        const [day, month, year] = event.date.split('/').map(Number);
        const eventDate = new Date(year, month - 1, day);
        return isSameDay(eventDate, selectedDate);
      } catch (error) {
        return false;
      }
    })
    .map((event) => ({
      title: event.title,
      time: event.startTime,
      color: event.color,
    }));
};