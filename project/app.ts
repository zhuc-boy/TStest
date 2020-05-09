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
    bodypostion: postion[] = new Array()
    foodarr: postion[] = new Array()
    canvaswidth: number
    canvasheight: number
    defailtDr: number
    constructor(elementName: string) {
        super(elementName)
        this.canvasheight = this.mycanvas.clientHeight
        this.canvaswidth = this.mycanvas.clientWidth
        this.bodypostion = [{ x: 6, y: 1 }, { x: 5, y: 1 }, { x: 4, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }]
        this.defailtDr = 0
        this.createConstfood()
        this.init()
        this.rendersnake = this.rendersnake.bind(this)
        this.rendersnake()
        // this.defailtmove = this.defailtmove.bind(this)
        // this.defailtmove()
    }
    Func = (e: KeyboardEvent) => {
        this.eat()
        let head: postion = this.bodypostion[0]
        let newHead: postion
        switch (e.keyCode) {
            case 37:
            case 65:
                newHead = {
                    x: head.x - 1,
                    y: head.y
                }
                this.defailtDr = 65
                this.movesnake(newHead)
                //left
                break;
            case 38:
            case 87:
                newHead = {
                    x: head.x,
                    y: head.y - 1
                }
                this.defailtDr = 87
                this.movesnake(newHead)
                //up
                break;
            case 39:
            case 68:
                newHead = {
                    x: head.x + 1,
                    y: head.y
                }
                this.defailtDr = 68
                this.movesnake(newHead)
                //right
                break;
            case 40:
            case 83:
                newHead = {
                    x: head.x,
                    y: head.y + 1
                }
                this.defailtDr = 83
                this.movesnake(newHead)
                //down
                break;
        }
        this.rendersnake()
        if (this.touchself()) {
            alert('碰触到自己')
        }
    }
    init(): void {
        document.addEventListener("keydown", this.Func)
    }
    gotScore(): number {
        return this.bodypostion.length - 3
    }
    touchself(): boolean {
        let head = this.bodypostion[0]
        let snakebody = this.bodypostion.slice(1)
        return snakebody.some(data => {
            return (data.x === head.x && data.y === head.y)
        })
    }
    randomNewFood(): postion {
        return {
            x: Math.floor(Math.random() * (this.canvaswidth / 5)),
            y: Math.floor(Math.random() * (this.canvasheight / 5))
        }
    }
    createConstfood(): void {
        if (this.foodarr.length < 1) {
            let rd = this.randomNewFood()
            if (!this.bodypostion.some(data => {
                return data.x === rd.x && data.y === rd.y
            })) {
                this.foodarr.push(rd)
            } else {
                this.createConstfood()
            }
        }
    }
    eat(): void {
        let head = this.bodypostion[0]
        if (this.foodarr[0].x === head.x && this.foodarr[0].y === head.y) {
            this.foodarr.splice(0, 1)
            this.createConstfood()
            this.growsnake()
            this.gotScore()
        }
    }
    growsnake(): void {
        let snaketailOne: postion = this.bodypostion[this.bodypostion.length - 1]
        let snaketailTwo: postion = this.bodypostion[this.bodypostion.length - 2]
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
    // defailtmove = (): void => {
    //     let head: postion = this.bodypostion[0]
    //     let newHead: postion
    //     let temparr: postion[]
    //     switch (this.defailtDr) {
    //         case 37:
    //         case 65:
    //             temparr = this.bodypostion.map(data => {
    //                 return {
    //                     x: data.x - 1 / 60,
    //                     y: data.y
    //                 }
    //             })
    //             this.bodypostion = temparr
    //             //left
    //             break;
    //         case 38:
    //         case 87:
    //             temparr = this.bodypostion.map(data => {
    //                 return {
    //                     x: data.x,
    //                     y: data.y - 1 / 60
    //                 }
    //             })
    //             this.bodypostion = temparr
    //             //up
    //             break;
    //         case 39:
    //         case 68:
    //             temparr = this.bodypostion.map(data => {
    //                 return {
    //                     x: data.x + 1 / 60,
    //                     y: data.y
    //                 }
    //             })
    //             this.bodypostion = temparr
    //             //right
    //             break;
    //         case 40:
    //         case 83:
    //             temparr = this.bodypostion.map(data => {
    //                 return {
    //                     x: data.x,
    //                     y: data.y + 1 / 60
    //                 }
    //             })
    //             this.bodypostion = temparr
    //             //down
    //             break;
    //         default:
    //             temparr = this.bodypostion.map(data => {
    //                 return {
    //                     x: data.x + 1 / 60,
    //                     y: data.y
    //                 }
    //             })
    //             this.bodypostion = temparr
    //             //right
    //             break;
    //     }
    //     this.rendersnake()
    //     setInterval(this.defailtmove, 500)
    //     // window.requestAnimationFrame(this.defailtmove)
    // }
    movesnake(newhaed: postion): void {
        this.bodypostion.unshift(newhaed)
        this.bodypostion.pop()
    }
    rendersnake = (): void => {
        this.context.clearRect(0, 0, this.canvaswidth, this.canvasheight)
        this.context.beginPath()
        this.context.fillStyle = "red"
        this.context.fillRect(5 * this.foodarr[0].x - 5, 5 * this.foodarr[0].y - 5, 5, 5)
        this.context.fillStyle = "#000"
        this.bodypostion.map((data, index) => {
            if (index === 0) {
                this.context.fillRect(5 * data.x - 5, 5 * data.y - 5, 5, 5)
            } else {
                this.context.fillRect(5 * data.x - 4.5, 5 * data.y - 4.5, 4, 4)
            }
        })
        
        
        this.context.stroke()
        // window.requestAnimationFrame(this.rendersnake)
    }
}
let truesnake = new snake("#mycanvas")
