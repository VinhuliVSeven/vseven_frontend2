{
	/* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/fonts.css';
import './css/colors.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Launchpad from './Launchpad';
import Admin from './Admin';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Launchpad />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;