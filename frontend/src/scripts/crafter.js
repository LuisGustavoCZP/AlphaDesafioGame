class Crafter extends HTMLElement
{
    constructor()
    {
        super();
        this.classList.add("ui-droppable");
        if(this.hasAttribute('img')) {
            this.img = new Image();
            this.img.src = this.getAttribute('img');
            this.append(this.img);
        } else {
            this.img = null;
        }
        this.style["border-radius"] = "15%";
        //this.classList.add("book");
    }

    createRecipes (data)
    {
        console.log(data, this);
        
    }

    start ()
    {
        $(this).droppable({
            accept: ".item",
            /* tolerance: "fit", */
            activate: function( event, ui ) { this.classList.add("highlight"); },
            deactivate: function( event, ui ) { this.classList.remove("highlight"); },
            over: function( event, ui ) 
            { 
                this.classList.add("placing"); 
                ui.helper[0].classList.add("ui-draggable-dropping");
                if(window.audiosys) window.audiosys.play("select");
            },
            out: function( event, ui ) 
            { 
                this.classList.remove("placing"); 
                ui.helper[0].classList.remove("ui-draggable-dropping"); 
            },
            drop: function( event, ui ) 
            { 
                const container = this;
                container.classList.remove("highlight");
                container.classList.remove("placing");
                if(!container.ingredients) container.ingredients = [];
                const itemid = ui.draggable[0].id;
                container.ingredients.push(itemid);
                console.log("Dropou objeto", container.ingredients); 
                if(window.audiosys) window.audiosys.play("sucess");
            }
        });
    }

    static define ()
    {
        console.log("Iniciou Crafter");
        /* customElements.define('modal', Modal); */
        customElements.define('game-crafter', Crafter);
    }
}

Crafter.define();

export {Crafter};