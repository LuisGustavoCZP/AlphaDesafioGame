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
            console.log(parent.gameuser.book);
            //parent.user.login(username);
        } else {
            alert("O nome precisa ser mais de 2 caracteres!");
        }
    
    });

    $(".close").on("click", function() 
    {
        console.log("Close");
        parent.modal.src = "";
        //$(`#Modal`).css("display","none");
    });

});