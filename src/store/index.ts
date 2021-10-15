import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "../reducers";

export const configureStore = () => {
	const middlewareEnhancer = applyMiddleware(thunkMiddleware);
	const composedEnhancers = compose(middlewareEnhancer);
	return createStore(rootReducer, undefined, composedEnhancers);
};

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
