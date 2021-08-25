 //adicionando um componente; ou mais componentes;
 let GamePiece, myObstacle; //redGamePiece, yellowGamePiece;

 let myObstacles = [];

 let myScore;
 

// A função startGame()invoca o método start()do myGameAreaobjeto.
//O start()método cria um <canvas>elemento e o insere como o primeiro childnode do <body>elemento.
function startGame(){
    GamePiece = new component(20, 20, "#e83a23", 10, 120);   //alterando o tamanho;

    myScore = new component("30px", "Consolas", "black", 280, 40, "text");

    myGameArea.start();
    
    //myObstacle = new component(15, 200, "#e83a23", 300, 120);
    //redGamePiece = new component(20, 20, "#e83a23", 10, 80);
    //yellowGamePiece = new component(10, 10, "#d3d627", 10, 50);
    
    
}


//criação da área de jogo.
const myGameArea = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, 
    //acertar o obstáculo
    stop : function() {
        clearInterval(this.interval);
    }
}






//Função para adicionar um componente;

function component(width, height, color, x, y, type){

    this.type = type;
    
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function (){
        ctx = myGameArea.context;
        if (this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }       
        
    }


    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }   

    // Funcao de contato
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y;
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || 
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    
    
}

//Os componentes têm propriedades e métodos para controlar suas aparências e movimentos.

//Molduras
function updateGameArea(){
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (let i = 0; i < myObstacles.length; i += 1){
        if (GamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;        
        }    
    } 

        myGameArea.clear(); // Aqui apaga o quadrado anterior, sem isso ele vai alongando;
        myGameArea.frameNo += 1;

        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;

            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1) + minHeight);

            minGap = 20;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap - minGap + 1) + minGap);

            myObstacles.push(new component(10, height, "green", x, 0));
            myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));




            y = myGameArea.canvas.height - 200;
            //myObstacles.push(new component(15, 200, "#e83a23", x, y ));
        }
        for (let i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].speedX = -1;
            myObstacles[i].newPos();
            myObstacles[i].update();
        }

        myScore.text = 'SCORE: ' + myGameArea.frameNo;
        myScore.update();


        //myObstacle.x += -1;
        GamePiece.newPos();
        GamePiece.update();
        //myObstacle.update();
    
    

    //GamePiece.x += 1;//Faça-o se mover
    //GamePiece.y -= 1;
    //redGamePiece.x += 1;
    //redGamePiece.y += 1;
    //yellowGamePiece.x += 1;
    //yellowGamePiece.y += 1;

    //GamePiece.update();
    //redGamePiece.update();
    //yellowGamePiece.update();   
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}


//Controlar a peça por botão;
function moveup(){
    GamePiece.speedY = -1;
}

function movedown(){
    GamePiece.speedY = 1;
}

function moveleft(){
    GamePiece.speedX = -1;
}

function moveright(){
    GamePiece.speedX = 1;
}

function clearmove() {
    GamePiece.speedX = 0;
    GamePiece.speedY = 0;
}











