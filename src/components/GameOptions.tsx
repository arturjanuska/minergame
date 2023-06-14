/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useContext, useState } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import { Context } from '../context/MainContext';
import PlayButton from './PlayButton';

function GameOptions() {
	const { state, handleBid, handleBombs } = useContext(Context);

	const { gameSettings, activeGame } = state;

	return (
		<div className={styles.settings}>
			<div className={styles.bombs}>
				<p className={styles.bombs__title}>Number of bombs</p>
				<div className={styles.bombs__selector}>
					<div
						className={`${styles.bomb__square} ${
							gameSettings.bombs === 3 ? styles.selected : ''
						}`}
						onClick={() => handleBombs(3)}
					>
						<p>3</p>
					</div>
					<div
						className={`${styles.bomb__square} ${
							gameSettings.bombs === 5 ? styles.selected : ''
						}`}
						onClick={() => handleBombs(5)}
					>
						<p>5</p>
					</div>
					<div
						className={`${styles.bomb__square} ${
							gameSettings.bombs === 10 ? styles.selected : ''
						}`}
						onClick={() => handleBombs(10)}
					>
						<p>10</p>
					</div>
					<div
						className={`${styles.bomb__square} ${
							gameSettings.bombs === 16 ? styles.selected : ''
						}`}
						onClick={() => handleBombs(16)}
					>
						<p>16</p>
					</div>
					<div
						className={`${styles.bomb__square} ${
							gameSettings.bombs === 24 ? styles.selected : ''
						}`}
						onClick={() => handleBombs(24)}
					>
						<p>24</p>
					</div>
				</div>
				<div className={styles.another}>
					<p className={styles.title}>Another</p>
					<p className={styles.bomb__number}>{gameSettings.bombs}</p>
				</div>
			</div>
			<div className={styles.play__button}>
				<PlayButton gameStatus={activeGame} />
			</div>
			<div className={styles.bid}>
				<p className={styles.bid__title}>Bid</p>
				<div className={styles.bid__selector}>
					<p className={styles.bid__count}>
						{gameSettings.bid}.00 <span>€</span>
					</p>
					<div className={styles.count__selector}>
						<div
							className={styles.count__dec}
							onClick={() => {
								if (gameSettings.bid === 1) return;
								handleBid(gameSettings.bid - 1);
							}}
						>
							<p>-</p>
						</div>
						<div
							className={styles.count__inc}
							onClick={() => handleBid(gameSettings.bid + 1)}
						>
							<p>+</p>
						</div>
					</div>
				</div>
				<div className={styles.bid__numbers}>
					<button className={styles.bid__min__max}>Min</button>
					<button>+10</button>
					<button>+50</button>
					<button>+100</button>
					<button>+200</button>
					<button className={styles.bid__min__max}>Max</button>
				</div>
			</div>
		</div>
	);
}

export default GameOptions;
