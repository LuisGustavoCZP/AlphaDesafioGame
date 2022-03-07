$(document).ready(() => 
{
    $(".menu-background > *").remove();
    
    //const cookie = document.cookie;
    const ranking = parent.gameuser.ranking;

    let result = `<span class="close">&times;</span>
    <div id="title"><strong>CLASSIFICAÇÃO</strong></div>
    <div id="content">`;
    ranking.forEach((element,index) => {
        result += `<div id="place-${index + 1}" class="places">
                        <p> #${element.classification} - ${element.name}</p>
                        <p> ${element.highscore} PONTOS</p>
                    </div>`;
    });
    result += `</div>`;
    console.log(result);
    
    $(".menu-background").append(result);

    $(".close").on("click", function() 
    {
        //console.log("Close");
        parent.modal.src = "";
        parent.audiosys.play("close");
        //$(`#Modal`).css("display","none");
    });

});