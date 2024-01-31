import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './components/app/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
