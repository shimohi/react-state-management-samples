import {PedestrianSignalState} from "../domain/entities/PedestrianSignal";

export interface IntersectionViewState {
	pedestrianSignal: PedestrianSignalState;
	waiting: boolean;
}