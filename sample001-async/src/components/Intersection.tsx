import React, {useContext} from "react";
import {PedestrianSignalStates} from "../domain/entities/PedestrianSignal";
import {IntersectionContext} from "../presenters/contexts/IntersectionContext";
import {PedestrianButton} from "./PedestrianButton";
import {PedestrianSignal} from "./PedestrianSignal";

export function Intersection() {
    const {state, dispatcher} = useContext(IntersectionContext)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="500px" viewBox="0 0 300 240">
            <g transform="translate(10,10)">
                <PedestrianSignal/>
            </g>
            <g transform="translate(150,45)" >
                <PedestrianButton/>
            </g>
            { /*リセット処理へのリンク*/ }
            <g transform="translate(150,90)" style={{
                cursor: "pointer",
                display: state.pedestrianSignal === PedestrianSignalStates.Blue ? undefined : "none"
            }} onClick={ () => {
                dispatcher( { type:"reset"});
            }}>
                <text x="70.5" y="125" textAnchor="middle" fontSize="12" fill={"blue"}>リセット</text>
            </g>
        </svg>
    );
}

