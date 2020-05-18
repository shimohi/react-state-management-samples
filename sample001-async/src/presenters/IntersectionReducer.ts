import {AsyncReducer, ReducerResult} from "../shared/UseAsyncReducer";
import {IntersectionAction} from "./actions/IntersectionActions";
import {IntersectionViewState} from "./IntersectionViewState";
import {CrossingRequestReducer} from "./reducers/CrossingRequestReducer";
import {ResetReducer} from "./reducers/ResetReducer";

export type IntersectionReducers = AsyncReducer<IntersectionViewState, IntersectionAction>;

export type IntersectionReducer = (
	state: IntersectionViewState,
	params: IntersectionAction["params"]
) => ReducerResult<IntersectionViewState>;

export const Reducers: IntersectionReducers = (state, action) => {

	switch(action.type) {
		case "crossingRequest":
			return CrossingRequestReducer(state, action.params);
		default:
			return ResetReducer(state, action.params);
	}

}