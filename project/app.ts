interface canvasSize {
    height: number
    width: number
}

abstract class canvascomponent {
    mycanvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    constructor(elementName: string) {
        // this.mycanvas = document.querySelector(elementName) as HTMLCanvasElement
        this.mycanvas = <HTMLCanvasElement>document.querySelector(elementName)
        this.context = <CanvasRenderingContext2D>this.mycanvas.getContext("2d")
    }
    abstract init(): void
}

interface postion {
    x: number;
    y: number;
}

class snake extends canvascomponent {
    bodypostion: postion[] = new Array(3)
    foodarr: postion[] = new Array()
    restfood: number = 0
    canvaswidth: number
    canvasheight: number
    constructor(elementName: string) {
        super(elementName)
        this.canvasheight = parseInt(this.mycanvas.style.height)
        this.canvaswidth = parseInt(this.mycanvas.style.width)
        this.init()
        this.bodypostion = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }]
        this.restfood = 5
        this.createConstfood()
    }
    init(): void {
        document.addEventListener("keydown", (event) => {
            let head: postion = this.bodypostion[0]
            let newHead: postion
            switch (event.keyCode) {
                case 37:
                case 65:
                    newHead = {
                        x: head.x - 1,
                        y: head.y
                    }
                    this.movesnake(newHead)
                    //left
                    break;
                case 38:
                case 87:
                    newHead = {
                        x: head.x,
                        y: head.y + 1
                    }
                    this.movesnake(newHead)
                    //up
                    break;
                case 39:
                case 68:
                    newHead = {
                        x: head.x + 1,
                        y: head.y
                    }
                    this.movesnake(newHead)
                    //right
                    break;
                case 40:
                case 83:
                    newHead = {
                        x: head.x,
                        y: head.y - 1
                    }
                    this.movesnake(newHead)
                    //down
                    break;
            }
        })
        window.requestAnimationFrame(this.rendersnake)
    }
    gotScore(): number {
        return this.bodypostion.length - 3
    }
    touchself(): boolean {
        let head = this.bodypostion[0]
        return this.bodypostion.some(data => {
            return (data.x === head.x && data.y === head.y)
        })
    }
    randomNewFood(): postion {
        return {
            x: Math.floor(Math.random() * this.canvaswidth),
            y: Math.floor(Math.random() * this.canvasheight)
        }
    }
    createConstfood(): void {
        if (this.foodarr.length < 5) {
            let rd = this.randomNewFood()
            if (!this.foodarr.some(data => {
                return rd.x === data.x && rd.y === data.y
            })) {
                this.foodarr.push(rd)
            } else {
                this.createConstfood()
            }
        }
    }
    eat(): void {
        let head = this.bodypostion[0]
        let indexflag: number = this.foodarr.indexOf(head)
        if (indexflag >= 0) {
            this.foodarr.splice(indexflag, 1)
            this.createConstfood()
            this.growsnake()
        }
    }
    growsnake(): void {
        let snaketailOne: postion = this.bodypostion[this.bodypostion.length]
        let snaketailTwo: postion = this.bodypostion[this.bodypostion.length - 1]
        let NewTail: postion
        if (snaketailOne.x - snaketailTwo.x === 0) {
            if (snaketailOne.y - snaketailOne.y === 1) {
                NewTail = {
                    x: snaketailOne.x,
                    y: snaketailOne.y + 1
                };
            } else {
                NewTail = {
                    x: snaketailOne.x,
                    y: snaketailTwo.y - 1
                }
            }
        } else {
            if (snaketailOne.y - snaketailOne.y === 1) {
                NewTail = {
                    x: snaketailOne.x + 1,
                    y: snaketailOne.y
                }
            } else {
                NewTail = {
                    x: snaketailTwo.x - 1,
                    y: snaketailOne.y
                }
            }
        }
        this.bodypostion.push(NewTail)
    }
    movesnake(newhaed: postion): void {
        this.bodypostion.unshift(newhaed)
        this.bodypostion.pop()
        console.log(this.bodypostion)
    }
    rendersnake(): void {
        this.context.clearRect(0, 0, this.canvaswidth, this.canvasheight)
        this.context.beginPath()
        this.context.lineWidth = 0
        this.context.fillStyle = "#000"
        this.context.strokeStyle="#000"
        this.bodypostion.map((data,index)=>{
            if(index===0){
                this.context.strokeRect(5*data.x-5,5*data.y-5,5,5)
            }else{
                this.context.strokeRect(5*data.x-4.5,5*data.y-4.5,4,4)
            }
        })
        this.context.stroke()
    }
}
let truesnake = new snake("#mycanvas")

