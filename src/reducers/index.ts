import { combineReducers } from "redux";
import { buildsList } from "./buildsListReducer";

export const rootReducer = combineReducers({
	buildsList,
});
