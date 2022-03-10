$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron")[0];
    const dialogMage = $("#dialog-mage")[0];

    if(window.modal) window.modal.src="modules/windows/stage";
    setTimeout(() => 
    {
        let recipe;
        bookcase.start();
        if(window.modal){
            window.modal.src="";
            window.audiosys.play("open");
            recipe = window.gameuser.currentStage.potion;
        }
        cauldron.start();
        
        dialogMage.createText("VAMOS A NOSSA PRIMEIRA LIÇÃO! {e20}", 
        recipeDialog (recipe), "AGORA ARRASTE OS ITENS ATÉ O CALDEIRÃO {e4}!");

    }, 5000);

    function recipeDialog (recipe) 
    {
        const newdialog = 
        {
            text:/* `{i0} + {i1} = {i2}{f0}` */"",
            time:2000,
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

        recipe.ingredients.forEach(item => 
        {
            newdialog.text += `{i${newdialog.icons.length}} `; //${item.name}
            newdialog.icons.push(item.icon);
            if(recipe.ingredients.length > newdialog.icons.length) newdialog.text += "+ ";
        });

        newdialog.text += "= ";
        newdialog.text += `{i${newdialog.icons.length}} `; //${recipe.item.name}
        newdialog.icons.push(recipe.item.icon);

        //console.log(newdialog);
        //recipe.

        return newdialog;
    }
});

