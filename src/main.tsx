import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from './context/MainContext.jsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider>
		<App />
	</Provider>
);
