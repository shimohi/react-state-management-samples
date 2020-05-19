import {IntersectionUseCases} from "../domain/use_cases/IntersectionUseCases";
import {PedestrianSignalState, PedestrianSignalStates} from "../domain/entities/PedestrianSignal";

export class MockIntersectionInteractor implements IntersectionUseCases {
	async crossingRequest(): Promise<PedestrianSignalState> {
		await sleep(3000);
		return PedestrianSignalStates.Blue;
	}
}

export function sleep(time: number): Promise<any> {
	return new Promise( (resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}