export class CanvasContextMock{
    public mock: any;
    private logs: string[];
    constructor(){
        const self: CanvasContextMock = this;
        this.logs = [];
        let linearGradientId: number = 0;
        let radialGradientId: number = 0;
        const methods: string[] = [
            "setLineDash",
            "clearRect",
            "fillRect",
            "setTransform",
            "transform",
            "beginPath",
            "moveTo",
            "lineTo",
            "closePath",
            "fill",
            "save",
            "restore",
            "stroke",
            "clip"
        ];
        const setters: string[] = [
            "fillStyle",
            "strokeStyle",
            "lineWidth",
            "lineDashOffset"
        ];
        this.mock = {};
        for(const methodName of methods){
            this.mock[methodName] = function(...args: any){
                self.logMethod(methodName, ...args);
            };
        }
        this.mock.createLinearGradient = function(...args: any){
            self.logMethod("createLinearGradient", ...args);
            const returnValue: string  = `[linear-gradient-${linearGradientId++}]`;
            self.logs.push(`=> ${returnValue}`);
            return returnValue;
        };
        this.mock.createRadialGradient = function(...args: any){
            self.logMethod("createRadialGradient", ...args);
            const returnValue: string  = `[radial-gradient-${radialGradientId++}]`;
            self.logs.push(`=> ${returnValue}`);
            return returnValue;
        };
        for(const setter of setters){
            Object.defineProperty(this.mock, setter, {
                set:function(value: any){
                    self.logSetter(setter, value);
                },
                configurable:true
            });
        }
    }
    private logMethod(methodName: string, ...args: any){
        this.logs.push(`context.${methodName}(${args.map((x: any) => JSON.stringify(x)).join(',')})`);
    }
    private logSetter(propertyName: string, value: any){
        this.logs.push(`context.${propertyName} = ${JSON.stringify(value)}`)
    }
    public clear(){
        this.logs = [];
    }
    public getLog(): string[]{
        return this.logs.slice();
    }
}