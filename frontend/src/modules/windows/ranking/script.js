import { Request } from "../scripts/request.js";
$(document).ready(() => 
{
    $(".menu-background > *").remove();
    
    const cookie = document.cookie;
    const ranking = parent.gameuser.ranking;

    let result = `<span class="close">&times;</span>
    <div id="title"><strong>CLASSIFICAÇÃO</strong></div>
    <div id="content">`;
    ranking.forEach((element,index) => {
        result += `<div id="place-${index + 1}" class="places">
                        <p> #${index + 1} - ${element.name}</p>
                        <p> ${element.highscore} PONTOS</p>
                    </div>`;
    });
    result += `</div>`;
    
    $(".menu-background > *").html(result);

    $(".close").on("click", function() 
    {
        console.log("Close");
        parent.modal.src = "";
        //$(`#Modal`).css("display","none");
    });

});