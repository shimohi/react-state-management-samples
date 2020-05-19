import {PedestrianSignalStates} from "../../domain/entities/PedestrianSignal";
import {IntersectionReducer} from "../IntersectionReducer";
export const ResetReducer: IntersectionReducer<"reset"> = (state) => {
	return {
		...state,
		pedestrianSignal: PedestrianSignalStates.Red
	}
}