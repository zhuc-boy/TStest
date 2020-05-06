"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvascomponent = /** @class */ (function () {
    function canvascomponent(elementName) {
        // this.mycanvas = document.querySelector(elementName) as HTMLCanvasElement
        this.mycanvas = document.querySelector(elementName);
        this.context = this.mycanvas.getContext("2d");
    }
    return canvascomponent;
}());
var snake = /** @class */ (function (_super) {
    __extends(snake, _super);
    function snake(elementName) {
        var _this = _super.call(this, elementName) || this;
        _this.bodypostion = new Array(3);
        _this.foodarr = new Array();
        _this.restfood = 0;
        _this.canvasheight = parseInt(_this.mycanvas.style.height);
        _this.canvaswidth = parseInt(_this.mycanvas.style.width);
        _this.init();
        _this.bodypostion = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
        _this.restfood = 5;
        _this.createConstfood();
        return _this;
    }
    snake.prototype.init = function () {
        var _this = this;
        document.addEventListener("keydown", function (event) {
            var head = _this.bodypostion[0];
            var newHead;
            switch (event.keyCode) {
                case 37:
                case 65:
                    newHead = {
                        x: head.x - 1,
                        y: head.y
                    };
                    _this.movesnake(newHead);
                    //left
                    break;
                case 38:
                case 87:
                    newHead = {
                        x: head.x,
                        y: head.y + 1
                    };
                    _this.movesnake(newHead);
                    //up
                    break;
                case 39:
                case 68:
                    newHead = {
                        x: head.x + 1,
                        y: head.y
                    };
                    _this.movesnake(newHead);
                    //right
                    break;
                case 40:
                case 83:
                    newHead = {
                        x: head.x,
                        y: head.y - 1
                    };
                    _this.movesnake(newHead);
                    //down
                    break;
            }
        });
    };
    snake.prototype.gotScore = function () {
        return this.bodypostion.length - 3;
    };
    snake.prototype.touchself = function () {
        var head = this.bodypostion[0];
        return this.bodypostion.some(function (data) {
            return (data.x === head.x && data.y === head.y);
        });
    };
    snake.prototype.randomNewFood = function () {
        return {
            x: Math.floor(Math.random() * this.canvaswidth),
            y: Math.floor(Math.random() * this.canvasheight)
        };
    };
    snake.prototype.createConstfood = function () {
        if (this.foodarr.length < 5) {
            var rd_1 = this.randomNewFood();
            if (!this.foodarr.some(function (data) {
                return rd_1.x === data.x && rd_1.y === data.y;
            })) {
                this.foodarr.push(rd_1);
            }
            else {
                this.createConstfood();
            }
        }
    };
    snake.prototype.eat = function () {
        var head = this.bodypostion[0];
        var indexflag = this.foodarr.indexOf(head);
        if (indexflag >= 0) {
            this.foodarr.splice(indexflag, 1);
            this.createConstfood();
        }
    };
    snake.prototype.growsnake = function () {
        var snaketailOne = this.bodypostion[this.bodypostion.length];
        var snaketailTwo = this.bodypostion[this.bodypostion.length - 1];
        var NewTail;
        if (snaketailOne.x - snaketailTwo.x === 0) {
            if (snaketailOne.y - snaketailOne.y === 1) {
                NewTail = {
                    x: snaketailOne.x,
                    y: snaketailOne.y + 1
                };
            }
            else {
                NewTail = {
                    x: snaketailOne.x,
                    y: snaketailTwo.y - 1
                };
            }
        }
        else {
            if (snaketailOne.y - snaketailOne.y === 1) {
                NewTail = {
                    x: snaketailOne.x + 1,
                    y: snaketailOne.y
                };
            }
            else {
                NewTail = {
                    x: snaketailTwo.x - 1,
                    y: snaketailOne.y
                };
            }
        }
        this.bodypostion.push(NewTail);
    };
    snake.prototype.movesnake = function (newhaed) {
        this.bodypostion.unshift(newhaed);
        this.bodypostion.pop();
        console.log(this.bodypostion);
    };
    snake.prototype.rendersnake = function () {
        this.context.clearRect(0, 0, this.canvaswidth, this.canvasheight);
    };
    return snake;
}(canvascomponent));
var truesnake = new snake("#mycanvas");
