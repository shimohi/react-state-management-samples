import {PedestrianSignalState} from "../entities/PedestrianSignal";

export interface IntersectionUseCases {
	crossingRequest(): Promise<PedestrianSignalState>;
}