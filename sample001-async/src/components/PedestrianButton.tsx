import React, {Dispatch} from "react";
import {PedestrianSignalStates} from "../domain/entities/PedestrianSignal";
import {IntersectionAction} from "../presenters/actions/IntersectionActions";
import {IntersectionViewState} from "../presenters/IntersectionViewState";

export function PedestrianButton(params: {
    state: IntersectionViewState,
    dispatcher: Dispatch<IntersectionAction>
}) {
    const {state, dispatcher} = params;
    return (
        <React.Fragment>
            <rect fill="#D5BE2D" x="0" y="0" width="141" height="145" rx="8" />
            <rect fill="#0D0101" x="21" y="23" width="99" height="24" />
            <rect fill="#0D0101" x="21" y="108" width="99" height="24" />
            <circle fill="#959595" cx="11.5" cy="77.5" r="6.5" />
            <circle fill="#959595" cx="130.5" cy="77.5" r="6.5" />
            {/*<text x="70.5" y="39" textAnchor="middle" fontSize="12" fill="#E24A4A">おまちください</text>*/}
            <text x="70.5" y="125" textAnchor="middle" fontSize="12" fill={
                state.pedestrianSignal === PedestrianSignalStates.Red ? "red" : "none"
            }>おしてください</text>
            <g style={{
                cursor: state.pedestrianSignal === PedestrianSignalStates.Blue ? "not-allowed" : "pointer"
            }} onClick={ state.pedestrianSignal === PedestrianSignalStates.Blue ? undefined: () => {
                dispatcher( { type:"crossingRequest"});
            }}>
                <ellipse stroke="#979797" strokeWidth="2" fill="#B23236" cx="71" cy="77" rx="21" ry="20"/>
            </g>
        </React.Fragment>
    );
}
