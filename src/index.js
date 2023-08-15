import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import './styles/index.css';
import { App } from './components';
import { AuthProvider, PostsProvider } from './providers';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      // pauseOnFocusLoss
      draggable
      // pauseOnHover
      theme="colored"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
