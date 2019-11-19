import { Rectangle } from "../rectangle";
import { InfiniteCanvasState } from "../state/infinite-canvas-state";
import { StateChangingInstructionSetWithCurrentStateAndArea } from "../interfaces/state-changing-instruction-set-with-current-state-and-area";
import { StateAndInstruction } from "./state-and-instruction";
import {Instruction} from "./instruction";

export class ClearRectWithState extends StateAndInstruction implements StateChangingInstructionSetWithCurrentStateAndArea{
    constructor(initialState: InfiniteCanvasState, public area: Rectangle, stateChangeInstruction: Instruction, currentState: InfiniteCanvasState, initialStateChangeInstruction: Instruction, stateForInstruction: InfiniteCanvasState){
        super(initialState, area.getInstructionToClear().instruction, stateChangeInstruction, currentState, initialStateChangeInstruction, stateForInstruction);
    }
    public hasDrawingAcrossBorderOf(area: Rectangle): boolean{
        return false;
    }
    public intersects(area: Rectangle): boolean{
        return this.area.intersects(area);
    }
    public isContainedBy(area: Rectangle): boolean {
        return area.contains(this.area);
    }
    public static create(initialState: InfiniteCanvasState, area: Rectangle): ClearRectWithState{
        return new ClearRectWithState(initialState, area, undefined, initialState, undefined, initialState);
    }
}