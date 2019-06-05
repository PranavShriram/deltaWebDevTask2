class bullets
{
    constructor(x,y,speed,radius)
    {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
    }
    draw(ctx)
    {    
        this.y -= this.speed;
        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
        console.log("drew");
        ctx.closePath();
    }

    //Collision detection of bullet with rock
    
    collisionDetection(rockArray)
    {
              for(var i = 0;i < rockArray.length;i++)
              {
                  var dist = Math.sqrt((rockArray[i].x - this.x)*(rockArray[i].x - this.x) + (rockArray[i].y - this.y)*(rockArray[i].y - this.y));

                  if(dist <= this.radius + rockArray[i].radius)
                  {
                      return i;
                  }
              }
              return -1;
    }
}