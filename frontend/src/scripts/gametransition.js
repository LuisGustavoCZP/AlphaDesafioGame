class GameTransition extends HTMLElement
{
    #ready;
    #playing;
    #stopping;
    layer;

    constructor()
    {
        super();
        
        this.style.position = "absolute";
        this.style.display = "flex";
        this.style.flexGrow = "1";
        this.style.width = "100%";
        this.style.height = "100%";
        this.style.overflow = "hidden";
        this.#playing = false;
        this.sprites = [];
        this.max = 0;
        this.layerDist = 0;
        this.layerZ = 0;
        
        if(this.hasAttribute('play')) {
            this.#playing = this.getAttribute('play') == "false"? false : true;
        }

        if(this.hasAttribute('size')) {
            const s = parseFloat(this.getAttribute('size'));
            this.size = s;
        }
        else
        {
            this.size = 0.5;
        }

        if(this.hasAttribute('speed')) {
            const s = parseFloat(this.getAttribute('speed'));
            this.speed = s;
        } 
        else
        {
            this.speed = 1;
        }

        if(this.hasAttribute('sprites')) {
            const srcs = this.getAttribute('sprites').replaceAll(" ", "").split(",");
            srcs.forEach(src => {
                const newSprite = new Image();
                newSprite.src = src;
                this.sprites.push(newSprite);
            });
        } else {
            const srcs = ["/images/background/bigclouldleft.png", "/images/background/bigclouldright.png"];
            srcs.forEach(src => {
                const newSprite = new Image();
                newSprite.src = src;
                this.sprites.push(newSprite);
            });
        }

        if(this.hasAttribute('layer')) 
        {
            const zindex = parseInt(this.getAttribute('layer'));
            this.#createLayer(zindex);
        } else {
            this.#createLayer(20000);
        }

        if(this.#playing){
            this.play();
        }
        
       this.readyGo = true;
    }

    static define ()
    {
        console.log("Iniciou Weather");
        customElements.define('game-transition', GameTransition);
    }

    get playing ()
    {
        return this.#playing;
    }

    get stopping ()
    {
        return this.#stopping;
    }

    #createLayer(z) 
    {
        const newcanvas = document.createElement("canvas");
        newcanvas.style = "position: absolute;" + " z-index:" + z + ";";
        newcanvas.width = 1366;
        newcanvas.height = 522;
        newcanvas.style.width = "100%";
        newcanvas.style.height = "100%";
        const layer = { "canvas":newcanvas, "context":newcanvas.getContext("2d"), "z":z, "objects":[]};
        this.layer = layer;
        
        this.prepend(newcanvas);
        return newcanvas;
    }

    play ()
    {
        if(this.playing) return;
        this.style["pointer-events"] = "unset"; 
        this.#playing = true;
        this.reverse = false;
        this.readyGo = false;
        this.loop(this);
    }

    revert ()
    {
        /* console.log(reverse); */
        if(this.reverse) return;
        //this.style["pointer-events"] = "unset"; 
        this.#playing = true;
        this.reverse = true;
        this.loop(this);
    }

    stop ()
    {
        this.#stopping = true;
    }

    createInstances (target, layer, w, h) 
    {
        if(!layer.objects) 
        {
            layer.objects=[];
        }
        if(!target.stopping) 
        {
            const maxObjs = 2;
            for(let i = 0; layer.objects.length < maxObjs; i++)
            {
                function randomHeight () {
                    const alt = h;
                    const dif = (h*.5);
                    return -(h/2);
                }
                const newobj = {
                    spriteSize ()
                    {
                        return (this.size*this.sprite.width);
                    },
                    randomize ()
                    {
                        const reverse = (i == 0);
                        this.reverse = reverse;
                        //console.log(`${i} == ${0} => ${i == 0}`);

                        this.sprite = target.sprites[(reverse?1:0)];
                        this.size = target.size;
                        this.y = randomHeight () - this.spriteSize()/2;
                        this.speed =  (reverse?-1:1) * 10 * target.speed;
                        
                        this.x = reverse ? w : -w-this.spriteSize ();
                    }
                };
                newobj.randomize();
                layer.objects.push(newobj);
                if(layer.objects.length == maxObjs) 
                {
                    this.#stopping = false;
                    //console.log(target.playing);
                    
                }
            }
        }
    }

    layerloop (target, layer)
    {
        const w = layer.canvas.width/2, h = layer.canvas.height/2;
        const ctx = layer.context;
        ctx.clearRect(0,0,w*2,h*2);

        this.createInstances(target, layer, w, h);

        const s = 1;

        ctx.translate(w, h);

        layer.objects.forEach((obj, i) => 
        {
            if(obj.sprite && obj.sprite.complete) 
            {
                const objSize = obj.spriteSize ();
                
                if(target.reverse && obj.reverse && obj.x > (w)) 
                {
                    //console.log("Voltando!!!");
                    this.#stopping = false;
                    this.#playing = false;
                    this.readyGo = true;
                    this.style["pointer-events"] = "none";
                    if(target.onfinish) target.onfinish(target);
                    return;
                }
                if(!target.reverse && !obj.reverse && obj.x > (w/2)-(objSize)) 
                {
                    this.#playing = false;
                    this.#stopping = false;
                    //console.log("Reverso!!!");
                    if(target.oncomplete) target.oncomplete(this);
                }
                else
                {
                    obj.x += obj.speed * target.speed * (target.reverse?-1:1);
                }
                
                ctx.drawImage(obj.sprite, obj.x, obj.y, obj.sprite.width*obj.size, obj.sprite.height*obj.size);
            }
        });
        ctx.translate(-w, -h);
    }

    loop (target)
    {
        if(target.playing == false) return;
        window.requestAnimationFrame(() => target.loop(target), target);

        if(target.#ready || true)
        {
            this.layerloop(target, this.layer);
        }
    }
}
GameTransition.define();

export { GameTransition };