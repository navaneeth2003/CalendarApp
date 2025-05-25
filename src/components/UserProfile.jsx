export default function UserProfile() {
  return (
    <div className="bg-white p-2 md:p-3 rounded-lg shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-2 md:space-x-3">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden">
          <img
            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-gray-800 font-medium text-xs md:text-sm">Navaneeth</span>
      </div>
      <svg
        className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
      </svg>
    </div>
  );
}