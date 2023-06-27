import { CellType, StatusType, StatType } from '../context/reducers';

type UpdateCellsType = (cellsArr: CellType[]) => {
	cellsArr: CellType[];
	cellsOpened: number;
};

type CheckCellsType = (cells: CellType[]) => boolean;

type SetStatusType = (status: StatusType) => StatusType;

export const updateCells: UpdateCellsType = (cellsArr) => {
	const openedCells = cellsArr.filter((cell) => cell.checked === true);
	const openedCellsLength = openedCells.length;

	return {
		cellsArr: cellsArr,
		cellsOpened: openedCellsLength > 24 ? 0 : openedCellsLength,
	};
};

export const checkCells: CheckCellsType = (cells) => {
	const isBomb = cells.some(
		(cell) => cell.checked === true && cell.bomb === true
	);
	if (isBomb) {
		return true;
	} else {
		return false;
	}
};

export const setStatus: SetStatusType = (status) => {
	if (status === 'lose') {
		return 'lose';
	}
	if (status === 'active') {
		return 'active';
	}
	if (status === 'win') {
		return 'win';
	}
	if (status === 'initial') {
		return 'initial';
	}
	return 'initial';
};

export const generateCells = (bombsSelected: number) => {
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
