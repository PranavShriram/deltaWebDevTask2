class bullets
{
    constructor(x,y,speed)
    {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    draw(ctx,bulletImage)
    {    
        this.y -= this.speed;
        ctx.fillStyle = "black";
        ctx.beginPath();
        //ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.drawImage(bulletImage,this.x,this.y,20,20);
        ctx.fill();
        ctx.closePath();
    }

    //Collision detection of bullet with rock
    
    // collisionDetection(rock)
    // {
            //   for(var i = 0;i < rockArray.length;i++)
            //   {
            //       var dist = Math.sqrt((rockArray[i].x - this.x)*(rockArray[i].x - this.x) + (rockArray[i].y - this.y)*(rockArray[i].y - this.y));

            //       if(dist <= this.radius + rockArray[i].radius)
            //       {
            //           return i;
            //       }
            //   }
            //   return -1;

    //         for(var i = 0;i < rockArray.length;i++)
    //            {  
    //                     var px = rockArray[i].x;
    //                     var py = rockArray[i].y;
    //                     var testX = rockArray[i].x;
    //                     var testY = rockArray[i].y;
                    
    //                     if (px < this.x)         
    //                     testX = this.x;      
    //                     else if (px > this.x+20) testX = this.x+20;  
                        
    //                     if (py < this.y-20)         testY = this.y-20;     
    //                     else if (py > this.y) testY = this.y;   
                
                
    //                 var distX = px-testX;
    //                 var distY = py-testY;
    //                 var distance = Math.sqrt( (distX*distX) + (distY*distY) );
                    
    //                 if (distance <= rockArray[i].radius) 
    //                     {
    //                       flag = 1;
    //                     }
    //            }        
    // }
}