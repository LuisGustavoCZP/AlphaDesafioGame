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

        const div = document.createElement("div");
        div.classList.add("timer");
        this.timer = document.createElement("h2");
        div.append(this.timer);
        this.append(div);
        this.finished = false;
        //this.classList.add("book");
    }

    createRecipes (data)
    {
        console.log(data, this);
        
    }

    async play (callback)
    {
        this.abortTimer = false;
        
        $(this).droppable({
            accept: ".item",
            /* tolerance: "fit", */
            activate: function( event, ui ) { this.classList.add("highlight"); },
            deactivate: function( event, ui ) { this.classList.remove("highlight"); },
            over: function( event, ui ) 
            { 
                this.classList.add("placing"); 
                ui.helper[0].classList.add("ui-draggable-dropping");
                if(parent.audiosys) parent.audiosys.play("select");
            },
            out: function( event, ui ) 
            { 
                this.classList.remove("placing"); 
                ui.helper[0].classList.remove("ui-draggable-dropping"); 
            },
            drop: async function( event, ui ) 
            { 
                const container = this;
                container.classList.remove("highlight");
                container.classList.remove("placing");
                if(!container.ingredients) container.ingredients = [];
                const itemid = ui.draggable[0].id;
                container.ingredients.push(itemid);
                
                if(parent.audiosys) parent.audiosys.play("sucess");
                if(callback) {
                    callback(container.ingredients);
                }

                /* this.finished = true; */
                /* const response = await parent.gameuser.sendItems(container.ingredients);
                const data = response;//.then((d) => {console.log(d);});//
                console.log(data);
                this.potion = data;
                if(data.status == 0) 
                {
                    if(!data.result) return;
                    console.log(`Criou a poção ${data.result}`);
                }
                else if (data.status == 1) parent.gameuser.stageTimeout();
                else 
                {
                    //
                    this.abortTimer = true;
                    parent.gameuser.stageWin(data);
                } */
            }
        });

        const thisClass = this;
        return false; 
    }

    reset ()
    {
        this.ingredients = [];
    }

    stop ()
    {
        this.abortTimer = true;
        this.finished = false;
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