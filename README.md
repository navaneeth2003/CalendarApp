# 📅 Calendar App

A modern, responsive calendar application built with React and Vite, designed to help users manage their events and schedules efficiently. It offers a smooth, intuitive interface for both mobile and desktop users, with a strong focus on usability and clean design.

---

## ✨ Key Highlights

* **User-Centric Design**: Easily view, add, edit, and delete events through a user-friendly modal.
* **Responsive Interface**: Seamlessly works across all screen sizes—from mobile phones to desktops.
* **Real-Time Relevance**: Automatically defaults to today’s date, ensuring users always see the most current information.
* **Event Sorting**: Color-coded events help keep things organized and visually clear.
* **Mini Calendar Navigation**: Allows quick month-to-month navigation using a compact secondary calendar.
* **Day View**: A scrollable view shows events for the selected day.

---

## ⚙️ Features Overview

1. Add / Edit / Delete Events
2. Color Filters to sort events visually
3. Profile Display for a personalized experience
4. Error Boundaries and fallback data handling
5. Smooth transitions and modern UI styling

---

## 🛠 Tech Stack

* **Frontend**: React (v19.1.0), React DOM
* **Build Tool**: Vite (v6.3.5)
* **Styling**: Tailwind CSS (v3.4.17)
* **Date Utilities**: date-fns (v4.1.0)
* **Deployment**: GitHub Pages (via `gh-pages`)
* **Linting**: ESLint with React plugins

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* Git

### Clone & Install

```bash
git clone https://github.com/navaneeth2003/CalendarApp.git  
cd CalendarApp  
npm install
```

### Add Assets

Place your profile picture at:

```
public/assets/pic.png
```

Ensure event data exists at:

```
public/data/events.json
```

**Example:**

```json
[
  {
    "date": "25/05/2025",
    "startTime": "10:00 am",
    "title": "Team Meeting",
    "color": "3B82F6"
  },
  {
    "date": "05/05/2025",
    "startTime": "02:30 pm",
    "title": "Doctor Appointment",
    "color": "14B8A6"
  }
]
```

---

## 📦 Running the App

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build  
npm run preview
```

---

## 🌐 Deployment

This app is deployed to GitHub Pages at:
**[https://navaneeth2003.github.io/CalendarApp/](https://navaneeth2003.github.io/CalendarApp/)**

### Deployment Steps

1. Update `package.json`:

```json
"homepage": "https://navaneeth2003.github.io/CalendarApp"
```

2. Update `vite.config.js`:

```js
base: '/CalendarApp/',
```

3. Deploy:

```bash
npm run deploy
```

4. GitHub Pages Settings:
   Go to your repo → **Settings** → **Pages**
   Set the source to the **`gh-pages` branch**

---

## 🧭 Usage Guide

* **Navigate Dates**: Use the calendar header or mini-calendar
* **View Events**: Click any day to see its scheduled events
* **Add/Edit/Delete**: Use the `+` button or edit icons in the event list
* **Color Filter**: Toggle event visibility by color
* **Mobile Layout**: Optimized single-column view with scrollable events

---

## 📁 Project Structure

```
calendar-app/
├── public/
│   ├── assets/
│   │   └── pic.png
│   └── data/
│       └── events.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CalendarGrid.jsx
│   │   ├── CalendarHeader.jsx
│   │   ├── DayCell.jsx
│   │   ├── EventModal.jsx
│   │   ├── EventsForDay.jsx
│   │   ├── MiniCalendar.jsx
│   │   └── UserProfile.jsx
│   ├── utils/
│   │   └── dateUtils.js
│   └── App.jsx
├── vite.config.js
├── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch:

```bash
git checkout -b feature/your-feature
```

3. Commit your changes:

```bash
git commit -m "Add your feature"
```

4. Push to the branch:

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 🪪 License

This project is open-sourced.

---
