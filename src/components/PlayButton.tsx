/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext } from 'react';
import { Context } from '../context/MainContext';

type Props = {
	gameStatus: {
		status: string;
		cellsOpened: number;
	};
};

type ButtonTheme = {
	text: string;
	background: string;
};

type CellProps = {
	index: number;
	bomb: boolean;
	checked: boolean;
};

function PlayButton({ gameStatus }: Props) {
	const { state, startGame, takeMoney, setStatus, updateCells } =
		useContext(Context);

	const { gameSettings, activeGame, gameCells } = state;

	const flipAllCells = () => {
		const allCells = gameCells.map((cell: CellProps) => {
			return {
				...cell,
				checked: true,
			};
		});
		updateCells(allCells);
	};

	const flipBackAllCells = () => {
		const allCells = gameCells.map((cell: CellProps) => {
			return {
				...cell,
				checked: false,
			};
		});
		updateCells(allCells);
	};

	const handleButtonTheme = (status: string): ButtonTheme => {
		if (status === 'initial') {
			return {
				text: 'START',
				background: 'Orange',
			};
		}
		if (status === 'active') {
			if (gameStatus.cellsOpened === 0) {
				return {
					text: 'CHOOSE CELL',
					background: 'grey',
				};
			} else {
				return {
					text: `TAKE: ${
						gameSettings.bid *
						gameSettings.coefficients[
							gameStatus.cellsOpened - 1
						].coefficient.toFixed(2)
					}`,
					background: 'Green',
				};
			}
		}
		if (status === 'lose') {
			return {
				text: 'PLAY AGAIN',
				background: 'Orange',
			};
		}
		if (status === 'win') {
			return {
				text: 'PLAY AGAIN',
				background: 'Orange',
			};
		}
		throw new Error(`Invalid status: ${status}`);
	};

	return (
		<button
			onClick={() => {
				if (activeGame.status === 'initial') {
					// console.log('clicked play');
					startGame(gameSettings.bombs);
					setStatus('active');
				}
				if (activeGame.status === 'active') {
					if (activeGame.cellsOpened === 0) return;
					// console.log('clicked Take money');
					takeMoney(
						gameSettings.coefficients[gameStatus.cellsOpened - 1].coefficient,
						gameSettings.bid
					);

					setStatus('win');
					flipAllCells();
				}
				if (activeGame.status === 'win' || activeGame.status === 'lose') {
					// console.log('clicked PLAY AGAIN');
					flipBackAllCells();
					setTimeout(() => {
						setStatus('initial');
					}, 1000);
				}
			}}
			style={{
				background: handleButtonTheme(gameStatus.status).background,
			}}
		>
			{handleButtonTheme(gameStatus.status).text}
		</button>
	);
}

export default PlayButton;
