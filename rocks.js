class rocks
{
    constructor(x,y,radius,direction)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.strength = radius;
        if(direction == "left")
          this.vx = -3;
        else
          this.vx = 3;  
        this.vy = 15;
        this.ay = 0.5;
    }
    draw(ctx,screenWidth,screenHeight)
    {
        ctx.fillStyle = "blue";

       if(this.x < screenWidth) 
        this.vy += this.ay;
        this.y += this.vy;
      
        if(this.y > screenHeight-this.radius-200)
        {
            
            this.vy = -this.vy;
            this.y = screenHeight - this.radius-200; 
        }
        if(this.x + this.vx  <  this.radius || this.x + this.vx +this.radius > screenWidth)
        {
            this.vx = -this.vx;       
         }
         this.x += this.vx;
      
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
    
        ctx.closePath();
    }

    collisionDetection(cannon)
    {   
        var flag = 0;
 
    
   
        var px = this.x;
        var py = this.y;
  
      
        var testX = px;
        var testY = py;
  
        if (px < cannon.x)         
        testX = cannon.x;      
        else if (px > cannon.x+50) testX = cannon.x+50;  
        
        if (py < cannon.y-60)         testY = cannon.y-60;     
        else if (py > cannon.y) testY = cannon.y;   
  
  
       var distX = px-testX;
       var distY = py-testY;
       var distance = Math.sqrt( (distX*distX) + (distY*distY) );
       
       if (distance <= this.radius) 
        {
          flag = 1;
         
        }
  
        //Test collsion detections of circles
        var c1x = cannon.x - 10;
        var c1y =  cannon.y + 10;
        
        distX = c1x - this.x;
        distY = c1y - this.y;
        if(Math.sqrt( (distX*distX) + (distY*distY) ) <= this.radius + 30)
         flag = 1;
  
         var c1x = cannon.x + 60;
         var c1y =  cannon.y + 10;
         
         distX = c1x - this.x;
         distY = c1y - this.y;
         if(Math.sqrt( (distX*distX) + (distY*distY) ) <= this.radius + 30)
          flag = 1; 
          
  
      if(flag == 1)
       return 1;
      return 0; 
    }
}