import { AnyAction } from "redux";
import { BuildInfo } from "../../types/BuildInfo";

export type BuildsListState = {
	loading: boolean;
	data: BuildInfo[];
	hasMore: boolean;
};

const initialState: BuildsListState = {
	loading: false,
	data: [],
	hasMore: true,
};

export function buildsList(state = initialState, action: AnyAction) {
	switch (action.type) {
		case "BUILDS_LIST__LOADING":
			return { ...state, loading: true };
		case "BUILDS_LIST__LOAD":
			return {
				...state,
				loading: false,
				data: [...state.data, ...action.payload.data] as BuildInfo[],
				hasMore: action.payload.hasMore as boolean,
			};
		case "BUILDS_LIST__ADD":
			return { ...state, data: [action.payload, ...state.data] as BuildInfo[] };
		case "BUILDS_LIST__CLEAR":
			return { ...state, loading: false, data: [] as BuildInfo[] };
	}
	return state;
}
