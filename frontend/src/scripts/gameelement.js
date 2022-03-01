import { LoadSys } from "./loadsys.js";

class GameElement extends HTMLElement
{
    #src;

    static define ()
    {
        //console.log("Iniciou static");
        customElements.define('game-element', GameElement);
    }

    constructor()
    {
        self = super();

        //console.log("Iniciou instancia");
        this.style.display = "flex";
        this.style.flexGrow = "0";
        this.style.width = "fit-content";
        this.style.height = "fit-content";

        if(this.hasAttribute('src')) {
            this.src = this.getAttribute('src');
        }
    }
    
    /**
     * @param {String} _path
     */
    set src (_path)
    {
        this.#src = _path;
        LoadSys.toHTML(_path, doc => 
        {
            const element = [...doc.body.children];
            //this.append(element);
            if(element.length){
                const urlDir = window.location.href.replace("index.html", "");
                const urlSrcLast = this.src.lastIndexOf("/");
                const urlSrc = this.src.slice(0, urlSrcLast+1);
                element.forEach(child => 
                {
                    if (child.src && child.src != this.src)
                    {
                        const file = child.src.replace(urlDir, "");
                        console.log(child.src, urlSrc+file);
                        if(child instanceof HTMLScriptElement)
                        {
                            const nscript = document.createElement("script");
                            nscript.type = child.type;
                            nscript.src = urlSrc+file;
                            this.appendChild(nscript);
                        } else {
                            child.src = file;
                            this.appendChild(child);
                        }
                    } else {
                        if(child instanceof HTMLScriptElement)
                        {
                            if(!child.innerHTML.includes("// <![CDATA[  <-- For SVG support")) this.appendChild(child);
                        } else {
                            this.appendChild(child);
                        }
                        
                    }
                });
            }
        });
    }

    get src ()
    {
        return this.#src;
    }

}
GameElement.define();

export {GameElement};

