/* eslint-disable no-mixed-spaces-and-tabs */
import createDataContext from './createDataContext';
import {
	coefficient22,
	coefficient20,
	coefficient15,
	coefficient9,
	coefficient1,
} from '../data/coefficients';

const mainReducer = (state, action) => {
	switch (action.type) {
		case 'change_theme':
			return { ...state, theme: action.payload };
		case 'bid':
			return {
				...state,
				gameSettings: { ...state.gameSettings, bid: action.payload },
			};
		case 'bombs':
			return {
				...state,
				gameSettings: {
					...state.gameSettings,
					bombs: action.payload.bombs,
					coefficients: action.payload.coefficients,
				},
			};
		case 'generate_cells':
			return {
				...state,
				gameCells: action.payload,
				activeGame: { cellsOpened: 0, status: 'active' },
			};
		case 'update_cells':
			return {
				...state,
				gameCells: action.payload.cellsArr,
				activeGame: {
					status: action.payload.status,
					cellsOpened: action.payload.openedCells,
				},
			};
		case 'lose':
			return {
				...state,
				activeGame: {
					...state.activeGame,
					status: 'lose',
				},
				status: 'lose',
			};
		default:
			return state;
	}
};

const checkCells = (dispatch) => (cells) => {
	const isBomb = cells.some(
		(cell) => cell.checked === true && cell.bomb === true
	);
	if (isBomb) {
		dispatch({
			type: 'lose',
		});
	}
};

const generateCells = (bombsSelected) => {
	const cells = Array.from({ length: 25 }, (_, index) => ({
		index,
		bomb: false,
		checked: false,
	}));

	const bombs = [];

	for (let i = 0; i < bombsSelected; i++) {
		let randomIndex;
		let randomNum;

		do {
			randomIndex = Math.floor(Math.random() * cells.length);
			randomNum = cells[randomIndex];
		} while (randomNum.bomb);

		randomNum.bomb = true;
		bombs.push(randomNum);
		cells[randomIndex] = { ...randomNum };
	}
	return cells;
};

const handleTheme = (dispatch) => (currentTheme) => {
	currentTheme === 'light'
		? dispatch({
				type: 'change_theme',
				payload: 'dark',
		  })
		: dispatch({
				type: 'change_theme',
				payload: 'light',
		  });
};

const handleBid = (dispatch) => (bid) => {
	dispatch({
		type: 'bid',
		payload: bid,
	});
};

const handleBombs = (dispatch) => (bombs) => {
	let boxes;

	if (bombs === 3) {
		boxes = coefficient22;
	}
	if (bombs === 5) {
		boxes = coefficient20;
	}
	if (bombs === 10) {
		boxes = coefficient15;
	}
	if (bombs === 16) {
		boxes = coefficient9;
	}
	if (bombs === 24) {
		boxes = coefficient1;
	}

	dispatch({
		type: 'bombs',
		payload: { bombs: bombs, coefficients: boxes },
	});
};

const startGame = (dispatch) => (bombsSelected) => {
	const generatedGame = generateCells(bombsSelected);
	dispatch({
		type: 'generate_cells',
		payload: generatedGame,
	});
};

const updateCells = (dispatch) => (cellsArr) => {
	const openedCells = cellsArr.filter((cell) => cell.checked === true);
	const openedCellsLength = openedCells.length;

	dispatch({
		type: 'update_cells',
		payload: {
			status: 'initial',
			cellsArr: cellsArr,
			openedCells: openedCellsLength > 24 ? 0 : openedCellsLength,
		},
	});
};

const resetGame = (dispatch) => (bombsSelected) => {
	// TODO
	const cells = generateCells(bombsSelected);
	dispatch({
		type: 'reset',
		payload: {
			gameCells: cells,
		},
	});
};

const handleBarStatus = (dispatch) => (status) => {
	dispatch({
		type: 'change_status',
		payload: status === 'lose' ? 'lose' : 'win',
	});
};

const takeMoney = (dispatch) => (coeff, bid) => {
	const sum = bid * coeff;

	dispatch({
		type: 'win',
		payload: {
			sum,
			status: 'win',
		},
	});
};

export const { Provider, Context } = createDataContext(
	// Reducer

	mainReducer,
	// Actions
	{
		handleTheme,
		handleBid,
		handleBombs,
		startGame,
		updateCells,
		checkCells,
		resetGame,
		handleBarStatus,
		takeMoney,
	},
	// InitialStates
	{
		theme: 'dark',
		gameSettings: {
			bombs: 3,
			bid: 1,
			coefficients: coefficient22,
		},
		gameCells: [],
		activeGame: {
			status: 'initial',
			cellsOpened: 0,
		},
		status: '',
	}
);
