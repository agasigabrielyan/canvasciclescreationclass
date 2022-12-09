class Cicle {
    // создадим метод конструктор
    constructor(xpos, ypos, radius, color) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
    }

    // создадим метод, который рисует
    draw( context ) {
        context.beginPath();
        context.arc( this.xpos, this.ypos, this.radius, 0, Math.PI*2, false );
        context.stroke();
        context.closePath();
    }
}

