$(document).ready(() => 
{
    //btn to Play the game
    /* $("#btn-login").on("click", () => {
        username = $("#username").val();
  
        if(username.length >= 3 ){
            parent.gameuser.login(username);
        } else {
            alert("O nome precisa ser mais de 2 caracteres!");
        }
    
    }); */

    console.log(parent.gameuser.stages);
    parent.game.src = "modules/game/";
    parent.modal.src = "";
    $(".close").on("click", function() 
    {
        console.log("Close");
        parent.modal.src = "";
        //$(`#Modal`).css("display","none");
    });

});