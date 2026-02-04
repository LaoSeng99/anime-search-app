- [Anime Search App](#anime-search-app)
  - [📖 Project Description](#-project-description)
    - [Features:](#features)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation \& Local Development](#installation--local-development)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [💡 Assumptions \& Design Decisions](#-assumptions--design-decisions)
  - [⚠️ Known Issues \& Limitations](#️-known-issues--limitations)
  - [🎨 Credits](#-credits)
  - [⚖️ License \& Contributing](#️-license--contributing)

# Anime Search App

A modern anime discovery web application designed for a seamless user experience.

> Powered by the Jikan API (V4): The most popular open-source REST API for MyAnimeList. It provides high-quality, real-time access to a massive database of anime, manga, and characters without the need for authentication.

---

## 📖 Project Description

A high-fidelity Anime database explorer inspired by modern streaming platforms. This project focuses on delivering a premium UI/UX experience using Framer Motion for fluid state transitions and TanStack Query for robust data management. It serves as a professional showcase for integrating complex animations with real-time API data while maintaining high code quality.

### Features:

- **Trending & Top Charts:** Instantly explore current seasonal hits and all-time top-rated anime on the home page.
- **Deep Search & Discovery:** Advanced search functionality with type-safe filtering and real-time debouncing (300-500ms).
- **Rich Detail View:** Comprehensive information including synopses, staff credits, character lists, and episode guides.
- **Personal Library:** Curated "Favourites" with persistent storage for quick access to your top picks.
- **Simple Keyboard accessibility:**
  - Press **S** to instantly focus the search bar.
  - Press **Arrow Keys** for quick pagination.
  - Press **Ctrl + Arrow Keys** to switch between tabs (e.g., Overview, Staff, Episodes).
- **Mobile Responsive:** Optimized for Desktop, Tablet, and Mobile views ~~But not Ultra-wide (Thank you)~~

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js (v18 or higher recommended) installed.

### Installation & Local Development

1. **Clone the project**:
   ```bash
   git clone https://github.com/LaoSeng99/anime-search-app
   cd anime-search-app
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```
4. Access the app: Open http://localhost:5173 in your browser.

---

## 🛠️ Technologies Used

| Category             | Technology                                              |
| :------------------- | :------------------------------------------------------ |
| **Framework**        | React, Vite, TypeScript                                 |
| **State Management** | Zustand (Store / Global), TanStack Query (Server State) |
| **Styling**          | Tailwind CSS, Framer Motion (Animations)                |
| **Persistence**      | idb-keyval (IndexedDB), React Query Persist Client      |
| **Icons & Media**    | Lucide React, React Player                              |
| **Routing**          | React Router                                            |
| **Networking**       | Axios, use-debounce, React Intersection Observer        |
| **Deployment**       | Vercel                                                  |

## 💡 Assumptions & Design Decisions

- **Modern Styling with Tailwind CSS**: I chose **Tailwind CSS** for styling because its utility-first approach fits perfectly with the React component model. It allows for rapid UI development directly within components using convenient class names.
- **Efficiency with Axios & TanStack Query**: By wrapping **Axios** as the `apiClient` and using **TanStack Query** to manage all server states, I gained access to powerful built-in features like `isLoading`, `isError`, memory caching, and automatic retries. This significantly improved development speed and system stability.
- **Local Persistence Layer**: To optimize API usage and handle **Jikan API rate limits**, I integrated **idb-keyval** with TanStack Query. This allows the app to prioritize local data before fetching from the API, providing an "instant load" or offline experience for previously visited data. I also used `idb-keyval` to build a persistent **Favourite List**.
- **URL-Driven State Management (SSOT)**: The application treats the URL as the **Single Source of Truth**. Every pagination, filter, and sort change is synced to the URL query parameters using `react-router`. This ensures that browser navigation (Back/Forward) and deep-linking work perfectly.
- **Hybrid Rendering Strategy**:
  - **Infinite Scroll**: Used for specific datasets or limited results to provide a smooth, modern browsing experience.
  - **Pagination**: Used for the main list pages to prevent performance lag. Without a virtual list, pagination is a safer way to limit the number of DOM elements rendered at once.

---

## ⚠️ Known Issues & Limitations

- **System-Level Transparency Adaptation**: The UI relies heavily on `backdrop-filter` and `blur` effects. On older devices or systems where "Reduce Transparency" is enabled, these panels may appear as solid colors or completely transparent.
- **API Meta-data Consistency**: The Jikan API sometimes lacks metadata (like descriptions or ratings) for very old or very new anime. While I handled many cases, extreme data gaps might still cause minor layout shifts.
- **Jikan API Duplicate mal_id**: In some cases, the API returns duplicate entries (same `mal_id`) in a single result set (e.g., when sorting by `start_date`). Using `mal_id` as a React key can trigger "Duplicate Key" errors. I implemented with `index` key to handle this, but it remains a known API-side quirk.

  > https://api.jikan.moe/v4/anime?page=1&limit=12&order_by=start_date&sort=desc | mal_id `63235` ang `62841` appear twice

- **Limited Anime Details**: I planned to use an Axios Interceptor to track 429 errors and block spam requests locally, but this was deferred due to the 7-day development timeline.
- **Design Token Infrastructure**: As this was a rapid learning project for Tailwind CSS, some design values (colors/spacing) are hardcoded in components rather than centralized in a theme config.
- **Image Optimization**: Images use native **lazy loading**, but they are served in their original sizes from the Jikan API without server-side cropping.

## 🎨 Credits

This project's UI/UX design is inspired by the [Kurosaw – Anime Streaming Web App](https://dribbble.com/shots/21268682-Kurosaw-Anime-Streaming-Web-App) concept by **[Max Lewayer](https://dribbble.com/maxlewayer)**.

All visual design rights belong to the original creator. This implementation is a functional web application built as a personal project to showcase modern frontend engineering.

## ⚖️ License & Contributing

This project is **Open Source** and available under the **MIT License**.

I built this not only as a tool for anime discovery but also as a technical showcase of modern web development practices (React, Tailwind CSS, and API integration).

- **Contributions**: Issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/LaoSeng99/anime-search-app/issues).
- **Usage**: You are free to use, modify, and distribute this code for your own projects.
