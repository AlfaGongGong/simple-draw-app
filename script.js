import("C:/Users/Jasa/AppData/Local/Microsoft/TypeScript/5.0/node_modules/@types/color-convert/index");

var Sketch = (function () {
    var Sketch = {
        init: function () {
            this.colorSlider = document.getElementById("color");
            this.sizeSlider = document.getElementById("size");
            this.sizeSpan = document.querySelector("label span");
            this.reset = document.querySelector(".reset");
            this.color = this.colorSlider.value;
            this.size = this.sizeSlider.value;
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.drawing = false;
            this.radius = this.sizeSlider.value / 2;
            this.resizeCanvas();
            this.binding();
        },

        binding: function () {
            this.colorSlider.addEventListener("input", () => this.colorSliderChange());
            this.sizeSlider.addEventListener("input", () => this.sizeSliderChange());
            this.reset.addEventListener("click", () => this.resetClick());
            this.canvas.addEventListener("mousedown", (e) => this.mouseDown(e));
            this.canvas.addEventListener("mousemove", (e) => this.mouseMove(e));
            this.canvas.addEventListener("mouseup", () => this.stop());
        },

        resizeCanvas: function () {
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerWidth;
        },

        clearCanvas: function () {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawing = false;
        },

        resetClick: function () {
            this.clearCanvas();
            this.binding();
        },

        mouseDown: function (e) {
            var rect = this.getBoundingClientRect();
            var x = e.x - rect.left;
            var y = e.y - rect.top;
            this.drawing = true;
            this.draw(x, y);
        },

        mouseMove: function (e) {
            if (this.drawing) {
                var rect = this.getBoundingClientRect();
                var x = e.x - rect.left;
                var y = e.y - rect.top;
                this.draw(x, y);
            }
        },

        stop: function () {
            this.drawing = false;
        },

        draw: function (x, y) {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fill();
        },

        colorSliderChange: function () {
            this.color = this.colorSlider.value;
        },

        sizeSliderChange: function () {
            var value = this.sizeSlider.value;
            this.radius = value / 2;
            this.sizeSpan.innerHTML = value;
            this.size = value;
        },

        hexa: function (num) {
            var convert = require('color-convert');
            var rgb = [r, g, b] = convert.hsl.rgb([num, 50, 50]);
            var hex = convert.rgb.hex(r, g, b);
            return "#" + hex;
        }
    };
    return Sketch;
})();

Sketch.init();
