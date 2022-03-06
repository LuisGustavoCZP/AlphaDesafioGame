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
        
       const p = this.getBoundingClientRect();
       this.width = p.width;
       this.height = p.height;
       this.readyGo = true;
    }

    /**
     * @param {Number} num
     */
     set width (num) {
        this.style.width = `${num}px`;
        super.width = num;
        this.layer.width = num;
    }

    /**
     * @param {Number} num
     */
    set height (num) {

        this.style.height = `${num}px`;
        super.height = num;
        this.layer.height = num;
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
        const r = this.getBoundingClientRect();
        const newcanvas = document.createElement("canvas");
        newcanvas.style = "position: absolute;" + " z-index:" + z + ";";
        newcanvas.width = r.width;
        newcanvas.height = r.height;
        const layer = { "canvas":newcanvas, "context":newcanvas.getContext("2d"), "z":z, "objects":[]};
        this.layer = layer;
        
        this.prepend(newcanvas);
        const target = this;
        const w = layer.canvas.width/2, h = layer.canvas.height/2;
        
        return newcanvas;
    }

    play ()
    {
        if(this.playing) return;
        this.#playing = true;
        this.readyGo = false;
        this.loop(this);
    }

    stop ()
    {
        this.#stopping = true;
        //layer.objects=[];
    }

    layerloop (target, layer)
    {
        //const mds = (target.density / target.speed);
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
                        return ((Math.random() * .5) + .5) * target.size;
                    }
                    function randomSpeed (reverse) {
                        return (reverse?-1:1)*((.5 *  Math.random()) + .5) * 5;
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
                        //console.log(layer.objects.length, maxObjs, target.oncomplete);
                        target.#playing = false;
                        console.log(target.playing);
                        if(target.oncomplete) target.oncomplete(target);
                    }
                } else {
                    layer.objects.timer++;
                }
            }
        }
        //const sr = ((target.layerDist/2)+layer.z)/target.layerDist, s = .2+.8*(sr);
        const s = 1;

        ctx.translate(w, h);

        layer.objects.forEach((obj, i) => 
        {
            const objSize = obj.spriteSize ();
            if(!obj.reverse && obj.x > w + (objSize*2)) 
            {
                layer.objects.splice(i, 1);
                if(layer.objects.length == 0) {
                    this.#stopping = false;
                    this.#playing = false;
                    this.readyGo = true;
                    if(target.onfinish) target.onfinish(target);
                }
                
            } else
            if(obj.reverse && obj.x < -w-(objSize*2)) 
            {
                layer.objects.splice(i, 1);
            } else
            if(obj.sprite && obj.sprite.complete) 
            {
                obj.x += obj.speed * target.speed;
                ctx.drawImage(obj.sprite, obj.x, obj.y, obj.sprite.width*obj.size, obj.sprite.height*obj.size);
            }
        });
        //console.log(layer.objects.length);
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