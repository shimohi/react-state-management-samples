import {Dispatch, MutableRefObject, SetStateAction, useRef, useState} from "react";

export type ReducerResult<S> = Promise<S> | S | AsyncGenerator<S>;
export type AsyncReducer<S, P, U> = (
	state: S,
	params: P,
	useCases: U,
) => ReducerResult<S>;

export type AsyncReducers<S, A, U> = {
	[P in keyof A]: AsyncReducer<S, A[P], U>
};
export type ActionDispatcher<A> = {
	[P in keyof A]: A[P] extends undefined ? () => void : ( params: A[P] ) => void
};

export function useAsyncReducer<S, A, U>(
	reducers: AsyncReducers<S, A, U>,
	initialState: S,
	useCases: U,
): [S, ActionDispatcher<A>] {

	const [state, setState] = useState<S>( initialState )
	const paramsRef = useRef<[AsyncReducers<S, A, U>, U]>([reducers, useCases]);
	const stateRef = useRef<{state:S, setState:Dispatch<SetStateAction<S>>}>({ state, setState});
	const dispatcherRef = useRef<ActionDispatcher<A> | null>(null);

	if ( !dispatcherRef.current ) {
		dispatcherRef.current = Object.keys(reducers).reduce(( res, actionName ) => {
			const reducers = paramsRef.current[0];
			const reducer = reducers[actionName as keyof A];
			res[actionName as keyof A] = ((params: any) => {
				const useCases = paramsRef.current[1]
				const {state} = stateRef.current; //
				handleResult(reducer(state, params, useCases), stateRef);
			}) as any;
			return res;
		}, {} as ActionDispatcher<A>);
	}
	paramsRef.current = [reducers, useCases];
	stateRef.current = { state, setState};
	return [state, dispatcherRef.current!];
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
