

window.onload = function() {
}
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
       

      function initialiseGame(name)
      {    
        document.getElementById("my_audio").play();

            var left = false;
            var right = false;
            var rockArray = [];
            var bulletArray = [];
            var currentPlayer = {name:name,score:0};
            var colorSet = ["#4cd137","#fbc531","#487eb0","#e84118","#00a8ff"];
            var rockDirection = 0;
            
            if(localStorage.getItem("leaderboardArray"))
            {
                var leaderboardArray1 = JSON.parse(localStorage.getItem("leaderboardArray"));
                leaderboardArray1.splice(9,leaderboardArray1.length);
                leaderboardArray1.push(currentPlayer);
            }
            else
            {
                var leaderboardArray1 = [];
                leaderboardArray1.push(currentPlayer)
            }
            //=========================================================================
            //EVENT HANLDERS
            //=========================================================================
          
          
            function keyDownListener(e)
            {   
                if(e.keyCode == 37 || e.keyCode == 65)
                {
                    left = true;
                
                }
                if(e.keyCode == 39 || e.keyCode == 68 )
                {
                    right = true;   
                }
            }

            function keyUpListener(e)
            {  
                if(e.keyCode == 37 || e.keyCode == 65)
                {   
                    left = false;   
                }
                if(e.keyCode == 39 || e.keyCode == 68)
                { 
                    right = false;
                }   
                    
            }

           function gameStateEventHandler(e)
           {
               if(game1.state == "pause")
                {
                    game1.state = "play";
                    e.target.setAttribute("src","./assets/pause.svg")
                }    
               else
                {
                    game1.state = "pause" 
                    e.target.setAttribute("src","./assets/play.svg")
                }
           }
            
            function renderLeaderboard(leaderboardArray1)
            {   
                leaderboardDiv.innerHTML = "<div class = 'game-container__leaderboard--header game-container__leaderboard__left'>Player Name</div><div class = 'game-container__leaderboard--header game-container__leaderboard__right'>Player Score</div>"
                for(var i = 0;i < leaderboardArray1.length;i++)
                {  
                   leaderboardDiv.insertAdjacentHTML("beforeend","<div class = 'game-container__leaderboard__element'>"+leaderboardArray1[i].name+"</div><div class = 'game-container__leaderboard__element'>"+leaderboardArray1[i].score+"</div>")
                }
            }
            
            //==============================================================================
            //Draw animation
            //==============================================================================

            draw = setInterval(function()
            { 
           
            if(game1.state == "play")
                {      
                    ctx.drawImage(image, 0, 0, image.width, image.height);       
                    
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font =  '48px Righteous';
                    ctx.fillStyle = "white";
                    ctx.fillText(game1.score, 500,100);
                    ctx.closePath();

                            if(left == true)
                               {
                                  cannon1.x -= 20;
                                  cannon1.spokesAngle += Math.PI/6;
                               }
                            if(right == true)
                                {
                                    cannon1.x += 20;  
                                    cannon1.spokesAngle -= Math.PI/6;
                                }   
                            cannon1.draw(ctx,canvas.width);

                        // ctx.fillStyle = "black";
                        // ctx.fillRect(0,0,canvas.width,canvas.height);
                        
                        game1.time ++;
                     
                        
                        if(game1.time % 500 == 0 && game1.time != 0) 
                            {  
                                game1.bulletRate += 1;
                              
                            } 
                        if(game1.time % 10 == 0)
                        {  
                         
                           currentPlayer.score = game1.score; 
                           localStorage.setItem("leaderboardArray",JSON.stringify(leaderboardArray1));
                           leaderboardArray1.sort(function(a,b){
                               return b.score-a.score;
                           })
                           renderLeaderboard(leaderboardArray1);
                           game1.score++;
                        //    game_scorecard_score.textContent = game1.score;
                        } 
                        if(game1.time % 500 === 0 || game1.time ==1)
                        {  
                           if(rockDirection == 0) 
                            {   

                                var rock1 = new rocks(900,500,Math.floor((Math.random() * 20))+80,"left",colorSet[Math.floor((Math.random() * 4))]);
                                rockDirection = 1;
                            }    
                           else
                             {
                                 var rock1 = new rocks(100,500,Math.floor((Math.random() * 20))+80,"right",colorSet[Math.floor((Math.random() * 4))]);
                                 rockDirection = 0;
                             }    
                          
                            rockArray.push(rock1);
                        }
                        if(game1.time%10 == 0)
                        {
                         for(i = 0;i < game1.bulletRate;i++)
                         {
                            var bullet1 = new bullets(cannon1.x+25 - (game1.bulletRate-1)*15+(i)*20,cannon1.y-100,6);
                            bulletArray.push(bullet1);
                         } 
                        }                           

                        for(var i = 0;i < bulletArray.length;i++)
                        {   
                            if(bulletArray[i].y < 0)
                            bulletArray.splice(i,1);
                            else 
                            bulletArray[i].draw(ctx,bulletImage);
                            
                        }

                        for(var  i = 0;i < rockArray.length;i++)
                        {   
                            if(rockArray[i].radius  <= 20)
                            {   
                               if(rockArray[i].strength/2 >= 30)
                               { 
                                 rockArray.push(new rocks(rockArray[i].x-10,rockArray[i].y+40,rockArray[i].strength/2,"left",rockArray[i].color));
                                 rockArray.push(new rocks(rockArray[i].x+10,rockArray[i].y+40,rockArray[i].strength/2,"right",rockArray[i].color));
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

                        for(var i = 0;i < rockArray.length;i++)
                        {  
                            var res = rockArray[i].collisionDetectionBullet(bulletArray);

                            if(res != -1)
                            {
                                 for(var j = 0;j < res.length;j++)
                                 { 
                                   rockArray[i].radius -= 5;
                                   bulletArray.splice(res[j],1);
                                 }
                            }
                            // if(bulletArray[i].collisionDetection(rockArray) >= 0)
                            // {
                                
                            //     rockArray[bulletArray[i].collisionDetection(rockArray)].radius -= 5;
                            //     bulletArray.splice(i,1);
                            // }
                        }

                        //Collision detection of rock with cannon

                        for(var i = 0;i < rockArray.length;i++)
                        {
                            if(rockArray[i].collisionDetectionCannon(cannon1))
                            {   
                                gameMessage.style.display = "";
                                leaderboardDiv.style.display = "none";
                                gameContainer.style.display = "none";
                                leaderboardThroughMainMenu.style.display = "none"                

                                clearInterval(draw);
                            }
                        }
                }    

            },1000/50);
              //Declaring new cannon
              var cannon1 = new cannon(canvas.width,canvas.height);

              //Adding event listeners
  
              document.addEventListener("keydown",keyDownListener);
              document.addEventListener("keyup",keyUpListener);
              stateButton.addEventListener("click",gameStateEventHandler)
              //Creating new game
              var game1  = new game();

        }



            var bulletImage = document.querySelector('.bullet-image');
            var stateButton = document.querySelector('.game-container__game-sidebar__button-set__gamestate')  
            var leaderboardDiv = document.querySelector('.game-container__leaderboard'); 
            var canvas = document.querySelector('.game-container__game-canvas');
            //var pauseButton = document.querySelector('.game-container__game-sidebar__button-set__pause');
            //var playButton = document.querySelector('.game-container__game-sidebar__button-set__play'); 
            // var game_scorecard_score = document.querySelector('.game-container__game-sidebar__scorecard__score')
            var startButton = document.querySelector('.main-menu__options__buttonset__start__button');
            var gameContainer = document.querySelector('.game-container');
            var mainMenu = document.querySelector('.main-menu');
            var nameInput = document.querySelector('.input_name');
            var mainMenuImage = document.querySelector('.main-menu__image');
            var gameMessage = document.querySelector('.game-message');
            var restartButton = document.querySelector('.game-message__buttonset__restart__button');
            var mainMenuRedirectButton = document.querySelector('.game-message__buttonset__mainmenu__button');
            var displayLeaderboardButton = document.querySelector('.main-menu__options__buttonset__leaderboard__button');
            var displayLeaderboard = document.querySelector('.display-leaderboard');
            var leaderboardThroughMainMenu = document.querySelector('.leaderboard-through-mainmenu')
            var returnMainMenu = document.querySelector('.display-leaderboard__button');
     
            canvas.width = 1000;   
            canvas.height = 1000;
               
            startButton.addEventListener("click",startEventListener);
            restartButton.addEventListener("click",restarButtonEventListener);
            mainMenuRedirectButton.addEventListener("click",mainMenuRedirectButtonEventListener);
            displayLeaderboardButton.addEventListener("click",displayLeaderboardThroughMainMenu);
            returnMainMenu.addEventListener("click",returnMainMenuFunction);

            function returnMainMenuFunction()
            {     
                console.log("clicked");
                mainMenu.style.display = "";

                gameContainer.style.display = "none";
                gameMessage.style.display = "none";
                leaderboardDiv.style.display = "none";
                leaderboardThroughMainMenu.style.display = "none"
            }

            function displayLeaderboardThroughMainMenu()
            {
                gameContainer.style.display = "none";
                gameMessage.style.display = "none";
                leaderboardDiv.style.display = "none";
                leaderboardThroughMainMenu.style.display = ""                
                mainMenu.style.display = "none";
                var leaderboardArray1 = JSON.parse(localStorage.getItem("leaderboardArray"));
                leaderboardArray1.splice(9,leaderboardArray1.length);

                displayLeaderboard.innerHTML = "<div class = 'display-leaderboard--header display-leaderboard__left'>Player Name</div><div class = 'display-leaderboard--header display-leaderboard__right'>Player Score</div>"
                for(var i = 0;i < leaderboardArray1.length;i++)
                {  
                   displayLeaderboard.insertAdjacentHTML("beforeend","<div class = 'display-leaderboard__element'>"+leaderboardArray1[i].name+"</div><div class = 'display-leaderboard__element'>"+leaderboardArray1[i].score+"</div>")
                }

            }
            function mainMenuRedirectButtonEventListener()
            {
                gameContainer.style.display = "none";
                gameMessage.style.display = "none";
                leaderboardDiv.style.display = "none";
                  leaderboardThroughMainMenu.style.display = "none";  
                 mainMenu.style.display = "";
            } 
            function restarButtonEventListener()
            {
                gameContainer.style.display = "";
                gameMessage.style.display = "none";
                leaderboardDiv.style.display = "";
                leaderboardThroughMainMenu.style.display = "none"                

                initialiseGame(nameInput.value);

            }
            nameInput.addEventListener("focus",function()
            {
             mainMenuImage.style.transform = "rotate(20deg)";
            })


            var ctx = canvas.getContext('2d');
            ctx.fillRect(0,0,canvas.width,canvas.height);

            function startEventListener()
            {   
            
                if(nameInput.value == "")
                {
                    alert("ENTER NAME:");
                }
                else
                {   
                    leaderboardDiv.style.display = "";
                    gameContainer.style.display = "";
                    mainMenu.style.display = "none";
                    leaderboardThroughMainMenu.style.display = "none"                

                    initialiseGame(nameInput.value);
                }   

            }


          


         
 });
