import React from 'react';
import {render} from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';


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
