class Weather 
{
    constructor()
    {
        this.readyDraw = false;
    }

    load (spriteData)
    {
        const sprite = new Image();
        sprite.onload = () => 
        {
            this.readyDraw = true;
        }
        sprite.onloadstart = () => 
        {
            this.readyDraw = false;
        }

        this[spriteData.name] = sprite;
        sprite.src = spriteData.source;
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */
    draw(context, posX, posY, size, sprite) {
        const sX = size * this[sprite].width;
        const sY = size * this[sprite].height;
        //console.log(posX, posY);
        posX = posX - (sX/2);
        posY = posY - (sY/2);
        
        if(this.readyDraw)
        {
            context.drawImage(this[sprite], posX, posY)
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */
    frame (context, posX, posY, size)
    {
        
    }
}

class WeatherDay extends Weather
{
    constructor()
    {
        super();
        load({"name":"nuvem", "source":"images/particles/smoke_01.png"});
    }

    frame (context)
    {
        
    }
}

class WeatherSys extends HTMLElement
{
    #current;
    #playing;
    #ready;
    #layers;
    #possibles;

    constructor()
    {
        super();
        const p = this.parentElement.getBoundingClientRect();
        //console.log(p);
        this.style.position = "absolute";
        /* this.width = p.width;
        this.height = p.height; */
        this.style.display = "flex";
        this.style.flexGrow = "1";
        this.style.width = `${p.width}px`;
        this.style.height = `${p.height}px`;
        this.style.overflow = "hidden";
        //this.#current = null;
        this.#playing = false;
        this.#ready = false;
        this.#layers = [];
        this.sprites = [];
        this.max = 0;
        this.layerDist = 0;
        this.layerZ = 0;
        
        if(this.hasAttribute('play')) {
            this.#playing = this.getAttribute('play') == "false"? false : true;
        }

        if(this.hasAttribute('density')) {
            const m = parseFloat(this.getAttribute('density'));
            this.density = m;
        }
        else
        {
            this.density = 0.5;
        }

        if(this.hasAttribute('size')) {
            const s = parseInt(this.getAttribute('size'));
            this.size = s;
        }
        else
        {
            this.size = 1;
        }

        if(this.hasAttribute('speed')) {
            const s = parseFloat(this.getAttribute('speed'));
            this.speed = s;
        } 
        else
        {
            this.speed = 1;
        }

        if(this.hasAttribute('layers')) 
        {
            const lys = this.getAttribute('layers').replaceAll(" ", "").split(",");
            //console.log(lys);
            if(lys.length == 0)
            {
                this.#createLayer(0);
            } 
            else
            {
                lys.forEach(ly => 
                {
                    const z = parseInt(ly);
                    this.#createLayer(z);
                    this.layerDist = z - this.layerDist;
                });
                this.layerDist = Math.abs(this.layerDist);
            }
        } else {
            this.#createLayer(0);
        }

        if(this.hasAttribute('sprites')) {
            const srcs = this.getAttribute('sprites').replaceAll(" ", "").split(",");
            srcs.forEach(src => {
                const newSprite = new Image();
                newSprite.src = src;
                this.sprites.push(newSprite);
            });
        } else {
            const srcs = ["images/background/clouds/cloud1.png", "images/background/clouds/cloud2.png", "images/background/clouds/cloud3.png", "images/background/clouds/cloud4.png", "images/background/clouds/cloud5.png", "images/background/clouds/cloud6.png", "images/background/clouds/cloud7.png", "images/background/clouds/cloud8.png"];
            srcs.forEach(src => {
                const newSprite = new Image();
                newSprite.src = src;
                this.sprites.push(newSprite);
            });
        }

        if(this.#playing){
            this.Play();
        }
    }

    static define ()
    {
        console.log("Iniciou Weather");
        customElements.define('game-weather', WeatherSys);
    }

    get playing ()
    {
        return this.#playing;
    }

    #createLayer(z) 
    {
        const r = this.getBoundingClientRect();
        const newcanvas = document.createElement("canvas");
        newcanvas.style = "position: absolute;" + " z-index:" + z + ";";
        newcanvas.width = r.width;
        newcanvas.height = r.height;
        this.#layers.push({ "canvas":newcanvas, "context":newcanvas.getContext("2d"), "z":z, "objects":[]});
        this.prepend(newcanvas);
        return newcanvas;
    }

    Play ()
    {
        this.#playing = true;
        this.loop(this);
    }

    Stop ()
    {
        this.#playing = false;
    }

    loop (target)
    {
        if(target.playing == false) return;
        window.requestAnimationFrame(() => target.loop(target), target);

        const mds = target.density / target.speed;

        if(target.#ready || true)
        {
            this.#layers.forEach((layer, i) => 
            {
                const w = layer.canvas.width/2, h = layer.canvas.height/2;
                const ctx = layer.context;
                ctx.clearRect(0,0,w*2,h*2);

                if(!layer.objects) 
                {
                    layer.objects=[];
                }
                
                const sr = ((target.layerDist/2)+layer.z)/target.layerDist, s = .5+.5*(sr);
                //console.log(s);

                ctx.translate(w, h);
                
                if(layer.objects.length < target.density*mds*30*(1/s))
                {
                    if(layer.objects.timer == undefined || layer.objects.timer > 0 * (1/mds))
                    {
                        layer.objects.timer = 0;
                        const sprites = target.sprites;
                        const spd = target.speed;
                        const newobj = {
                            "x": (Math.random()*h*4)-h*2,
                            "y": -h+(Math.random()*50+15)*(1/s),
                            "size": (Math.random()*.5 + .5)*s*.5,
                            "speed": ((.1 *  Math.random())+.3)*s*spd,
                            "sprite":sprites[parseInt(Math.random()*sprites.length)],
                            randomize ()
                            {
                                this.x = -w+(Math.random()*100)-200;
                                this.y = -h+(Math.random()*50+15)*(1/s);
                                this.size = (Math.random()*.5 + 0.5)*s * .5;
                                this.speed = ((.1 *  Math.random())+.3) * s * spd;
                                const spriteid = parseInt(Math.random()*sprites.length);
                                this.sprite = sprites[spriteid];
                            }
                        };
                        //newobj.randomize();
                        layer.objects.push(newobj);
                    } else {
                        layer.objects.timer++;
                    }
                }

                layer.objects.forEach(obj => 
                {
                    obj.x += obj.speed;
                    if(obj.x > w + 100) 
                    {
                        obj.randomize();
                    }

                    //console.log(this.current.width);

                    //console.log(sprite);
                    if(obj.sprite && obj.sprite.complete) ctx.drawImage(obj.sprite, obj.x, obj.y, obj.sprite.width*obj.size, obj.sprite.height*obj.size);
                    //ctx.fillStyle = "lightgrey";
                    //ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
                });

                ctx.translate(-w, -h);
            });
        }
    }
}
WeatherSys.define();

export { Weather, WeatherDay, WeatherSys };