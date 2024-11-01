import MoveTo from "./MoveTo";

/** Like {@link MoveTo}, but rounds pixel positions. */
export default class MoveToRounded extends MoveTo {
	tick(delta: number): boolean {
		const res = MoveTo.prototype.tick.apply(this, [delta]);

		this.target.position.set(
			Math.round(this.target.position.x),
			Math.round(this.target.position.y),
		);

		return res;
	}
}
