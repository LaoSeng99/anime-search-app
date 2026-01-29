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
3.  **Styling** : Tailwind CSS , [lucide-react](https://www.npmjs.com/package/lucide-react), [framer-motion](https://www.npmjs.com/package/framer-motion)
    - Lucide react : Icon library
    - Framer motion: Animation library
    -
4.  **Http Client** : Axios
5.  **useState+useEffect / TanStack Query** : [TanStack Query](https://www.npmjs.com/package/@tanstack/react-query)
    - Caching
    - Auto Re-fetching
    - Deduplication
    - Pagination / Infinite Scroll
    - Self-managed data, error, fetchNextPage, hasNextPage, isLoading...etc

6.  **Routing** : React Router:
    - Data mode
    - Declarative Routing
    - Nested Routes
    - Client-side routing

7.  **Naming**:
    | Type | Style | Example |
    | ---- | ----- | ------- |
    |**Components** |PascalCase | `AnimeCard.tsx` |
    |**Hooks**| camelCase| `useAnimeSearch.ts`|
    |**Service/Util**|camelCase|`animeService.ts`|
    |**Interface**|PascalCase|`interface AnimeDetail{...}`|
    |**Folder**|kebab-case|`anime-detail`|
    |**Constants**|UPPER_SNAKE_CASE| `const MAGIC_NUMBER = 25;`

## Issues

## Credits

This project's UI/UX design is inspired by the [Kurosaw – Anime Streaming Web App](https://dribbble.com/shots/21268682-Kurosaw-Anime-Streaming-Web-App) concept by **[Max Lewayer](https://dribbble.com/maxlewayer)**.

All visual design rights belong to the original creator. This implementation is a functional web application built as a personal project to showcase modern frontend tech stacks.
