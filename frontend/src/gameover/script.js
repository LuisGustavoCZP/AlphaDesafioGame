$(document).ready(function() {
    let userData = {name: "Lucas", points: 356, ranking: 5};

    /*const cookie = document.cookie;
    Request.get("user", 
    {params:cookie.replace("userData=", "")},
    data => 
    {
        userData = data;
        console.log(data);
    },
    error => 
    {
        console.log("Erro");
       // window.location.replace(`../menu`);
    });*/


    $("#points").html(`Pontos: ${userData.points}`);
    //$("#ranking").html(`Classificação: #${userData.ranking}`);



    setTimeout(()=>{$(`#gameOverModal`).css("display","block")},2000);


    $("btn-restart").on("click", () => {
         // window.location.replace(`../game`);
    });

    $("btn-home").on("click", () => {
         // window.location.replace(`../menu`);
    });

});