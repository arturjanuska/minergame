/* eslint-disable no-mixed-spaces-and-tabs */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload: M[Key];
		  };
};

export enum Types {
	Theme = 'change_theme',
	Bid = 'bid',
	Bombs = 'bombs',
	Status = 'set_status',
	Prize = 'set_prize',
	Generate = 'generate_cells',
	Update = 'update_cells',
	CellsCount = 'set_cells_count',
	Language = 'set_language',
}

export type BombsType = number;
export type BidType = number;
export type CoefficientType = {
	coefficient: number;
};

export type CellType = {
	index: number;
	bomb: boolean;
	checked: boolean;
};

export type GameCellsType = CellType[];

export type StatusType = 'initial' | 'active' | 'win' | 'lose';

export type CellOpenedType = number;

export type CashPrizeType = number;

export type BeforeEndOpenedCellsType = number;

export type ThemeType = 'dark' | 'light';

export type LanguageType = {
	title: string;
	stateTitle: string;
};

export type StateType = {
	theme: ThemeType;
	bombs: BombsType;
	language: LanguageType;
	bid: BidType;
	coefficients: CoefficientType[];
	gameCells: CellType[];
	status: StatusType;
	cellsOpened: CellOpenedType;
	cashPrize: CashPrizeType;
	beforeEndOpenedCells: BeforeEndOpenedCellsType;
};

// settings

type SettingsPayload = {
	[Types.Theme]: ThemeType;
	[Types.Bid]: BidType;
	[Types.Bombs]: {
		bombs: number;
		coefficients: CoefficientType[];
	};
	[Types.Status]: StatusType;
	[Types.Prize]: CashPrizeType;
	[Types.Language]: LanguageType;
};

export type SettingsActions =
	ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const settingsReducer = (state: StateType, action: SettingsActions) => {
	switch (action.type) {
		case 'change_theme':
			return { ...state, theme: action.payload };
		case 'bid':
			return {
				...state,
				bid: action.payload,
			};
		case 'bombs':
			return {
				...state,
				bombs: action.payload.bombs,
				coefficients: action.payload.coefficients,
			};
		case 'set_status':
			return {
				...state,
				status: action.payload,
			};
		case 'set_prize':
			return {
				...state,
				cashPrize: action.payload,
			};
		case 'set_language':
			return {
				...state,
				language: action.payload,
			};

		default:
			return state;
	}
};

// cells

type CellsPayload = {
	[Types.Generate]: GameCellsType;
	[Types.Update]: {
		cellsArr: GameCellsType;
		cellsOpened: number;
	};
	[Types.CellsCount]: BeforeEndOpenedCellsType;
};

export type CellsActions =
	ActionMap<CellsPayload>[keyof ActionMap<CellsPayload>];

export const cellsReducer = (state: StateType, action: CellsActions) => {
	switch (action.type) {
		case 'generate_cells':
			return {
				...state,
				gameCells: action.payload,
				cellsOpened: 0,
				cashPrize: 0,
				beforeEndOpenedCells: 0,
			};
		case 'update_cells':
			return {
				...state,
				gameCells: action.payload.cellsArr,
				cellsOpened: action.payload.cellsOpened,
			};
		case 'set_cells_count':
			return {
				...state,
				beforeEndOpenedCells: action.payload,
			};
		default:
			return state;
	}
};