import { useContext } from 'react';
import './styles/_main.scss';
import { Context } from './context/MainContext';
import Navbar from './components/Navbar';
import GameWindow from './components/GameWindow';

function App() {
	const { state, handleTheme } = useContext(Context);

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
