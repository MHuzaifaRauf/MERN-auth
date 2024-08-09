# MERN Authentication - Client Side

This project demonstrates a robust client-side implementation for a MERN (MongoDB, Express, React, Node.js) stack authentication system. It showcases the integration of Redux for state management, React Router for navigation, and implements protected routes for secure access control.

## Features

- User Registration
- User Login
- User Logout
- Protected Routes
- Profile Management
- Responsive Design with React-Bootstrap
- State Management with Redux Toolkit
- Toast Notifications with React-Toastify

## Project Structure

The client-side code is organized as follows:

```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/slices/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Key Technologies

- **React**: A JavaScript library for building user interfaces
- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development
- **React Router**: Declarative routing for React applications
- **React-Bootstrap**: Bootstrap components built with React
- **React-Toastify**: Easy to use notification library for React
- **Vite**: Next generation frontend tooling

## Setup and Installation

1. Clone the repository
2. Navigate to the client directory: `cd client`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## How It Works

### Routing

The application uses React Router for navigation. The main routing configuration is set up in `main.jsx`:

```javascript
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Public Routes */}
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route path='' element={<ProtectedRoutes />}>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </Route>
  )
)
```

This setup allows for easy addition of new routes and provides a clear distinction between public and protected routes.

### State Management

Redux Toolkit is used for state management. The store is configured in `store/store.js` and provided to the entire application in `main.jsx`:

```javascript
import store from './store/store.js'
import { Provider } from 'react-redux'

// ...

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={ router } />
    </StrictMode>
  </Provider>
)
```

### Protected Routes

The `ProtectedRoutes` component ensures that certain routes are only accessible to authenticated users. If a user is not authenticated, they are redirected to the login page.

### UI Components

React-Bootstrap is used for responsive and styled UI components. The Bootstrap CSS is imported in `main.jsx`:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
```

### Notifications

React-Toastify is used for displaying toast notifications to the user for various actions and states.

## Using This Template

This project serves as an excellent starting point for building Single Page Applications (SPAs) with authentication. Here's how you can leverage this template:

1. **Quick Start**: Clone the repository and you have a fully functional authentication system ready to go.
2. **Customization**: Easily add new routes, components, and pages to fit your specific application needs.
3. **State Management**: The Redux setup can be extended to manage additional application state as your project grows.
4. **Styling**: Utilize React-Bootstrap components for rapid UI development, or replace with your preferred UI library.
5. **API Integration**: The Redux slices are set up to interact with a backend API, making it simple to add new API calls and manage their state.