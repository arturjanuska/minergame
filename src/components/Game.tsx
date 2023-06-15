/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import Cell from './Cell';

import { Context } from '../context/MainContext';
import CoefficientsRow from './CoefficientsRow';

type CellProps = {
	index: number;
	bomb: boolean;
	checked: boolean;
};

function Game() {
	const { state, updateCells, setStatus, setOpenedCellsCount } =
		useContext(Context);

	const { gameSettings, gameCells } = state;

	const cells = Array.from({ length: 25 });

	const checkCells = (cells: CellProps[]): boolean => {
		const isBomb = cells.some(
			(cell) => cell.checked === true && cell.bomb === true
		);
		if (isBomb) {
			return true;
		} else {
			return false;
		}
	};

	const flipCell = (index: number) => {
		// console.log('Clicked cell index ==> ', index);
		const updatedCells = gameCells.map((cell: CellProps) => {
			if (cell.index === index) {
				return {
					...cell,
					checked: true,
				};
			}
			return cell;
		});
		const isBomb = checkCells(updatedCells);
		// console.log('Bomb? ==> ', isBomb);
		const openedCellsCount = updatedCells.filter(
			(cell: CellProps) => cell.checked
		);
		if (isBomb) {
			setTimeout(() => {
				const allFlipedCells = gameCells.map((cell: CellProps) => {
					return {
						...cell,
						checked: true,
					};
				});
				updateCells(allFlipedCells);
				setStatus('lose');
			}, 500);
		} else {
			setOpenedCellsCount(openedCellsCount.length);
			updateCells(updatedCells);
			setStatus('active');
		}
	};

	return (
		<div className={styles.stars_bg}>
			<div className={styles.game}>
				<div className={styles.cells}>
					{gameCells.length === 0
						? cells.map((_, idx) => (
								<Cell
									cellIdx={idx}
									key={idx}
									flip={(idx) => 'Log in and Click PLAY'}
								/>
						  ))
						: gameCells.map((cell: CellProps, idx: number) => (
								<Cell
									key={idx}
									cellIdx={idx}
									bomb={cell.bomb}
									checked={cell.checked}
									flip={() => flipCell(idx)}
								/>
						  ))}
				</div>
				<CoefficientsRow />
				<div className={styles.miner__counter__coll__coins}>
					<img
						src='https://getx13.bond/_nuxt/img/coin.8461f21.svg'
						alt='coin'
						style={{
							width: '24px',
							height: '24px',
							objectFit: 'contain',
						}}
					/>
					<p>{25 - gameSettings.bombs}</p>
				</div>
				<div className={styles.miner__counter__coll__bombs}>
					<img
						src='https://getx13.bond/_nuxt/img/bomb.19c1222.svg'
						alt='bomb'
						style={{
							width: '24px',
							height: '24px',
							objectFit: 'contain',
						}}
					/>
					<p>{gameSettings.bombs}</p>
				</div>
			</div>
		</div>
	);
}

export default Game;
