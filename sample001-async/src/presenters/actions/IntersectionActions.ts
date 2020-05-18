export interface IntersectionActions {
	crossingRequest: any;
	reset: any;
}

export interface IntersectionAction  {
	type: keyof IntersectionActions;
	params?: any
}

