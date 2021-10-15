import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AppDispatch, RootState } from "../../store";
import { buildHistory } from "../../data/buildHistory";
import { BuildInfo } from "../../types/BuildInfo";

export function load(count: number, fromId?: number) {
	return (dispatch: AppDispatch) => {
		dispatch({ type: "BUILDS_LIST__LOADING" });
		setTimeout(() => {
			const ids = buildHistory.map((item) => item.id);
			const startIndex = fromId ? ids.indexOf(fromId) + 1 : 0;
			const data: BuildInfo[] = buildHistory.slice(
				startIndex,
				startIndex + count
			);
			dispatch({
				type: "BUILDS_LIST__LOAD",
				payload: { data, hasMore: startIndex + count < buildHistory.length },
			});
		}, Math.random() * 3000);
	};
}

export function add(data: BuildInfo) {
	return async (dispatch: ThunkDispatch<RootState, void, AnyAction>) =>
		new Promise<AnyAction>((resolve) => {
			buildHistory.unshift(data);
			resolve(
				dispatch({
					type: "BUILDS_LIST__ADD",
					payload: data,
				})
			);
		});
}

export function clear() {
	return { type: "BUILDS_LIST__CLEAR" };
}
