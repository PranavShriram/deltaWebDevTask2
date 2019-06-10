class rocks
{
    constructor(x,y,radius,direction,color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
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
        ctx.fillStyle = this.color;
   
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

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = this.radius + 'px Righteous';
        ctx.fillStyle = "white";
        ctx.fillText(Math.floor(this.radius*5), this.x,this.y);
        ctx.closePath();

      }
    collisionDetectionBullet(bulletArray)
    {
         var resArray = [];
         var flag = 0;
            for(var i = 0;i < bulletArray.length;i++)
               {  
                        var px = this.x;
                        var py = this.y;
                        var testX = this.x;
                        var testY = this.y;
                    
                        if (px < bulletArray[i].x)         
                        testX = bulletArray[i].x;      
                        else if (px > bulletArray[i].x+20) testX = bulletArray[i].x+20;  
                        
                        if (py < bulletArray[i].y)         testY = bulletArray[i].y;     
                        else if (py > bulletArray[i].y+20) testY = bulletArray[i].y+20;   
                
                
                    var distX = px-testX;
                    var distY = py-testY;
                    var distance = Math.sqrt( (distX*distX) + (distY*distY) );
                    
                    if (distance <= this.radius) 
                        {
                          flag = 1;
                          resArray.push(i);
                        }
    
            }
            if(flag == 1)
             return resArray;
            else 
             return -1;   
     }
    collisionDetectionCannon(cannon)
    {   
        var flag = 0;
 
    
   
        var px = this.x;
        var py = this.y;
  
      
        var testX = px;
        var testY = py;
  
        if (px < cannon.x)         
        testX = cannon.x;      
        else if (px > cannon.x+50) testX = cannon.x+50;  
        
        if (py < cannon.y-80)         testY = cannon.y-80;     
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