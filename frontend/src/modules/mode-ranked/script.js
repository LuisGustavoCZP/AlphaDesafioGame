import { gameTimer, WaitFor } from "../../static/scripts/timer.js";

$(document).ready(async function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron")[0];
    const dialogMage = $("#dialog-mage")[0];
    const btnbook = $("#btn-book")[0];
    btnbook.onclick = () => {window.modal.src="/windows/book";};
    await bookcase.start();
    //if(window.modal) window.modal.src="/windows/stage";
    parent.audiosys.play("open");
    cauldron.play((ingredients)=>
    {
        if(ingredients && ingredients.length == 2)
        {
            const itens = ingredients;
            cauldron.reset();
            console.log(itens);
            /* const response = await window.gameuser.sendItems(itens);
            console.log(response);
            if(response.status == 0){

            } */
            //return true;
        }
        //console.log("Dropou objeto", ingredients); 
    });

    WaitFor(() =>
    {
        //if(thisClass.abortTimer) return true;
        const timePass = window.gameuser.match.expiration - (new Date().getTime());
        console.log(timePass);
        let ms = timePass;
        let aux = ms % 1000;
        let s = (ms - aux) / 1000;
        ms = aux;
        aux = s % 60;
        let mn = (s - aux) / 60;
        s = aux;
        aux = mn % 60;
        let hr = (mn - aux) / 60;
        mn = aux;
        aux = hr % 60;
        
        thisClass.timer.innerText = (hr > 0?`${hr}:`:"")+(mn > 0?`${mn}:`:"")+(s > 0?`${s}`:"")+(ms > 0?`.${ms}`.slice(0, 2):"");
        if(timePass > 0) return false;
        else return true;
    });

    await WaitFor(async () => 
    {
        /* console.log(cauldron.ingredients); */
        
        return false;
    });
    //await gameTimer(5000);

    let recipe;
    if(parent.modal){
        //parent.modal.src="";
        
        //recipe = parent.gameuser.currentStage.potion;
    }

    const dialogs = [
        {
            text:"VAMOS LÁ!",
            click: true
        },
        /*{
            text:"FAÇA \n\t{i0}", 
            icons:
            [
                recipe.item.icon
            ],
            time:-1
        }, */
    ]
    await dialogMage.createText(...dialogs);
    //await parent.gameuser.requestStageStart();
    
    /**/
    /*if(data.status == 0) 
    {
        if(data.result) {
            console.log(`Criou a poção ${data.result}`)
        }
        return;
    }
        else if (data.status == 1) thisuser.stageTimeout();
    else {
        thisuser.stageWin();
    } */
    //cauldron.stop();
    console.log("Coisa coisada!");
});

