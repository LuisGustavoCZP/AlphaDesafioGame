import { RequestSys } from "./request.js";

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
        //this.classList.add("book");
    }

    createRecipes (data)
    {
        console.log(data, this);
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