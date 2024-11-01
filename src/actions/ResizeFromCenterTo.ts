import TargetedAction from "./TargetedAction";
import Interpolation from "../Interpolation";
import Interpolations from "../Interpolations";
import type { Target } from "./TargetedAction";

export default class ResizeFromCenterTo extends TargetedAction {
	interpolation: Interpolation;
	startW: number;
	startH: number;
	startX: number;
	startY: number;
	w: number;
	h: number;

	constructor(
		target: Target,
		w: number,
		h: number,
		seconds: number,
		interpolation: Interpolation = Interpolations.linear
	) {
		super(target, seconds);
		this.interpolation = interpolation;
		this.w = w;
		this.h = h;
		this.startW = target.width;
		this.startH = target.height;
		this.startX = target.x;
		this.startY = target.y;
	}

	tick(delta: number): boolean {
		if (this.time === 0) {
			this.startW = this.target.width;
			this.startH = this.target.height;
			this.startX = this.target.x;
			this.startY = this.target.y;
		}

		this.time += delta;

		const factor: number = this.interpolation(this.timeDistance);
		this.target.setSize(
			Math.round((this.startW + (this.w - this.startW) * factor) / 2) * 2,
			Math.round((this.startH + (this.h - this.startH) * factor) / 2) * 2,
		);
		this.target.position.set(
			Math.round(this.startX + this.startW/2 - this.target.width/2 ),
			Math.round(this.startY + this.startH/2 - this.target.height/2),
		);
		return this.timeDistance >= 1;
	}

	reset() {
		super.reset();
		this.time = 0;
		return this;
	}
}
