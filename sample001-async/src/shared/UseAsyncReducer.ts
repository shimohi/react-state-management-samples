import {Dispatch, MutableRefObject, SetStateAction, useRef, useState} from "react";

export type ReducerResult<S> = Promise<S> | S | AsyncGenerator<S>;
export type AsyncReducer<S, P, > = (
	state: S,
	params: P,
) => ReducerResult<S>;

/**
 * 非同期処理用カスタムフックの実装
 * @param reducers
 * @param initialState
 */
export function useAsyncReducer<S,P>(
	reducers: AsyncReducer<S, P>,
	initialState: S,
): [S, Dispatch<P>] {

	const [state, setState] = useState<S>( initialState )
	const paramsRef = useRef<[AsyncReducer<S, P>,]>([reducers]);
	const stateRef = useRef<{state:S, setState:Dispatch<SetStateAction<S>>}>({ state, setState});
	const dispatcherRef = useRef<Dispatch<P> | null>(null);

	if ( !dispatcherRef.current ) {
		dispatcherRef.current = (params: P) => {
			const [reducers] = paramsRef.current;
			const {state} = stateRef.current;
			handleResult(reducers(state, params), stateRef);
		}
	}
	paramsRef.current = [reducers];
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

