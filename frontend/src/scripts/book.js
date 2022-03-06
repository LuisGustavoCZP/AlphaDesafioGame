import { RequestSys } from "./request.js";

class Book extends HTMLOListElement
{
    constructor()
    {
        super();
        this.classList.add("book");
        window.gameuser.requestBook ((data) => this.createItens(data));
    }

    createRecipes (data)
    {
        console.log(data, this);
    }

    static define ()
    {
        console.log("Iniciou Book");
        /* customElements.define('modal', Modal); */
        customElements.define('ol-book', Book, { extends: "ol" });
    }
}

Book.define();

export {Book};