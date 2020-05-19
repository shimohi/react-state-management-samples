import {createContext} from "react";
import {PedestrianSignalStates} from "../../domain/entities/PedestrianSignal";
import {ActionDispatcher} from "../../shared/UseAsyncReducer";
import {IntersectionActions} from "../actions/IntersectionActions";
import {Reducers} from "../IntersectionReducer";
import {IntersectionViewState} from "../IntersectionViewState";

export const IntersectionContext = createContext<{
	state: IntersectionViewState,
	dispatcher: ActionDispatcher<IntersectionActions> }>(
	{
		state: { pedestrianSignal: PedestrianSignalStates.Red, waiting: false },
		dispatcher: Object.keys(Reducers).reduce((res, key) => {
			res[key as keyof IntersectionActions] = () => {};
			return res;
		}, {} as ActionDispatcher<IntersectionActions>)
	}
);
