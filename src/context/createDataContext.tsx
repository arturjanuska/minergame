/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer, ReactNode } from 'react';

type Action = (dispatch: React.Dispatch<any>) => any;

interface ContextProviderProps {
	children: ReactNode;
}

interface BoundActions {
	[key: string]: any;
}

interface DataContext {
	state: any;
	[key: string]: any;
}

interface CreateDataContextReturn {
	Context: React.Context<DataContext | null>;
	Provider: React.FC<ContextProviderProps>;
}

function createDataContext(
	reducer: React.Reducer<any, any>,
	actions: { [key: string]: Action },
	defaultValue: any
): CreateDataContextReturn {
	const Context = createContext<DataContext | null>(null);

	const Provider: React.FC<ContextProviderProps> = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, defaultValue);

		const boundActions: BoundActions = {};
		for (const key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		return (
			<Context.Provider value={{ state, ...boundActions }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
}

export default createDataContext;
