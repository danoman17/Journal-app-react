import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { JournalApp } from './JournalApp';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(

	/* make sure you remove stric mode */
	<React.StrictMode>

		{/* We set our provider (when using Redux) */}
		<Provider store={ store }>

			<BrowserRouter>

				<JournalApp />
				
			</BrowserRouter>

		</Provider>


	</React.StrictMode>
);