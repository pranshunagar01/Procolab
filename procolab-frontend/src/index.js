// Import react and react-dom libraries
import React from 'react';
import {render} from 'react-dom';

// Import auth0 library
import { Auth0Provider } from '@auth0/auth0-react';

// Import App component
import App from './App';

// Render App component with Auth0Provider
render(
  <Auth0Provider
    domain=""
    clientId=""
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
