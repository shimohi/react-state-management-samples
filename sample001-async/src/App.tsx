import React, {useReducer} from "react";
import {Intersection} from "./components/Intersection";
import {PedestrianSignalStates} from "./domain/entities/PedestrianSignal";
import {IntersectionContext} from "./presenters/contexts/IntersectionContext";
import {Reducers} from "./presenters/IntersectionReducer";

function App() {
    const [state, dispatcher] = useReducer(
        Reducers,
        {pedestrianSignal: PedestrianSignalStates.Red}
    );
    return (
        <IntersectionContext.Provider value={{
            state: state,
            dispatcher: dispatcher
        }}>
            <Intersection
                // state={state} dispatcher={dispatcher}
            />
        </IntersectionContext.Provider>
    );
}
export default App;
