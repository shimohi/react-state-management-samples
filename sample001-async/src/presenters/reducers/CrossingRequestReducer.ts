import {PedestrianSignalStates} from "../../domain/entities/PedestrianSignal";
import {IntersectionReducer} from "../IntersectionReducer";

export const CrossingRequestReducer: IntersectionReducer = async (state) => {
	await sleep(3000);
	return {
		...state,
		pedestrianSignal: PedestrianSignalStates.Blue
	}
}
export function sleep(time: number): Promise<any> {
	return new Promise( (resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}