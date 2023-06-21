import { useContext } from 'react';
import './styles/_main.scss';
import Navbar from './components/Navbar';
import GameWindow from './components/GameWindow';
import { AppContext } from './context/Context';

function App() {
	const { state, dispatch } = useContext(AppContext);

	return (
		<div className={state.theme}>
			<Navbar />
			<div className='background transition'>
				<GameWindow />
			</div>
		</div>
	);
}

export default App;
