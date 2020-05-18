import React, {Dispatch} from "react";
import {PedestrianSignalStates} from "../domain/entities/PedestrianSignal";
import {IntersectionAction} from "../presenters/actions/IntersectionActions";
import {IntersectionViewState} from "../presenters/IntersectionViewState";
import {PedestrianButton} from "./PedestrianButton";
import {PedestrianSignal} from "./PedestrianSignal";

export function Intersection(params: {
    state: IntersectionViewState,
    dispatcher: Dispatch<IntersectionAction>
}) {
    const {state, dispatcher} = params;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="500px" viewBox="0 0 300 240">
            <g transform="translate(10,10)">
                <PedestrianSignal state={state} dispatcher={dispatcher} />
            </g>
            <g transform="translate(150,45)" >
                <PedestrianButton state={state} dispatcher={dispatcher} />
            </g>
            <g transform="translate(150,90)" style={{
                cursor: "pointer",
                display: state.pedestrianSignal === PedestrianSignalStates.Blue ? undefined : "none"
            }} onClick={ () => {
                dispatcher( { type:"reset"});
            }}>
                <text x="70.5" y="125" textAnchor="middle" fontSize="12" fill={"blue"
                }>リセット</text>
            </g>
        </svg>
    );
}

