import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { coefficient22 } from '../data/coefficients';
import {
	StateType,
	settingsReducer,
	cellsReducer,
	SettingsActions,
	CellsActions,
	Types,
	userReducer,
	UserActions,
} from './reducers';

type AppContextValue = {
	state: StateType;
	dispatch: Dispatch<SettingsActions | CellsActions | UserActions>;
};

type AppProviderProps = {
	children: ReactNode;
};

const initialState: StateType = {
	theme: 'dark',
	language: {
		title: 'English',
		stateTitle: 'english',
	},
	bombs: 3,
	bid: 1,
	coefficients: coefficient22,
	gameCells: [],
	status: 'initial',
	cellsOpened: 0,
	cashPrize: 0,
	beforeEndOpenedCells: 0,
	registeredUsers: [],
	isLogged: false,
	loggedUser: {
		id: 0,
		username: '',
		cash: 0,
	},
	stats: [],
};

const AppContext = createContext<AppContextValue>({
	state: initialState,
	dispatch: () => null,
});

const mainReducer: React.Reducer<
	StateType,
	SettingsActions | CellsActions | UserActions
> = (
	state: StateType,
	action: SettingsActions | CellsActions | UserActions
) => {
	switch (action.type) {
		// Handle settings actions
		case Types.Theme:
		case Types.Bid:
		case Types.Bombs:
		case Types.Status:
		case Types.Prize:
		case Types.Language:
			return {
				...state,
				...settingsReducer(state, action as SettingsActions),
			};
		// Handle cells actions
		case Types.Generate:
		case Types.Update:
		case Types.CellsCount:
			return {
				...state,
				...cellsReducer(state, action as CellsActions),
			};
		// Handle user actions
		case Types.RegUser:
		case Types.IsLogged:
		case Types.LoggedUser:
		case Types.Stats:
		case Types.Cash:
			return {
				...state,
				...userReducer(state, action as UserActions),
			};
		default:
			return state;
	}
};

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [state, dispatch]: [
		StateType,
		Dispatch<SettingsActions | CellsActions | UserActions>
	] = useReducer(mainReducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
