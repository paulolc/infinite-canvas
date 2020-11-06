import { StateChangingInstructionSequence } from "./state-changing-instruction-sequence";
import { InfiniteCanvasState } from "../state/infinite-canvas-state";
import { StateChangingInstructionSetWithArea } from "../interfaces/state-changing-instruction-set-with-area";
import { StateAndInstruction } from "./state-and-instruction";
import { Area } from "../areas/area";
import { PartOfDrawing } from "../interfaces/part-of-drawing";
import { CanvasRectangle } from "../rectangle/canvas-rectangle";
export declare class PreviousInstructions extends StateChangingInstructionSequence<StateChangingInstructionSetWithArea> implements PartOfDrawing {
    private readonly rectangle;
    constructor(initiallyWithState: StateAndInstruction, rectangle: CanvasRectangle);
    protected reconstructState(fromState: InfiniteCanvasState, toInstructionSet: StateChangingInstructionSetWithArea): void;
    hasDrawingAcrossBorderOf(area: Area): boolean;
    intersects(area: Area): boolean;
    addClearRect(area: Area, state: InfiniteCanvasState, x: number, y: number, width: number, height: number): void;
    clearContentsInsideArea(area: Area): void;
    isContainedBy(area: Area): boolean;
    static create(rectangle: CanvasRectangle): PreviousInstructions;
}