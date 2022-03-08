//import { Request } from "../scripts/request.js";
$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron")[0];
    const dialogMage = $("#dialog-mage")[0];

    if(window.modal) window.modal.src="modules/windows/stage";
    /* parent.audiosys.play("stop"); */
    setTimeout(() => 
    {
        console.log(bookcase);
        bookcase.start();
        if(window.modal){
            window.modal.src="";
            parent.audiosys.play("open");
        }
        cauldron.start();
        
        dialogMage.createText("VAMOS A NOSSA PRIMEIRA LIÇÂO!", recipeDialog (), { texts:["Pronto! Agora você sabe fazer"] });
    }, 5000);

    recipeDialog (recipe) 
    {
        const newdialog = 
        {
            texts:
            [
                /* `{i0} + {i1} = {i2}{f0}` */
            ],
            /* time:1000, */
            /* speed:1, */
            icons: //{i0}
            [
                /* "/images/assets/ingredients/1",
                "/images/assets/ingredients/2",
                "/images/assets/potions/1" */
            ],
            /* functions://{f0}
            [
                (parag, dialog) => 
                {
                    //dialogMage.createText();
                }
            ] */
        };

        return newdialog
    }
    //window.transition.stop();
});

