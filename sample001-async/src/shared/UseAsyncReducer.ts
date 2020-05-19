import {Dispatch, MutableRefObject, SetStateAction, useRef, useState} from "react";

export type ReducerResult<S> = Promise<S> | S | AsyncGenerator<S>;
// export type AsyncReducer<S, P, > = (
export type AsyncReducer<S, P, U> = (
	state: S,
	params: P,
	useCases: U, //+
) => ReducerResult<S>;

// export function useAsyncReducer<S,P>(
//  reducers: AsyncReducer<S, P>,
export function useAsyncReducer<S,P, U>(
	reducers: AsyncReducer<S, P, U>,
	initialState: S,
	useCases: U,
): [S, Dispatch<P>] {

	const [state, setState] = useState<S>( initialState )
	// const paramsRef = useRef<[AsyncReducer<S, P>,]>([reducers]);
	const paramsRef = useRef<[AsyncReducer<S, P, U>, U]>([reducers, useCases]);
	const stateRef = useRef<{state:S, setState:Dispatch<SetStateAction<S>>}>({ state, setState});
	const dispatcherRef = useRef<Dispatch<P> | null>(null);

	if ( !dispatcherRef.current ) {
		dispatcherRef.current = (params: P) => {
			// const [reducers] = paramsRef.current;
			const [reducers, useCases] = paramsRef.current;
			const {state} = stateRef.current;
			// handleResult(reducers(state, params), stateRef);
			handleResult(reducers(state, params, useCases), stateRef);
		}
	}
	// paramsRef.current = [reducers];
	paramsRef.current = [reducers, useCases];
	stateRef.current = { state, setState};
	return [state, dispatcherRef.current];
}

function handleResult<S, U>(
	result: ReducerResult<S>,
	stateRef: MutableRefObject<{
		state:S, setState:Dispatch<SetStateAction<S>>
	}>,
) {
	if (isPromise(result)) {
		(result as Promise<S>).then((state) => {
			const {setState} = stateRef.current;
			setState(state);
		});
		return;
	}
	if (isGenerator(result)) {
		const generator = result as AsyncGenerator<S>
		(async function() {
			for await (const state of generator) {
				const {setState} = stateRef.current;
				setState(state);
			}
		})();
		return;
	}
	const {setState} = stateRef.current;
	setState(result as S);
}

/**
 * 指定されたオブジェクトがPromiseかどうか判別
 * @param maybe
 */
function isPromise(maybe: any): boolean {
	return !!(maybe.then && maybe.catch );
}

/**
 * 指定されたオブジェクトがGeneratorかどうかを判別
 * @param maybe
 */
function isGenerator(maybe: any): boolean {
	return !!(maybe.return && maybe.next && maybe.throw);
}

