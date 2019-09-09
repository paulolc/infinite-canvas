export class InfiniteCanvasPath implements CanvasPath{
	public arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void{}
	public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void{}
	public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void{}
	public closePath(): void{}
	public ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void{}
	public lineTo(x: number, y: number): void{}
	public moveTo(x: number, y: number): void{}
	public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void{}
	public rect(x: number, y: number, w: number, h: number): void{}
}