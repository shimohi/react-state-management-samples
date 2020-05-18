import {PedestrianSignalStates} from "../../domain/entities/PedestrianSignal";
import {IntersectionReducer} from "../IntersectionReducer";

export const CrossingRequestReducer: IntersectionReducer = (state) => {
	return {
		...state,
		pedestrianSignal: PedestrianSignalStates.Blue
	}
}