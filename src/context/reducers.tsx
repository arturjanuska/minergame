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
	RegUser = 'add_user',
	IsLogged = 'set_logged',
	LoggedUser = 'set_user',
	Stats = 'set_data',
	Cash = 'handle_cash',
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

export type UserType = {
	id: number;
	username: string;
	password: string;
	cash: number;
};

export type StatType = {
	username: string;
	bid: number;
	bombs: number;
	ratio: number;
	winning: number | '-';
};

export type LoggedUserType = {
	id: number;
	username: string;
	password?: string;
	cash: number;
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
	registeredUsers: UserType[];
	isLogged: boolean;
	loggedUser: LoggedUserType;
	stats: StatType[];
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

// user

type UserPayload = {
	[Types.RegUser]: UserType;
	[Types.IsLogged]: boolean;
	[Types.LoggedUser]: {
		isLogged: boolean;
		loggedUser: LoggedUserType;
	};
	[Types.Stats]: StatType;
	[Types.Cash]: number;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const userReducer = (state: StateType, action: UserActions) => {
	switch (action.type) {
		case Types.RegUser:
			return {
				...state,
				registeredUsers: [...state.registeredUsers, action.payload],
			};
		case Types.IsLogged:
			return {
				...state,
				isLogged: action.payload,
			};
		case Types.LoggedUser:
			return {
				...state,
				isLogged: action.payload.isLogged,
				loggedUser: action.payload.loggedUser,
			};
		case Types.Stats:
			return {
				...state,
				stats: [action.payload, ...state.stats],
			};
		case Types.Cash:
			return {
				...state,
				loggedUser: {
					...state.loggedUser,
					cash: action.payload,
				},
			};

		default:
			return state;
	}
};
