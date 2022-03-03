import { Request } from "./request.js";

class Inventory extends HTMLOListElement
{
    constructor()
    {
        super();
        this.classList.add("inventory");
        const hash = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjAsImlhdCI6MTY0NjI1MDk5N30.OvOszzNfDXvgLwUaJmQXmhY5xeaTpzNeZs5uN02YQio";
        Request.get("stock", {params:hash}, (data) => {this.createItens(data)});
    }

    createItens (data)
    {
        console.log(data, this);
    }

    static define ()
    {
        console.log("Iniciou Inventory");
        /* customElements.define('modal', Modal); */
        customElements.define('ol-inventory', Inventory, { extends: "ol" });
    }
}

Inventory.define();

export {Inventory};