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
            const srcs = ["/images/background/clouds/cloud1.png", "/images/background/clouds/cloud2.png", "/images/background/clouds/cloud3.png", "/images/background/clouds/cloud4.png", "/images/background/clouds/cloud5.png", "/images/background/clouds/cloud6.png", "/images/background/clouds/cloud7.png", "/images/background/clouds/cloud8.png"];
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
        this.readyGo = false;
        this.loop(this);
    }

    stop ()
    {
        this.#stopping = true;
    }

    layerloop (target, layer)
    {
        const w = layer.canvas.width/2, h = layer.canvas.height/2;
        const ctx = layer.context;
        ctx.clearRect(0,0,w*2,h*2);

        if(!layer.objects) 
        {
            layer.objects=[];
        }
        if(!target.stopping) 
        {
            const maxObjs = 200;
            for(let i = 0; i < 10 && layer.objects.length < maxObjs; i++)
            {
                if(layer.objects.timer == undefined || layer.objects.timer > 10/target.speed)
                {
                    layer.objects.timer = 0;
                    function randomDirection (){
                        return Math.random() >= .5;
                    }
                    function randomSize () {
                        return ((Math.random() * .2) + .8) * target.size;
                    }
                    function randomSpeed (reverse) {
                        return (reverse?-1:1)*((.2 *  Math.random()) + .8) * 10;
                    }
                    function randomSprite () {
                        return target.sprites[parseInt(Math.random()*target.sprites.length)];
                    }
                    function randomHeight () {
                        const alt = h;
                        const dif = (h*.5);
                        return -(h)+(Math.random()*h*2);
                    }
                    const newobj = {
                        spriteSize ()
                        {
                            return (this.size*this.sprite.width);
                        },
                        randomX (){
                            return this.reverse ? w : -w-this.spriteSize ();
                        },
                        randomize ()
                        {
                            this.reverse = randomDirection();
                            this.sprite = randomSprite ();
                            this.size = randomSize ();
                            this.y = randomHeight () - this.spriteSize()/2;
                            
                            this.speed = randomSpeed (this.reverse);
                            
                            this.x = this.randomX();
                        }
                    };
                    newobj.randomize();
                    layer.objects.push(newobj);
                    if(layer.objects.length == maxObjs) 
                    {
                        target.#playing = false;
                        console.log(target.playing);
                        if(target.oncomplete) target.oncomplete(target);
                    }
                } else {
                    layer.objects.timer++;
                }
            }
        }
        const s = 1;

        ctx.translate(w, h);

        layer.objects.forEach((obj, i) => 
        {
            const objSize = obj.spriteSize ();
            if(!obj.reverse && obj.x > w + (objSize)) 
            {
                layer.objects.splice(i, 1);
                if(layer.objects.length == 0) {
                    this.#stopping = false;
                    this.#playing = false;
                    this.readyGo = true;
                    this.style["pointer-events"] = "none";
                    if(target.onfinish) target.onfinish(target);
                }
            } else
            if(obj.reverse && obj.x < -w-(objSize*2)) 
            {
                layer.objects.splice(i, 1);
                if(layer.objects.length == 0) {
                    this.#stopping = false;
                    this.#playing = false;
                    this.readyGo = true;
                    this.style["pointer-events"] = "none";
                    if(target.onfinish) target.onfinish(target);
                }
            } else
            if(obj.sprite && obj.sprite.complete) 
            {
                obj.x += obj.speed * target.speed;
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