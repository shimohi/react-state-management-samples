export const PedestrianSignalStates = {
	Red: "Red",
	Blue: "Blue"
} as const;
export type PedestrianSignalState = typeof PedestrianSignalStates[keyof typeof PedestrianSignalStates];