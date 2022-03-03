import { RequestSys } from "./request.js";

class Book extends HTMLOListElement
{
    constructor()
    {
        super();
        this.classList.add("book");
        const hash = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjAsImlhdCI6MTY0NjI1MDk5N30.OvOszzNfDXvgLwUaJmQXmhY5xeaTpzNeZs5uN02YQio";
        RequestSys.get("recipes", {params:hash}, (data) => {this.createRecipes(data)});
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