var Sketch = (function () {
    var Sketch = {
        init: function () {
            this.colorSlider = document.getElementById("color");
            this.sizeSlider = document.getElementById("size");
            this.sizeSpan = document.querySelector("label span");
            this.colorbox = document.querySelector(".colorbox");
            this.reset = document.querySelector(".reset");
            this.color = this.color || 'hsla(180, 50%, 50%, 1)';
            this.canvas = document.querySelector("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.drawing = false;
            this.radius = this.sizeSlider.value / 2;
            this.resizeCanvas();
            this.binding();
        },

        binding: function () {
            this.colorSlider.addEventListener("change", this.colorSliderChange);
            this.sizeSlider.addEventListener("change", this.sizeSliderChange);
            this.reset.addEventListener("click", this.resetClick.bind(this));
            this.canvas.onmousedown = this.mouseDown;
            this.canvas.onmousemove = this.mouseMove;
            // this.canvas.onmouseup = this.stop.bind(this); // added to window
            window.addEventListener("mouseup", this.stop.bind(this));
            window.addEventListener("resize", this.resizeCanvas.bind(this));

        },

        resizeCanvas: function () {
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerWidth;
        },

        clearCanvas: function () {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        },

        resetClick: function () {
            this.clearCanvas();

        },

        mouseDown: function (e) {
            var s = Sketch;
            s.drawing = true;
            var rect = this.getBoundingClientRect();
            var x = e.x - rect.left;
            var y = e.y - rect.top;
            if (s.drawing) {
                s.draw(x, y);
            }
        },

        mouseMove: function (e) {
            var s = Sketch;
            var rect = this.getBoundingClientRect();
            var x = e.x - rect.left;
            var y = e.y - rect.top;
            if (s.drawing) {
                s.draw(x, y);
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
            var that = Sketch;
            that.color = that.hsla(this.value)
            that.colorbox.style.background = that.color;
        },

        sizeSliderChange: function () {
            var that = Sketch;
            var value = this.value;
            that.radius = value / 2;
            that.sizeSpan.innerHTML = value;
        },

        hsla: function (num) {
            return "hsla(" + num + ", 50%, 50%, 1)";
        }

    }

    Sketch.init();

})();