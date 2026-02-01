- [Anime Search App](#anime-search-app)
  - [Project Description](#project-description)
  - [Installation](#installation)
  - [Run](#run)
  - [Tech Stack](#tech-stack)
  - [Issues](#issues)
  - [Credits](#credits)

# Anime Search App

## Project Description

## Installation

## Run

## Tech Stack

1.  **Framework** : React
2.  **Language** : Typescript
3.  **Styling/Animation** : Tailwind CSS , [lucide-react](https://www.npmjs.com/package/lucide-react), [framer-motion](https://www.npmjs.com/package/framer-motion)
    - Lucide react : Icon library
    - Framer motion: Animation library, Navigate animation
4.  **Http Client** : Axios
5.  **useState+useEffect / TanStack Query** : [TanStack Query](https://www.npmjs.com/package/@tanstack/react-query)
    - Caching
    - Auto Re-fetching
    - Deduplication
    - Pagination / Infinite Scroll
    - Self-managed data, error, fetchNextPage, hasNextPage, isLoading...etc

6.  **State management + Persist** : zustand + IDB-keyval
    - zustand for manage state
    - idb-keyval for persist state
    - use for local favourites

7.  **Routing** : React Router:
    - Data mode
    - Declarative Routing
    - Nested Routes
    - Client-side routing

8.  **Caching** : local/persist caching
    - Prevent tanstack query request too many time reach Jikan Rate limit
    - TanStack session/memory level cache -> persist (indexDb local storage)

9.  **Naming**:
    | Type | Style | Example |
    | ---- | ----- | ------- |
    |**Components** |PascalCase | `AnimeCard.tsx` |
    |**Hooks**| camelCase| `useAnimeSearch.ts`|
    |**Service/Util**|camelCase|`animeService.ts`|
    |**Interface**|PascalCase|`interface AnimeDetail{...}`|
    |**Folder**|kebab-case|`anime-detail`|
    |**Constants**|UPPER_SNAKE_CASE| `const MAGIC_NUMBER = 25;`

## Issues

1.  **tanstack/persist query**
    - Design Intent: Originally designed with a stale-while-revalidate approach. For Infinite Loading or paginated data, it tends to return all data at once, sending requests for every single page to update the old cache.
    - Performance: Rendering the data may cause UI lag or stuttering. It is necessary to use a Virtual List to ensure items are only rendered when they enter the viewport.

2.  **Jikan API**
    - In certain scenarios, the Jikan API may return duplicate anime entries within the same pagination result (e.g., specific mal_id appearing multiple times when sorted by start_date).
    - sample :https://api.jikan.moe/v4/anime?page=1&limit=12&order_by=start_date&sort=desc | mal_id `63235` ang `62841` appear twice
    - Using `mal_id` as a React key may trigger "Duplicate Key" errors. in some case, use a composite key with index also will a chance to duplicate..

## Credits

This project's UI/UX design is inspired by the [Kurosaw – Anime Streaming Web App](https://dribbble.com/shots/21268682-Kurosaw-Anime-Streaming-Web-App) concept by **[Max Lewayer](https://dribbble.com/maxlewayer)**.

All visual design rights belong to the original creator. This implementation is a functional web application built as a personal project to showcase modern frontend tech stacks.
