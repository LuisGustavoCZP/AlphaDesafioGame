import { LoadSys } from "./loadsys.js";

class GameModal extends HTMLElement
{
    #srcs;
    #submenus;

    static define ()
    {
        customElements.define('game-modal', GameModal);
    }

    constructor()
    {
        self = super();
        this.submenus = {};
        this.#srcs = [];
    }
    
    /**
     * @param {String[]} _paths
     */
    set srcs (modalDatas)
    {
        this.innerHTML = "";
        this.#srcs = [];
        this.submenus = {};
        const isBlank = modalDatas.length > 0;
        if(isBlank) { this.hidden = true; } else { this.hidden = false; }
        //const pathreparer = reparerURL(window.location.href, _path);
        if(!isBlank) 
        {
            modalDatas.forEach((value) => 
            {
                LoadSys.toHTML(value.path, doc => 
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
                                if (child.src && child.src != this.srcs)
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
                    this.#srcs.push(value.path);
                    const submenu = document.createElement("div");
                    this.submenus[value.id](submenu);
                    repairSrcs(doc.body, submenu);
        
                    if(this.onload) this.onload(this);
                });
            });
        }
    }

    get srcs ()
    {
        return this.#srcs;
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

GameModal.define();

export {GameModal};

