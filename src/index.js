import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthProvider from './Auth/AuthContext';
import ChatProvider from './Context/ChatContext';
import GlobalStyles from './components/GlobalStyles/GlobalStyles'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ChatProvider>
      <GlobalStyles>
        <Router>
          <App path="*" />
        </Router>
      </GlobalStyles>
    </ChatProvider>
  </AuthProvider>
);

