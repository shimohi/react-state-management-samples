import {IntersectionReducer} from "../IntersectionReducer";

export const CrossingRequestReducer: IntersectionReducer = async function* (state,params, useCases) {
	yield {
		...state,
		waiting: true
	};
	yield {
		...state,
		pedestrianSignal: await useCases.crossingRequest(),
		waiting: false
	}
}
