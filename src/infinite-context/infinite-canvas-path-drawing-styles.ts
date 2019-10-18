import { ViewBox } from "../interfaces/viewbox";

export class InfiniteCanvasPathDrawingStyles implements CanvasPathDrawingStyles{
	constructor(private viewBox: ViewBox){}
	public lineCap: CanvasLineCap;
	public get lineDashOffset(): number{
		return this.viewBox.state.current.lineDashOffset;
	}
	public set lineDashOffset(value: number){
		this.viewBox.changeState(state => state.setLineDashOffset(value));
	}
	public lineJoin: CanvasLineJoin;
	public get lineWidth(): number{
		return this.viewBox.state.current.lineWidth;
	}
	public set lineWidth(value: number){
		this.viewBox.changeState(state => state.setLineWidth(value));
	}
	public miterLimit: number;
	public getLineDash(): number[]{return this.viewBox.state.current.lineDash;}
	public setLineDash(segments: number[]): void{
		this.viewBox.changeState(state => state.setLineDash(segments));
	}
}