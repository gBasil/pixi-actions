import TargetedAction from "./TargetedAction";
import Interpolation from "../Interpolation";
import Interpolations from "../Interpolations";
import type { Target } from "./TargetedAction";

export default class MoveToY extends TargetedAction {
	interpolation: Interpolation;
	startX: number;
	startY: number;
	y: number;

	constructor(
		target: Target,
		y: number,
		seconds: number,
		interpolation: Interpolation = Interpolations.linear
	) {
		super(target, seconds);
		this.interpolation = interpolation;
		this.y = y;
		this.startX = target.x;
		this.startY = target.y;
	}

	tick(delta: number): boolean {
		if (this.time === 0) {
			this.startX = this.target.x;
			this.startY = this.target.y;
		}

		this.time += delta;

		const factor: number = this.interpolation(this.timeDistance);
		this.target.position.y = this.startY + (this.y - this.startY) * factor;
		return this.timeDistance >= 1;
	}

	reset() {
		super.reset();
		this.time = 0;
		return this;
	}
}
