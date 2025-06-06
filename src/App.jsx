import { useState, useEffect } from 'react';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import EventsForDay from './components/EventsForDay';
import MiniCalendar from './components/MiniCalendar';
import UserProfile from './components/UserProfile';
import { getEventsForDay } from './utils/dateUtils';
import { isSameDay } from 'date-fns';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen w-full font-sans bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 flex justify-center items-center">
        <p className="text-red-500">Something went wrong. Please check the console for details.</p>
      </div>
    );
  }

  return children;
}

function App() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColors, setSelectedColors] = useState(['3B82F6', '14B8A6', 'EC4899', 'F6BE23', 'A855F7']);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    setLoading(true);
    const basePath = import.meta.env.BASE_URL || '/';
    const fetchUrl = `${basePath}data/events.json`.replace(/^\/+/, '/');
    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        return response.json();
      })
      .then((data) => {
        const savedEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
        const allEvents = [...data, ...savedEvents].filter(
          (event, index, self) =>
            index === self.findIndex((e) => e.title === event.title && e.date === event.date && e.startTime === event.startTime)
        );
        setEvents(allEvents);
        localStorage.setItem('calendarEvents', JSON.stringify(allEvents));
        setLoading(false);
      })
      .catch((error) => {
        const fallbackEvents = [
          {
            date: "25/05/2025",
            startTime: "10:00 am",
            title: "Team Meeting",
            color: "3B82F6"
          },
          {
            date: "05/05/2025",
            startTime: "02:30 pm",
            title: "Doctor Appointment",
            color: "14B8A6"
          }
        ];
        const savedEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
        const allEvents = [...fallbackEvents, ...savedEvents].filter(
          (event, index, self) =>
            index === self.findIndex((e) => e.title === event.title && e.date === event.date && e.startTime === event.startTime)
        );
        setEvents(allEvents);
        localStorage.setItem('calendarEvents', JSON.stringify(allEvents));
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleDayClick = (day) => {
    if (selectedDate && isSameDay(day, selectedDate)) {
      setSelectedDate(null); // Deselect if the same date is clicked again
    } else {
      setSelectedDate(day);
      setShowModal(true);
    }
  };

  const handleAddOrEditEvent = (newEvent) => {
    const formattedEvent = {
      startTime: new Date(newEvent.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
      date: new Date(newEvent.date).toLocaleDateString('en-GB'),
      title: newEvent.title,
      color: newEvent.color,
    };

    if (editingEvent) {
      setEvents(events.map((event) => (event === editingEvent ? formattedEvent : event)));
      setEditingEvent(null);
    } else {
      setEvents([...events, formattedEvent]);
    }
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter((event) => event !== eventToDelete));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleColorToggle = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSelectAllColors = () => {
    if (selectedColors.length === 5) {
      setSelectedColors([]);
    } else {
      setSelectedColors(['3B82F6', '14B8A6', 'EC4899', 'F6BE23', 'A855F7']);
    }
  };

  const eventsForSelectedDay = getEventsForDay(events, selectedDate || today);
  const isTodaySelected = selectedDate ? isSameDay(selectedDate, today) : true;

  if (loading) {
    return (
      <div className="min-h-screen w-full font-sans bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 flex justify-center items-center">
        <p className="text-gray-800">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full font-sans bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full font-sans bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 flex flex-col md:flex-row">
        <div className="w-full md:w-80 bg-white p-4 flex flex-col shadow-lg space-y-3 md:h-screen">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Calendar App
          </h1>
          <div className="p-2 border border-gray-200 rounded-lg">
            <MiniCalendar />
          </div>
          <div className="p-2 border border-gray-200 rounded-lg flex-1">
            <EventsForDay
              events={eventsForSelectedDay}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
              isToday={isTodaySelected}
            />
          </div>
          <div className="p-2 border border-gray-200 rounded-lg">
            <h2 className="text-sm md:text-base font-semibold text-gray-800 mb-2">Sort Events</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSelectAllColors}
                className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium border transition-all duration-200 ${
                  selectedColors.length === 5
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
                aria-label={selectedColors.length === 5 ? 'Deselect all colors' : 'Select all colors'}
              >
                {selectedColors.length === 5 ? 'Deselect All' : 'Select All'}
              </button>
              {['3B82F6', '14B8A6', 'EC4899', 'F6BE23', 'A855F7'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    selectedColors.includes(color)
                      ? 'border-gray-800'
                      : 'border-transparent opacity-50 hover:opacity-75'
                  }`}
                  style={{ backgroundColor: `#${color}` }}
                  aria-label={`Toggle ${color} events`}
                >
                  {selectedColors.includes(color) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <UserProfile />
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-auto h-[calc(100vh-16rem)] md:h-screen">
          <div className="max-w-full md:max-w-5xl mx-auto">
            <CalendarHeader
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              onAddEvent={() => {
                setEditingEvent(null);
                setShowModal(true);
              }}
            />
            <CalendarGrid
              currentDate={currentDate}
              onDayClick={handleDayClick}
              events={events}
              selectedDate={selectedDate}
              selectedColors={selectedColors}
              setCurrentDate={setCurrentDate}
            />
          </div>
          <EventModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingEvent(null);
            }}
            onSave={handleAddOrEditEvent}
            selectedDate={selectedDate || today}
            eventToEdit={editingEvent}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;