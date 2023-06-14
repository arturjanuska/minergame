import React from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import Stats from './Stats';
import Game from './Game';
import GameOptions from './GameOptions';

const GameWindow: React.FC = () => {
	return (
		<div className={styles.window__container}>
			<div className={styles.left__side}>
				<Stats />
			</div>
			<div className={styles.right__side}>
				<Game />
				<GameOptions />
			</div>
		</div>
	);
};

export default GameWindow;
