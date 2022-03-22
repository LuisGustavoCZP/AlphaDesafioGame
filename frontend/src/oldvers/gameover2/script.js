import {Request} from "../scripts/request.js"
$(document).ready(function() {
    let userData = {};

    //Get user
    const cookie = document.cookie;
    Request.get("user", 
        {params:cookie.replace("userData=", "")},
        data => 
        {

            userData = JSON.parse(JSON.stringify(data));
            $("#points").html(`Pontos: ${userData.points}`);
            $("#highscore").html(`Melhor Pontuação: ${userData.highscore}`);
        },
        error => 
        {
            console.log("Erro: " + error);
            window.location.replace(`../menu`);
        }
    );

    //Send points to the Frontend
 
    setTimeout(()=>{$(`#gameOverModal`).css("display","block")},2000);

    //ações dos botões
    $("#btn-restart").on("click", () => {
        Request.post("reset", 
            {},
            data => 
            {
                console.log(data);
                window.location.replace(`../game`);
            },
            error => 
            {
                console.log("Erro: " + error);
                window.location.replace(`../menu`);
            },
            {params:cookie.replace("userData=", "")}
        );

    });

    $("#btn-home").on("click", () => {
        console.log("Home");
        window.location.replace(`../menu`);
    });

});



