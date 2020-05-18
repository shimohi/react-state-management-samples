import {PedestrianSignalStates} from "../../domain/entities/PedestrianSignal";
import {IntersectionReducer} from "../IntersectionReducer";

export const ResetReducer: IntersectionReducer = (state) => {
	return {
		...state,
		pedestrianSignal: PedestrianSignalStates.Red
	}
}