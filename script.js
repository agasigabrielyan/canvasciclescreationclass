let region = {
    sizes: {
        'top' : '150',
        'left' : '250',
        'radius' : '34'
    },
    data : {
         'Classical music' : 10,
         'Alternative music' : 14,
         'Pop' : 2,
         'Jazz' : 12
    }
}

let region2 = {
    sizes: {
        'top' : '315',
        'left' : '480',
        'radius' : '25'
    },
    data : {
         'Classical music' : 18,
         'Alternative music' : 144,
         'Pop' : 50,
         'Jazz' : 63
    }
}

let myCanvas = document.getElementById('myCanvas');

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

let ctx = myCanvas.getContext('2d');

// рисует линию
function drawLine( ctx, startX, startY, endX, endY ) {
    ctx.beginPath();
    ctx.move( startX, startY );
    ctx.line( endX, endY );
    ctx.stroke();
}

// рисует дугу
function drawArc( ctx, centerX, centerY, radius, startAngle, endAngle ) {
    ctx.beginPath();
    ctx.arc( centerX, centerY, radius, startAngle, startAngle );
    ctx.stroke();
}

// рисует кусок диаграммы
function drawPieslice( ctx, centerX, centerY, radius, startAngle, endAngle, color ) {
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
        let total_value = 0;
        let color_index = 0;

        for( let category in this.options.data.data ) {
            let val = this.options.data.data[category];
            total_value += val;
        }

        let startAngle = 0;
        let nextAngle = 0;
        let sliceAngle = 0;
        for( let category in this.options.data.data ) {
            let val = this.options.data.data[category];
            sliceAngle = 2 * Math.PI * val / total_value;
            if( nextAngle > 0 ) {
                startAngle = nextAngle;
            }
            nextAngle = startAngle + sliceAngle;

            debugger; 
            drawPieslice (
                this.ctx,
                this.options.data.sizes.left,
                this.options.data.sizes.top,
                this.options.data.sizes.radius,
                startAngle,
                nextAngle,
                this.colors[color_index]
            );
            color_index++;
        }
    }
}

// создадим экземпляр класса и вызовем метод draw этого класса
let myPiechart = new PieChart({
        canvas: myCanvas,
        data: region,
        colors:['red','blue','green','orange']
});
let myPierchat2 = new PieChart({
    canvas: myCanvas,
    data: region2,
    colors:['yellow','orange','purple','green']
});

myPiechart.draw();
myPierchat2.draw();



