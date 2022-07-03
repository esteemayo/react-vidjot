import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'context/auth/AuthContext';
import { IdeaProvider } from './context/ideas/IdeaContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <IdeaProvider>
        <App />
      </IdeaProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
