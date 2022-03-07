$(document).ready(() => 
{
    const stage = parent.gameuser.stage-1;
    console.log(parent.gameuser.data);
    const lives = parent.gameuser.data.lives;
    const points = parent.gameuser.stages[stage].highscore;
    
    $("#title").html(`Aula ${stage+1}`);
    const hearts = $("#hearts > img");
    const pointsText = $("#points > h2")[0];
    console.log(hearts);
    for (let i = hearts.length-1; i >= lives; i--) {
        const heart = hearts[i];
        heart.classList.add("gray");
    }
    pointsText.innerText = `${points}`;
});