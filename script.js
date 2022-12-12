let regions = {
    'rфыавфыавфыegion1': {
            sizes: {
                'top' : 150,
                'left' : 480,
                'radius' : 15
            },
            data : {
                 'Classical music' : 10,
                 'Alternative music' : 14,
                 'Pop' : 2,
            }
    },
    'regфафывафion2': {
            sizes: {
                'top' : 300,
                'left' : 333,
                'radius' : 30
            },
            data : {
                 'Classical music' : 10,
                 'Alternative music' : 14,
                 'Pop' : 2,
            }
    },
    '343': {
            sizes: {
                'top' : 480,
                'left' : 650,
                'radius' : 53
            },
            data : {
                 'Classical music' : 18,
                 'Alternative music' : 144,
                 'Pop' : 8,
            }
    }
};

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

        for( let category in this.options.data ) {
            let val = this.options.data[category];
            total_value += val;
        }

        let startAngle = 0;
        let nextAngle = 0;
        let sliceAngle = 0;
        for( let category in this.options.data ) {
            let val = this.options.data[category];
            sliceAngle = 2 * Math.PI * val / total_value;
            if( nextAngle > 0 ) {
                startAngle = nextAngle;
            }
            nextAngle = startAngle + sliceAngle;

            debugger; 
            drawPieslice (
                this.ctx,
                this.options.sizes.left,
                this.options.sizes.top,
                this.options.sizes.radius,
                startAngle,
                nextAngle,
                this.colors[color_index]
            );
            color_index++;
        }
    }
}

debugger;
for(let region in regions) {
    let myPiechart = new PieChart({
        canvas: myCanvas,
        sizes: regions[region].sizes,
        data: regions[region].data,
        colors:['yellow','orange','purple','green']
    });
    myPiechart.draw();
}


