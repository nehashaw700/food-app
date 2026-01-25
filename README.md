# Copilot Instructions for Food App (React)

## Architecture Overview

This is a React food delivery app using **Parcel** bundler and **React Router v6** for navigation. The app follows a component-based architecture with custom hooks for shared logic.

### Key Structure
- **Entry Point**: `foodApp.js` - Defines router configuration with lazy-loaded components
- **Layout**: `AppLayout` component renders `Header` + `Outlet` for nested routes
- **Pages**: Body (restaurant list), About (lazy-loaded), Menu (dynamic restaurant details)
- **Utils**: Custom hooks (`useRestaurantMenu`, `useOnlineStatus`) and mock API data

## Critical Patterns & Conventions

### 1. React Router v6 Setup
- Use `createBrowserRouter` with nested routes
- Routes defined as array of objects with `path`, `element`, `errorElement`, `children`
- Lazy-load components using `lazy(() => import(...))` wrapped in `<Suspense>`
- Use `<Outlet />` in parent layout for child route rendering
- Navigation via `<Link to="/path">` (not `<a>` tags)

### 2. Custom Hooks Pattern
- **`useRestaurantMenu(resId)`**: Filters mock data by restaurant ID, returns restaurant info
- **`useOnlineStatus()`**: Tracks browser online/offline status via window events
- All hooks return state that components can consume
- Hooks handle side effects with `useEffect` and cleanup functions

### 3. Data Flow
- **Mock Data**: `src/utils/mockData.js` contains restaurant array with structure: `{info: {id, name, cuisines, avgRating, ...}}`
- Components filter/display data from mock data, not from external APIs (commented-out Swiggy API calls)
- State management via `useState` - no Redux/Context currently used

### 4. Protected Routes
- `ProtectedRoute` component wraps routes requiring authentication
- Currently hardcoded `isAuthenticated = true` (placeholder implementation)
- Use `<Navigate to="/login" replace />` for unauthorized access

### 5. Component Naming & Location
- Functional components in `src/components/` named with PascalCase: `Header.js`, `Body.js`, `RestaurantCard.js`
- Utils/hooks in `src/utils/` with camelCase: `mockData.js`, `useRestaurantMenu.js`
- Components export default (e.g., `export default Header`)

## Build & Development

- **Start Dev Server**: `npm start` (runs Parcel on `index_react.html`)
- **Build**: `npm run build`
- **Test**: `npm test` (Jest configured, no test files currently)
- **Bundler**: Parcel transpiles JSX via Babel automatically

## Important Implementation Details

- **JSX Considerations**: Use camelCase for attributes (`className`, not `class`); inline JS wrapped in `{}`
- **Event Listeners**: Remember cleanup functions in `useEffect` when adding window/DOM listeners (see `useOnlineStatus`)
- **Dynamic Routes**: Menu page uses route params like `/restaurants/:resId` - extract with `useParams()`
- **Suspense**: Always provide `fallback` prop when lazy-loading components
- **State Updates**: Use functional setState if new state depends on previous state

## When Modifying Code

1. **Adding Routes**: Update `appRouter` children array in `foodApp.js`
2. **Adding Components**: Place in `src/components/`, export default, import in routing config
3. **Adding Utilities**: Create hook in `src/utils/` with `useXXX` naming convention
4. **API Integration**: Replace mock data fetch in component with actual API calls (see commented Swiggy API)
5. **Styling**: CSS imported in components; global styles in `index.css`

## Edge Cases to Handle

- **Offline State**: Body component shows "You are offline" message when `useOnlineStatus()` returns false
- **Missing Data**: Menu component should handle empty restaurant info gracefully
- **Route Not Found**: Error boundary component catches unmatched routes
