class cannon
{
    constructor(screenWidth,screenHeight)
    {     
          this.width = 130;
          this.height = 100;
          this.x = screenWidth/2-25;
          this.y = screenHeight-200;
          this.spokesAngle = 0;
    }
    
   draw(ctx,canvasWidth)
    {
      
      if(this.x-40 < 0)
       this.x = 40;
      if(this.x + 90 > canvasWidth) 
       this.x = canvasWidth-90;  

    ctx.fillStyle = "#74777c";
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x,this.y-80);
    ctx.bezierCurveTo(this.x,this.y-75,this.x+50,this.y-75,this.x+25,this.y-75);
    ctx.lineTo(this.x+25,this.y-75);
    ctx.lineTo(this.x+25,this.y);
    ctx.fill();

    ctx.fillStyle = "#56595e";
    ctx.beginPath();
    ctx.moveTo(this.x+25,this.y);
    ctx.lineTo(this.x+25,this.y-75); 
    ctx.bezierCurveTo(this.x,this.y-75,this.x+50,this.y-75,this.x+50,this.y-80);
    ctx.lineTo(this.x+50,this.y);
    ctx.fill();
   

    //Orange strip
    ctx.fillStyle = "#f9380c";
    ctx.beginPath();
    ctx.moveTo(this.x-10,this.y);
    ctx.lineTo(this.x-10,this.y+10);
    ctx.lineTo(this.x+60,this.y+10);
    ctx.lineTo(this.x+60,this.y);
    ctx.fill();
    
    //Middle strip
    ctx.fillStyle = "#6e7075";
    ctx.beginPath();
    ctx.moveTo(this.x,this.y-30);
    ctx.lineTo(this.x,this.y-28);
    ctx.lineTo(this.x+50,this.y-28);
    ctx.lineTo(this.x+50,this.y-30);
    ctx.fill();

    ctx.fillStyle = "#5e5e63";
    ctx.beginPath();
    ctx.moveTo(this.x,this.y-28);
    ctx.lineTo(this.x,this.y-26);
    ctx.lineTo(this.x+50,this.y-26);
    ctx.lineTo(this.x+50,this.y-28);
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

    ctx.fillStyle = "#74777c";
    ctx.save();
    ctx.translate(this.x-10,this.y+5);
    ctx.rotate(this.spokesAngle)

     for(var i = 0;i < 8;i++)
     {   
        ctx.beginPath();
        ctx.moveTo(0,0);
        
        ctx.arc(0,0,25,0,Math.PI/12,false);
        ctx.lineTo(0,0);

      //  ctx.lineTo(0,25);
        ctx.fill();
        ctx.closePath();
        ctx.rotate(Math.PI/4);
    }
    ctx.restore();


    ctx.fillStyle = "#74777c";
    ctx.save();
    ctx.translate(this.x+60,this.y+5);
    ctx.rotate(this.spokesAngle)

     for(var i = 0;i < 8;i++)
     {   
        ctx.beginPath();
        ctx.moveTo(0,0);
        
        ctx.arc(0,0,25,0,Math.PI/12,false);
        ctx.lineTo(0,0);

      //  ctx.lineTo(0,25);
        ctx.fill();
        ctx.closePath();
        ctx.rotate(Math.PI/4);
    }
    ctx.restore();

  }           

}