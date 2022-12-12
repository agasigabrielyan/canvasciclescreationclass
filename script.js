let myData = {
 'Classical music' : 10,
 'Alternative music' : 14,
 'Pop' : 2,
 'Jazz' : 12
}

let myCanvas = document.getElementById('myCanvas');

myCanvas.width = 300;
myCanvas.height = 300;

let ctx = myCanvas.getContext('2d');

// рисует линию
function drawLine( ctx, startX, startY, endX, endY ) {
    debugger;
    ctx.beginPath();
    ctx.move( startX, startY );
    ctx.line( endX, endY );
    ctx.stroke();
}

// рисует дугу
function drawArc( ctx, centerX, centerY, radius, startAngle, endAngle ) {
    debugger;
    ctx.beginPath();
    ctx.arc( centerX, centerY, radius, startAngle, startAngle );
    ctx.stroke();
}

// рисует кусок диаграммы
function drawPieslice( ctx, centerX, centerY, radius, startAngle, endAngle, color ) {
    debugger;
     ctx.fillStyle = color;
     ctx.beginPath();
     ctx.moveTo( centerX, centerY );
     ctx.arc( centerX, centerY, radius, startAngle, endAngle );
     ctx.closePath();
     ctx.fill();
}


// создадим класс, который будет отображать нашу диаграмму
let PieChart = function( options ) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.colors = options.colors;

    this.draw = function() {
        var total_value = 0;
        var color_index = 0;

        for( let category in this.options.data ) {
            let val = this.options.data[category];
            total_value += val;
        }

        let startAngle = 0;
        let nextAngle = 0;
        let sliceAngle = 0;
        for( let category in this.options.data ) {
            let val = this.options.data[category];
            debugger;
            sliceAngle = 2 * Math.PI * val / total_value;
            if( nextAngle > 0 ) {
                startAngle = nextAngle;
            }
            nextAngle = startAngle + sliceAngle;

            debugger; 
            drawPieslice (
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                Math.min(this.canvas.width/2, this.canvas.height/2),
                startAngle,
                nextAngle,
                this.colors[color_index]
            );
            color_index++;
        }
    }
}

// чтобы использовать класс, мы должны создать экземпляр, а затем вызвать метод draw() у созданного объекта

var myPiechart = new PieChart(
    {
        canvas: myCanvas,
        data: myData,
        colors:['red','blue','green','orange']
    }
);

myPiechart.draw();



