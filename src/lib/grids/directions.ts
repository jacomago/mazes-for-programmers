export enum Direction {
	North,
	South,
	East,
	West
}

export const standard_directions = [
	Direction.North,
	Direction.West,
	Direction.South,
	Direction.East
];

export const default_weights = new Map([
	[Direction.North, 0.25],
	[Direction.East, 0.25],
	[Direction.South, 0.25],
	[Direction.West, 0.25]
]);
