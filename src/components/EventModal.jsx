export default function EventModal({ isOpen, onClose, onSave, selectedDate, eventToEdit }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const dateTime = e.target.dateTime.value;
    const color = e.target.color.value;
    onSave({ title, date: dateTime, color });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg w-11/12 max-w-md">
        <h2 className="text-base md:text-lg font-semibold mb-3 text-gray-800">{eventToEdit ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            defaultValue={eventToEdit ? eventToEdit.title : ''}
            className="w-full p-2 border rounded-lg mb-3 text-gray-800 text-sm md:text-base"
            required
          />
          <input
            type="datetime-local"
            name="dateTime"
            defaultValue={
              eventToEdit
                ? new Date(eventToEdit.date.split('/').reverse().join('-') + 'T' + eventToEdit.startTime).toISOString().slice(0, 16)
                : selectedDate
                ? new Date(selectedDate).toISOString().slice(0, 16)
                : ''
            }
            className="w-full p-2 border rounded-lg mb-3 text-gray-800 text-sm md:text-base"
            required
          />
          <div className="mb-3">
            <label className="block text-xs md:text-sm font-medium text-gray-800 mb-2">Event Color</label>
            <div className="flex gap-3">
              {[
                { value: '3B82F6', label: 'Blue' },
                { value: '14B8A6', label: 'Teal' },
                { value: 'EC4899', label: 'Pink' },
                { value: 'F6BE23', label: 'Yellow' },
                { value: 'A855F7', label: 'Purple' },
              ].map((color) => (
                <label key={color.value} className="flex items-center">
                  <input
                    type="radio"
                    name="color"
                    value={color.value}
                    defaultChecked={eventToEdit ? eventToEdit.color === color.value : false}
                    className="sr-only"
                    required
                  />
                  <span
                    className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 cursor-pointer transition-all hover:shadow-md ${
                      eventToEdit && eventToEdit.color === color.value ? 'border-gray-800' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: `#${color.value}` }}
                    title={color.label}
                  ></span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded-xl w-full hover:bg-pink-600 transition text-sm md:text-base"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="mt-2 text-xs md:text-sm text-gray-500 w-full text-center"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}