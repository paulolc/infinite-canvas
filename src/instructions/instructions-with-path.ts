import { Rectangle } from "../rectangle";
import { InfiniteCanvasState } from "../state/infinite-canvas-state";
import { Instruction } from "./instruction";
import { InfiniteCanvasStateInstance } from "../state/infinite-canvas-state-instance";
import { StateChange } from "../state/state-change";
import { Transformation } from "../transformation";
import { InfiniteCanvasStateAndInstruction } from "./infinite-canvas-state-and-instruction";
import { PathInstruction } from "../interfaces/path-instruction";
import { StateChangingInstructionSetWithAreaAndCurrentPathAndCurrentState } from "../interfaces/state-changing-instruction-set-with-area-and-current-path";
import { StateChangingInstructionSet } from "../interfaces/state-changing-instruction-set";
import { StateChangingInstructionSetWithCurrentState } from "../interfaces/state-changing-instruction-set-with-current-state";

export class InstructionsWithPath implements StateChangingInstructionSetWithAreaAndCurrentPathAndCurrentState{
    public area: Rectangle;
    private currentlyWithState: StateChangingInstructionSetWithCurrentState;
    private previouslyWithState: StateChangingInstructionSet[] = [];
    public get state(): InfiniteCanvasState{return this.currentlyWithState.state;}
    constructor(public initialState: InfiniteCanvasState){
        this.currentlyWithState = new InfiniteCanvasStateAndInstruction(initialState, (context: CanvasRenderingContext2D) => {context.beginPath();});
    }

    private replaceCurrentlyWithState(newInstruction: Instruction): void{
        this.previouslyWithState.push(this.currentlyWithState);
        this.currentlyWithState = new InfiniteCanvasStateAndInstruction(this.currentlyWithState.state, newInstruction);
    }
    public drawPath(instruction: Instruction): void{
        this.replaceCurrentlyWithState(instruction);
    }
    public addPathInstruction(pathInstruction: PathInstruction): void{
        this.area = pathInstruction.changeArea.execute(this.state.current.transformation, this.area);
        this.replaceCurrentlyWithState(pathInstruction.instruction);
    }
    public changeState(change: (state: InfiniteCanvasStateInstance) => StateChange<InfiniteCanvasStateInstance>): void{
        this.currentlyWithState.changeState(change);
    }
    public saveState(): void{
        this.currentlyWithState.saveState();
    }
    public restoreState(): void{
        this.currentlyWithState.restoreState();
    }
    public changeToState(state: InfiniteCanvasState): void{
        this.currentlyWithState.changeToState(state);
    }
    public execute(context: CanvasRenderingContext2D, transformation: Transformation){
        for(const previouslyWithState of this.previouslyWithState){
            previouslyWithState.execute(context, transformation);
        }
        this.currentlyWithState.execute(context, transformation);
    }
    public static create(initialState: InfiniteCanvasState, pathInstructions?: PathInstruction[]): InstructionsWithPath{
        const result: InstructionsWithPath = new InstructionsWithPath(initialState);
        if(!pathInstructions){
            return result;
        }
        for(const pathInstruction of pathInstructions){
            result.addPathInstruction(pathInstruction);
        }
        return result;
    }
}