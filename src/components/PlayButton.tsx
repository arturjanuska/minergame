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
function PlayButton({ gameStatus }: Props) {
	const { state, handleBarStatus, startGame, takeMoney } = useContext(Context);

	const { gameSettings } = state;

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
					text: 'Choose Cell',
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
			handleBarStatus('lose');
			return {
				text: 'START',
				background: 'Orange',
			};
		}
		if (status === 'win') {
			handleBarStatus('win');
			return {
				text: 'START',
				background: 'Orange',
			};
		}
		throw new Error(`Invalid status: ${status}`);
	};

	const handleButtonOnClick = (status: string): void => {
		console.log(status);

		if (status === 'initial') startGame(gameSettings.bombs);
		if (status === 'active')
			takeMoney(
				gameSettings.coefficients[gameStatus.cellsOpened - 1].coefficient,
				gameSettings.bid
			);
		if (status === 'lose') startGame(gameSettings.bombs);
		if (status === 'win') startGame(gameSettings.bombs);
	};

	return (
		<button
			onClick={() => handleButtonOnClick(gameStatus.status)}
			style={{
				background: handleButtonTheme(gameStatus.status).background,
			}}
		>
			{handleButtonTheme(gameStatus.status).text}
		</button>
	);
}

export default PlayButton;
