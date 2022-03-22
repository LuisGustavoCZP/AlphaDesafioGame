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
    await cauldron.play((ingredients)=>
    {
        console.log("Dropou objeto", ingredients); 
    });
    //await gameTimer(5000);

    let recipe;
    if(parent.modal){
        //parent.modal.src="";
        
        //recipe = parent.gameuser.currentStage.potion;
    }

    const dialogs = [
        /* {
            text:"VAMOS LÁ!"
        },
        {
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
    
    /*await WaitFor(() => 
    {
        if((cauldron.finished == true))
        {

            return true;
        } 
        else return false;
    });*/
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

