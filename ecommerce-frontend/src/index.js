import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import {StoreProvider} from './userContext'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


ReactDOM.render(
  <StoreProvider>
    <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}>
          <App />
      </PayPalScriptProvider>
    </HelmetProvider>
  </StoreProvider>,
  document.getElementById('root')
);
