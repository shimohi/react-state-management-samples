import React, {useReducer} from "react";
import {Intersection} from "./components/Intersection";
import {PedestrianSignalStates} from "./domain/entities/PedestrianSignal";
import {Reducers} from "./presenters/IntersectionReducer";

function App() {
    const [state, dispatcher] = useReducer(
        Reducers,
        {pedestrianSignal: PedestrianSignalStates.Red}
    );
    return (
        <Intersection state={state} dispatcher={dispatcher} />
    );
}
export default App;
