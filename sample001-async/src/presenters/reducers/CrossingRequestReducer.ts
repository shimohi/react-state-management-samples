import {PedestrianSignalStates} from "../../domain/entities/PedestrianSignal";
import {IntersectionReducer} from "../IntersectionReducer";

export const CrossingRequestReducer: IntersectionReducer = async function* (state) {
	yield {
		...state,
		waiting: true
	};
	await sleep(3000);
	yield {
		...state,
		pedestrianSignal: PedestrianSignalStates.Blue,
		waiting: false
	}
}
export function sleep(time: number): Promise<any> {
	return new Promise( (resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}