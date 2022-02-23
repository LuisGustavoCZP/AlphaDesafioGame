$(document).ready(function() {
    let userData = {};

    //Get user
    const cookie = document.cookie;
    Request.get("user", 
        {params:cookie.replace("userData=", "")},
        data => 
        {
            userData = data;
            console.log(data);
        },
        error => 
        {
            console.log("Erro: " + error);
        window.location.replace(`../menu`);
        }
    );

    //Send points to the Frontend
    $("#points").html(`Pontos: ${userData.points}`);
    $("#highscore").html(`Melhor Pontuação: #${userData.highscore}`);
    setTimeout(()=>{$(`#gameOverModal`).css("display","block")},2000);

    //ações dos botões
    $("btn-restart").on("click", () => {
        Request.post("reset", 
            {},
            data => 
            {
                console.log(data);
            },
            error => 
            {
                console.log("Erro: " + error);
                window.location.replace(`../menu`);
            },
            {params:cookie.replace("userData=", "")}
        );

        window.location.replace(`../game`);
    });

    $("btn-home").on("click", () => {
        window.location.replace(`../menu`);
    });

});



