import {IntersectionUseCases} from "../domain/use_cases/IntersectionUseCases";
import {AsyncReducer, ReducerResult} from "../shared/UseAsyncReducer";
import {IntersectionAction} from "./actions/IntersectionActions";
import {IntersectionViewState} from "./IntersectionViewState";
import {CrossingRequestReducer} from "./reducers/CrossingRequestReducer";
import {ResetReducer} from "./reducers/ResetReducer";

export type IntersectionReducers = AsyncReducer<IntersectionViewState, IntersectionAction, IntersectionUseCases>;

export type IntersectionReducer = (
	state: IntersectionViewState,
	params: IntersectionAction["params"],
	useCases: IntersectionUseCases
) => ReducerResult<IntersectionViewState>;

export const Reducers: IntersectionReducers = (state, action, useCases) => {

	switch(action.type) {
		case "crossingRequest":
			return CrossingRequestReducer(state, action.params, useCases);
		default:
			return ResetReducer(state, action.params, useCases);
	}
}