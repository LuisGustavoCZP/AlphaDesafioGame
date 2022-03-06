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
        this.style.listStyle = "none";
    }

    start (){
        window.gameuser.requestStock ((data) => this.createItens(data));
    }

    createItens (data)
    {
        const d = [data];
        console.log(data);
        //this.container.ondragover = this.dragOver;
        data.forEach(item => 
        {
            const el = document.createElement("li");
            el.innerHTML = `<img class="item" id="${item.id}" src="/images/${item.icon}"></img>`;
            $(function ()
            {
                const d = $(`#${item.id}`);
                const h = function(event) {console.log(event.target);};
                const c = {
                    "ui-draggable": "dragging"
                }
                const dragstart = function( event, ui ) {
                    console.log(this);
                    this.classList.add("dragging");
                    //alert("hi..");
                }
                const dragstop = function( event, ui ) {
                    console.log(this);
                    this.classList.remove("dragging");
                    //alert("hi..");
                }
                d.draggable ({opacity: 0.7, zIndex: 1001,appendTo: "body", helper: "clone", cursor: "move", start: dragstart, stop:dragstop});
                
            });
            /* .ondragstart = this.dragStart;
            el.children[0].ondragend = this.dragEnd;
            el.children[0].ondrag = this.drag; */
            this.container.appendChild(el);
        });
    }

    dragStart (ev) 
    {
        ev.dataTransfer.setData("text/plain", null);
        ev.dataTransfer.effectAllowed = "all";
        console.log(ev.target.id);
        ev.target.classList.add("dragging");
        ev.dataTransfer.mozCursor = "default";
        const targetClone = ev.target.cloneNode();
        targetClone.remove();

        targetClone.width = ev.target.width*5;
        targetClone.height = ev.target.height*5;
        console.log(targetClone, ev.target);
        ev.dataTransfer.setDragImage(targetClone, 0, 0);

        //
        /* 
        ev.dataTransfer.dropEffect = "copy"; */
        /* ev.preventDefault(); */
        //ev.target.style.opacity = 0;
    }

    drag (ev)
    {
        console.log(ev.target.id);
        ev.stopPropagation();
        ev.preventDefault();
        
        ev.dataTransfer.dropEffect = 'move';
        //ev.dataTransfer.effectAllowed = "copy";
    }

    dragEnd (ev) {
        console.log(ev.target.id);
        this.classList.remove("dragging");
        //ev.dataTransfer.setData("text/plain", ev.target.id);
        //ev.target.style.opacity = 1;
    }

    dragOver (ev)
    {
        ev.stopPropagation();
        ev.preventDefault();
        /* ev.dataTransfer.dropEffect = 'move'; */
    }

    static define ()
    {
        console.log("Iniciou Inventory");
        customElements.define('game-inventory', Inventory);
    }
}

Inventory.define();

export {Inventory};