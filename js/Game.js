class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    Tank1 = createSprite(300,300);
    Tank1.addImage("Tank1",Tank1_img);
    Tank1.scale = 0.4;
    Tank2 = createSprite(900,300);
    Tank2.addImage("Tank2",Tank2_img);
    Tank2.scale = 0.1;
    Tanks=[Tank1,Tank2];
  }
  wallCreation(){
    wall1 = createSprite(300,250,10,100);
    wall2 = createSprite(300,250,10,100);
    wall3 = createSprite()
  }
  play(){
    form.hide();

    Player.getPlayerInfo();
    
    //wallCreation();

    if(allPlayers !== undefined){
      //var display_position = 100;
      //index of the array
      var index =0;

      //x and y position of the cars
      var x = 0;
      var y = 0;
      
      if (index === player.index){
        Tanks[index - 1].shapeColor = "red";
       camera.position.x = displayWidth/2;
       camera.position.y = Tanks[index-1].y;

        player.yPos=y;
        player.xPos=x;

      }
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        y = allPlayers[plr].yPos;
        x = allPlayers[plr].xPos;  
        Tanks[index-1].x = x;
        Tanks[index-1].y = y;

        textSize(20);
        text(allPlayers[plr].name, x, y+75);

       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(player.index !== null){
      if(keyIsDown(38)){
        player.yPos = player.yPos - 1;
        player.update();
      }
      if(keyIsDown(40)){
        player.yPos = player.yPos + 1;
        player.update();
      }
      if(keyIsDown(37)){
        player.xPos = player.xPos - 1;
        player.update();
      }
      if(keyIsDown(39)){
        player.xPos =player.xPos + 1;
      }
    }   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }




  
}
