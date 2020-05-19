import {IntersectionUseCases} from "../domain/use_cases/IntersectionUseCases";
import {AsyncReducers, ReducerResult} from "../shared/UseAsyncReducer";
import {IntersectionActions} from "./actions/IntersectionActions";
import {IntersectionViewState} from "./IntersectionViewState";
import {CrossingRequestReducer} from "./reducers/CrossingRequestReducer";
import {ResetReducer} from "./reducers/ResetReducer";

export type IntersectionReducers = AsyncReducers<IntersectionViewState, IntersectionActions, IntersectionUseCases>;
export type IntersectionReducer<K extends keyof IntersectionActions> = (
	state: IntersectionViewState,
	params: IntersectionActions[K],
	useCases: IntersectionUseCases
) => ReducerResult<IntersectionViewState>;

export const Reducers: IntersectionReducers = {
	crossingRequest: CrossingRequestReducer,
	reset: ResetReducer
};
