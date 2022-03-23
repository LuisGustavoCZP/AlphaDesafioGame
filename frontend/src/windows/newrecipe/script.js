import { WaitFor } from "/static/scripts/timer.js";

$(document).ready(async () => 
{
    console.log("Estou rodando!")
    await WaitFor(() => 
    {
        if(window.gameuser.lastCreation) return true;
        else return false;
    });
    const lastCreation = window.gameuser.lastCreation;
    console.log(lastCreation);
    /* const points = parseInt(window.gameuser.stages[stage].highscore);
    const item = window.gameuser.currentStage.potion.item; */
    $("#title").html(`Nova poção`);
    $("#potion").html(`
        <img src="/images/${item.icon}" alt="${item.name}"/>
        <h3>${item.name}</h3>
    `);
});