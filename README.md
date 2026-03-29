# ProFood

A Swiggy-inspired React food ordering dashboard with Redux Toolkit, route-based navigation, offline-aware UX, loading skeletons, and smart frontend recommendations.

## Repository Description

`A Swiggy-style React food ordering dashboard built with Redux Toolkit, custom hooks, offline handling, and lightweight AI-powered restaurant recommendations.`

## Overview

ProFood is a frontend-focused food ordering project built with React and Parcel. It uses mock restaurant and menu data, but the app structure is designed in a way that can later be connected to real APIs with minimal architectural change.

## Features

- Restaurant listing page with search
- Virtualized restaurant grid using `react-window`
- Restaurant menu page with expandable categories
- Cart management using Redux Toolkit
- Async state handling with `createAsyncThunk`
- Global error boundary and route error UI
- Loading skeletons and improved empty states
- Offline-aware UX using a custom `useOnlineStatus` hook
- Smart recommendations based on current cart contents

## Tech Stack

- React
- React Router DOM
- Redux Toolkit
- React Redux
- Parcel
- react-window

## Project Structure

```text
src/
  components/   UI components and route-level views
  features/     Redux feature slices
    cart/
    restaurant/
  hooks/        Custom reusable hooks
  services/     Data shaping and recommendation helpers
  store/        Redux store setup
  utils/        Mock data and shared context
```

## Important Files

- `src/foodApp.js`: app entry point, layout, and router configuration
- `src/store/appStore.js`: Redux store setup
- `src/features/cart/cartSlice.js`: cart state and actions
- `src/features/restaurant/restaurantSlice.js`: restaurant list and menu async state
- `src/hooks/useOnlineStatus.js`: online/offline state hook
- `src/hooks/useRestaurantMenu.js`: restaurant menu loading hook
- `src/services/recommendationService.js`: lightweight recommendation logic

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

### Build for production

```bash
npm run build
```

## Notes

- The app currently uses local mock data from `src/utils/mockData.js`.
- API-facing async patterns are already set up with Redux Toolkit thunks.
- The recommendation feature is intentionally frontend-only and uses simple scoring logic instead of a backend model.
