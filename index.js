


// Load an image of intrinsic size 300x227 in CSS pixels

function loadImage(url)
{
    return new Promise(resolve =>
        {
            const image = new Image(1000, 1000);
            image.addEventListener('load',() => {
                resolve(image);
            });
            image.src = url;
        });
}
loadImage('./assets/background.jpg').then( image =>{
                
            var left = false;
            var right = false;
            var rockArray = [];
            var bulletArray = [];
            var player = "Pranav";
            
            if(localStorage.getItem("leaderboardArray"))
            {
                var leaderboardArray =JSON.parse(localStorage.getItem("leaderboardArray"));
            }
            else
            {
                var leaderboardArray = [];
            }
            //=========================================================================
            //EVENT HANLDERS
            //=========================================================================
            function keyDownListener(e)
            {   
                console.log(e.keyCode);
                if(e.keyCode == 37)
                {
                    left = true;
                
                }
                if(e.keyCode == 39)
                {
                    right = true;   
                }
            }

            function keyUpListener(e)
            {  
                console.log(e.keyCode);
                if(e.keyCode == 37)
                {   
                    left = false;   
                }
                if(e.keyCode == 39)
                { 
                    right = false;
                }   
                    
            }

            function pauseEventHandler()
            {
                game1.state = "pause";
            }

            function playEventHandler()
            {
                game1.state = "play";
            }


            //==============================================================================
            //Draw animation
            //==============================================================================
            draw = setInterval(function()
            { 
            ctx.drawImage(image, 0, 0, image.width, image.height);     
            if(game1.state == "play")
                {      


                            if(left == true)
                                cannon1.x -= 20;
                            if(right == true)
                                cannon1.x += 20;  
                            cannon1.draw(ctx);

                        // ctx.fillStyle = "black";
                        // ctx.fillRect(0,0,canvas.width,canvas.height);
                        
                        game1.time ++;
                        game1.bulletTime++;
                        
                        if(game1.time % 5 == 0) 
                            {  
                                game1.bulletRate += 1;
                                game1.bulletTime = 0;
                            } 
                        if(game1.time % 10 == 0)
                        {  
                           leaderboardArray.push({name:player,score:game1.score});
                           game1.score++;

                        game_scorecard_score.textContent = game1.score;
                        if(game1.time % 500 === 0 || game1.time ==1)
                        {
                            var rock1 = new rocks(900,500,100,"left");
                            rockArray.push(rock1);
                        }
                        if(game1.bulletTime % game1.bulletRate === 0)
                        {
                            var bullet1 = new bullets(cannon1.x+25,cannon1.y-60,6,10);
                            bulletArray.push(bullet1);
                        }

                        for(var i = 0;i < bulletArray.length;i++)
                        {   
                            if(bulletArray[i].y < 0)
                            bulletArray.splice(i,1);
                            else 
                            bulletArray[i].draw(ctx);

                        }

                        for(var  i = 0;i < rockArray.length;i++)
                        {   
                            if(rockArray[i].radius  <= 0)
                            {   
                               if(rockArray[i].strength/2 > 20)
                               { 
                                 rockArray.push(new rocks(rockArray[i].x-10,rockArray[i].y+10,rockArray[i].strength/2,"left"));
                                 rockArray.push(new rocks(rockArray[i].x+10,rockArray[i].y+10,rockArray[i].strength/2,"right"));
                                 rockArray.splice(i,1);
                                 game1.score += 100;
                               }
                               else
                               {
                                rockArray.splice(i,1);
                                game1.score += 100;
                               } 
                            }   
                            else 
                            rockArray[i].draw(ctx,canvas.width,canvas.height);
                        }
                        

                        //Collision detection of bullet with rock

                        for(var i = 0;i < bulletArray.length;i++)
                        {
                            if(bulletArray[i].collisionDetection(rockArray) >= 0)
                            {
                                
                                rockArray[bulletArray[i].collisionDetection(rockArray)].radius -= 5;
                                bulletArray.splice(i,1);
                            }
                        }

                        //Collision detection of rock with cannon

                        for(var i = 0;i < rockArray.length;i++)
                        {
                            if(rockArray[i].collisionDetection(cannon1))
                            {
                                clearInterval(draw);
                            }
                        }
                }        

            },1000/50);









            var canvas = document.querySelector('.game-container__game-canvas');
            var pauseButton = document.querySelector('.game-container__game-sidebar__button-set__pause');
            var playButton = document.querySelector('.game-container__game-sidebar__button-set__play'); 
            var game_scorecard_score = document.querySelector('.game-container__game-sidebar__scorecard__score')


            canvas.width = 1000;   
            canvas.height = 1000;






            var ctx = canvas.getContext('2d');
            ctx.fillRect(0,0,canvas.width,canvas.height);


            //Declaring new cannon
            var cannon1 = new cannon(canvas.width,canvas.height);

            //Adding event listeners

            document.addEventListener("keydown",keyDownListener);
            document.addEventListener("keyup",keyUpListener);
            pauseButton.addEventListener("click",pauseEventHandler);
            playButton.addEventListener("click",playEventHandler);


            //Creating new game
            var game1  = new game();
 });
