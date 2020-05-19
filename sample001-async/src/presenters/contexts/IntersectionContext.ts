import {createContext, Dispatch} from "react";
import {PedestrianSignalStates} from "../../domain/entities/PedestrianSignal";
import {IntersectionAction} from "../actions/IntersectionActions";
import {IntersectionViewState} from "../IntersectionViewState";

export const IntersectionContext = createContext<{
	state: IntersectionViewState,
	dispatcher: Dispatch<IntersectionAction> }>(
	{
		state: { pedestrianSignal: PedestrianSignalStates.Red, waiting: false },
		dispatcher:() => {}
	}
);
