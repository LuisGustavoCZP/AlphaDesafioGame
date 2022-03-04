import { RequestSys } from "./request.js";

class Inventory extends HTMLElement
{
    container;
    columns;

    constructor()
    {
        super();
        const linkcss = document.createElement("link");
        linkcss.rel = "stylesheet";
        linkcss.href = "/styles/inventory.css";
        this.before(linkcss);
        this.classList.add("inventory");
        this.container = document.createElement("ul");
        this.append(this.container);
        if(this.hasAttribute('columns')) {
            this.columns = this.getAttribute('columns');
        } 
        /* if(columns) */
        this.style.listStyle = "none";
        window.gameuser.requestStock (this.createItens);
    }

    createItens (data)
    {
        console.log(data, this);
        data.stock.forEach(item => 
        {
            const el = document.createElement("li");
            el.innerHTML = `<img src="/images/${item.icon}"></img>`;
            this.container.appendChild(el);
        });
        data.stock.forEach(item => 
        {
            const el = document.createElement("li");
            el.innerHTML = `<img src="/images/${item.icon}"></img>`;
            this.container.appendChild(el);
        });
        data.stock.forEach(item => 
        {
            const el = document.createElement("li");
            el.innerHTML = `<img src="/images/${item.icon}"></img>`;
            this.container.appendChild(el);
        });
    }

    static define ()
    {
        console.log("Iniciou Inventory");
        /* customElements.define('modal', Modal); */
        customElements.define('game-inventory', Inventory);
    }
}

Inventory.define();

export {Inventory};