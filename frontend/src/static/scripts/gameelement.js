import { LoadSys } from "./loadsys.js";

class GameElement extends HTMLElement
{
    #src;

    static define ()
    {
        customElements.define('game-element', GameElement);
    }

    constructor()
    {
        self = super();

        //console.log("Iniciou instancia");
        /* this.style.display = "flex";
        this.style.flexGrow = "0";
        this.style.width = "fit-content";
        this.style.height = "fit-content"; */

        if(this.hasAttribute('src')) {
            this.src = this.getAttribute('src');
        }
    }
    
    /**
     * @param {String} _path
     */
    set src (_path)
    {
        this.innerHTML = "";
        this.#src = _path;
        //const pathreparer = reparerURL(window.location.href, _path);
        LoadSys.toHTML(_path, doc => 
        {
            const repairSrcs = (el, parent) =>
            {
                if(el.children.length == 0) return;
                const element = [...el.children];
                //this.append(element);
                if(element.length)
                {
                    element.forEach(child => 
                    {
                        if (child.src && child.src != this.src)
                        {
                            if(child instanceof HTMLScriptElement)
                            {
                                const nscript = document.createElement("script");
                                parent.appendChild(nscript);
                                nscript.type = child.type;
                                nscript.src = child.src;
                                //nscript.onload = ()=>{console.log("carregou", nscript); };
                            } 
                            else 
                            {
                                child.src = child.src;
                                parent.appendChild(child);
                            }
                        } else {
                            if(child instanceof HTMLScriptElement)
                            {
                                if(!child.innerHTML.includes("// <![CDATA[  <-- For SVG support")) parent.appendChild(child);
                            } 
                            else if(child instanceof HTMLLinkElement)
                            {
                                /* const file = pathreparer.repair(child.href);
                                child.href = file; */
                                parent.appendChild(child);
                            } else {
                                parent.appendChild(child);
                            }
                        }
                        //console.log(child);
                        repairSrcs(child, child);
                    });
                }
            }
            
            repairSrcs(doc.body, this);

            if(this.onload) this.onload(this);
        });
    }

    get src ()
    {
        return this.#src;
    }

}

function reparerURL (lastOrigin, newOrigin) 
{
    const urlRoot = lastOrigin.replace("index.html", "");
    
    const urlSrcLast = newOrigin.lastIndexOf("/");
    const urlSrc = newOrigin.slice(0, urlSrcLast+1);

    function repair (oldpath)
    {
        //console.log(oldpath, urlRoot, urlSrc);
        const newpath = urlSrc + oldpath.replace(urlRoot, "");
        //console.log(oldpath, newpath);
        return newpath;
    }

    return {repair, urlRoot };
}

GameElement.define();

export {GameElement};

