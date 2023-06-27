import './styles/_main.scss';
import GameWindow from './components/GameWindow';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<GameWindow />}
				/>
				<Route
					path='/auth'
					element={<AuthPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
