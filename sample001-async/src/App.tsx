import React from "react";
import {Intersection} from "./components/Intersection";
import {PedestrianSignalStates} from "./domain/entities/PedestrianSignal";
import {IntersectionContext} from "./presenters/contexts/IntersectionContext";
import {Reducers} from "./presenters/IntersectionReducer";
import {useAsyncReducer} from "./shared/UseAsyncReducer";

function App() {
    const [state, dispatcher] = useAsyncReducer(
        Reducers,
        {pedestrianSignal: PedestrianSignalStates.Red}
    );
    return (
        <IntersectionContext.Provider value={{
            state: state,
            dispatcher: dispatcher
        }}>
            <Intersection/>
        </IntersectionContext.Provider>
    );
}
export default App;
