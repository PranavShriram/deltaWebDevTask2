class cannon
{
    constructor(screenWidth,screenHeight)
    {     
          this.width = 130;
          this.height = 100;
          this.x = screenWidth/2-25;
          this.y = screenHeight-200;
    }
    
   draw(ctx)
    {
    
     
    // var ctx = canvas.getContext('2d');

    // ctx.fillStyle = "white";
    // ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#9296a0";
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x,this.y-50);
    ctx.quadraticCurveTo(this.x,this.y-60,this.x+5,this.y-60)
    ctx.lineTo(this.x+25,this.y-60);
    ctx.lineTo(this.x+25,this.y);
    ctx.fill();

    ctx.fillStyle = "#74777c";
    ctx.beginPath();
    ctx.moveTo(this.x+25,this.y);
    ctx.lineTo(this.x+25,this.y-60);
    ctx.lineTo(this.x+45,this.y-60);
    ctx.quadraticCurveTo(this.x+50,this.y-60,this.x+50,this.y-55);
    ctx.lineTo(this.x+50,this.y);
    ctx.fill();

    ctx.fillStyle = "#f9380c";
    ctx.beginPath();
    ctx.moveTo(this.x-10,this.y);
    ctx.lineTo(this.x-10,this.y+10);
    ctx.lineTo(this.x+60,this.y+10);
    ctx.lineTo(this.x+60,this.y);
    ctx.fill();



    ctx.fillStyle =  "black";
    ctx.beginPath();
    ctx.arc(this.x-10,this.y+5,30,0,Math.PI*2,true);
    ctx.arc(this.x-10,this.y+5,25,0,Math.PI*2,true);
    ctx.fill();
    
    //White region
    ctx.fillStyle =  "#f3f6fc";
    ctx.beginPath();
    ctx.arc(this.x-10,this.y+5,25,0,Math.PI*2,true);
    ctx.fill();

    ctx.fillStyle = "#f9380c";
    ctx.beginPath();
    ctx.arc(this.x-10,this.y+5,10,0,Math.PI*2,true);
    ctx.fill();

    ctx.fillStyle =  "black";
    ctx.beginPath();
    ctx.arc(this.x+60,this.y+5,30,0,Math.PI*2,true);
    ctx.arc(this.x+60,this.y+5,25,0,Math.PI*2,true);
    ctx.fill();
    
    //White region
    ctx.fillStyle =  "#f3f6fc";
    ctx.beginPath();
    ctx.arc(this.x+60,this.y+5,25,0,Math.PI*2,true);
    ctx.fill();

    ctx.fillStyle = "#f9380c";
    ctx.beginPath();
    ctx.arc(this.x+60,this.y+5,10,0,Math.PI*2,true);
    ctx.fill();

    //Drawing spokes

    ctx.strokeStyle = "#74777c";
    ctx.save();
    ctx.translate(this.x+60,this.y+5);
    for(var i = 0;i < 12;i++)
    {   
        ctx.moveTo(0,0)
        ctx.lineTo(0,25);
        ctx.stroke();
        ctx.rotate(Math.PI/6);
    }
    ctx.restore();

    ctx.strokeStyle = "#74777c";
    ctx.save();
    ctx.translate(this.x-10,this.y+5);
    for(var i = 0;i < 12;i++)
    {   
        ctx.moveTo(0,0)
        ctx.lineTo(0,25);
        ctx.stroke();
        ctx.rotate(Math.PI/6);
    }
    ctx.restore();
  }           

}