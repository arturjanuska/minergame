import React, { useContext } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import Stats from './Stats';
import Game from './Game';
import GameOptions from './GameOptions';
import Navbar from './Navbar';
import Footer from './Footer';

import { AppContext } from '../context/Context';

const GameWindow: React.FC = () => {
	const { state } = useContext(AppContext);

	return (
		<div className={state.theme}>
			<Navbar />
			<div className='background'>
				<div className={styles.window__container}>
					<div className={styles.left__side}>
						<Stats />
					</div>
					<div className={styles.right__side}>
						<Game />
						<GameOptions />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default GameWindow;
