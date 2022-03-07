$(document).ready(() => 
{
    //btn to Play the game
    $("#btn-login").on("click", () => {
        username = $("#username").val();
        // password = $("#password").val();
  
        if(username.length >= 3 ){
            //$(`#Modal`).css("display","none");
            /* callFetchLogin(username); */
            /* console.log(parent.coiso); */
            
            parent.gameuser.login(username);
            parent.audiosys.play("click");
            //parent.user.login(username);
        } else {
            parent.audiosys.play("error");
            //alert("O nome precisa ser mais de 2 caracteres!");
        }
    
    });
});