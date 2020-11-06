import { StateAndInstruction } from "./state-and-instruction";
import { StateChangingInstructionSetWithArea } from "../interfaces/state-changing-instruction-set-with-area";
import { InfiniteCanvasState } from "../state/infinite-canvas-state";
import { Instruction } from "./instruction";
import { Area } from "../areas/area";
import { CanvasRectangle } from "../rectangle/canvas-rectangle";
export declare class RectangularDrawing extends StateAndInstruction implements StateChangingInstructionSetWithArea {
    area: Area;
    constructor(initialState: InfiniteCanvasState, state: InfiniteCanvasState, instruction: Instruction, combinedInstruction: Instruction, area: Area, rectangle: CanvasRectangle);
    hasDrawingAcrossBorderOf(area: Area): boolean;
    intersects(area: Area): boolean;
    isContainedBy(area: Area): boolean;
    static createDrawing(initialState: InfiniteCanvasState, instruction: Instruction, area: Area, rectangle: CanvasRectangle): RectangularDrawing;
}