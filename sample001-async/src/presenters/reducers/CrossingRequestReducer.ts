import {IntersectionReducer} from "../IntersectionReducer";

export const CrossingRequestReducer: IntersectionReducer<"crossingRequest"> = async function* (state,params, useCases) {
	yield {
		...state,
		waiting: true,
		message: params.message
	};
	yield {
		...state,
		pedestrianSignal: await useCases.crossingRequest(),
		waiting: false,
		message: undefined
	}
}
