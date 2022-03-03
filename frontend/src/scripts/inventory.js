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
        const hash = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjAsImlhdCI6MTY0NjI1MDk5N30.OvOszzNfDXvgLwUaJmQXmhY5xeaTpzNeZs5uN02YQio";
        RequestSys.get("stock", {params:hash}, (data) => {this.createItens(data)});
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