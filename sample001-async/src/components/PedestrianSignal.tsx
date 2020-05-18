import React, {useContext} from "react";
import {PedestrianSignalStates} from "../domain/entities/PedestrianSignal";
import {IntersectionContext} from "../presenters/contexts/IntersectionContext";

export function PedestrianSignal() {
    const {state} = useContext(IntersectionContext);
    return (
        <React.Fragment>
            <rect fill="#D8D8D8" x="0" y="0" width="105" height="216" rx="8" />
            <rect fill={ state.pedestrianSignal === PedestrianSignalStates.Blue ? "#018CBA" : "#002F2E" } x="8" y="119" width="88" height="88" rx="8" />
            <rect fill={ state.pedestrianSignal === PedestrianSignalStates.Blue ? "#530103" : "#DF0409" } x="8" y="10" width="88" height="88" rx="8" />
            <g transform="translate(38, 17)" fill="#CBC9C9" >
                <path d="M13,13 C17,13 20,10 20,7 C20,3 17,0 13,0 C9,0 6,3 6,7 C6,10 9,13 13,13 Z" />
                <path d="M19,16 L13,16 L7,16 C4,16 0,20 0,23 L0,46 C0,47 1,48 3,48 C4,48 3,48 5,48
            L6,68 C6,70 8,71 9,71 C10,71 12,71 13,71 C14,71 16,71 17,71 C18,71 20,70 20,68
            L21,48 C23,48 22,48 23,48 C25,48 26,47 26,46 L26,23 C26,20 22,16 19,16 Z" />
            </g>
            <g transform="translate(26, 128)" fill="#CBC9C9" >
                <path d="M51,33 L46,26 C45,25 43,24 42,23 L32,18 C30,17 28,16 26,16 L23,16 C22,16
            20,16 19,18 L10,26 L2,28 C0,28 -0,30 0,31 L0,31 C0,33 2,34 3,34 L10,33 C11,32 13,32 14,31
            L18,29 L18,41 C18,42 18,43 18,44 L5,66 C4,68 4,70 6,70 L6,71 C8,71 9,71 10,70 L25,49 L31,61
            C31,62 32,62 32,63 L44,70 C45,71 47,71 48,69 L48,69 C49,69 49,68 49,67 C49,66 48,65 48,65
            L38,57 L32,41 L33,27 L40,29 L47,36 C48,37 49,37 50,36 L50,36 C51,36 51,34 51,33 Z" />
                <path d="M23,14 C27,15 30,12 31,8 C32,4 29,1 25,0 C21,-1 17,2 17,6 C16,10 19,13 23,14 Z" />
            </g>
        </React.Fragment>
    );
}
