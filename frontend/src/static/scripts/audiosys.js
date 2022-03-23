class AudioSys extends HTMLElement
{
    sounds;
    channels = {};
    #volume;
    #volumes;
    constructor()
    {
        super();
        
        if(this.hasAttribute("volume"))
        {
            this.#volume = this.getAttribute("volume");
        }
        else 
        {
            this.#volume = 1;
        }

        if(this.hasAttribute("channels"))
        {
            const channels = this.getAttribute("channels").replace(" ", "").split(",");
            channels.forEach(channel => 
            {
                const keypair = channel.split(":");
                this.channels[keypair[0]] = {"volume":keypair[1]?keypair[1]:1, "audios":new Audio()};
            });
        } else {
            const channels = ["music:.01", "ui:.1", "sfx:.5"];
            channels.forEach(channel => 
            {
                const keypair = channel.split(":");
                const volume = keypair[1]?parseFloat(keypair[1]):1;
                const newaudio = new Audio();
                newaudio.volume = volume * this.#volume;
                this.channels[keypair[0]] = {"volume":volume, "audio":newaudio};
            });
        }

        this.#volumes = this.#createvolumes ();
    }

    set volume (value)
    {
        this.#volume = value;
        for(let chkey in this.channels)
        {
            const ch = this.channels[chkey];
            ch.audio.volume = ch.volume*value;
        }
    }

    get volume ()
    {
        return this.#volume;
    }

    get volumes ()
    {
        return this.#volumes;
    }

    #createvolumes ()
    {
        const vols = {};
        for (const key in this.channels) {
            const channel = this.channels[key];
            vols[key] = (value) => 
            { 
                channel.volume = value;
                channel.audio.volume = value * this.volume; 
            };
        }
        return vols;
    }

    error () 
    {
        this.playAudio("ui", "audios/ui/error_001.ogg");
    }

    click ()
    {
        this.playAudio("ui", "audios/ui/click_001.ogg");
    }

    select () 
    {
        this.playAudio("ui", "audios/ui/select_001.ogg");
    }

    drag () 
    {
        this.playAudio("ui", "audios/ui/switch_001.ogg");
    }

    drop () 
    {
        this.playAudio("ui", "audios/ui/drop_001.ogg");
    }

    start ()
    {
        this.playAudio("ui", "audios/ui/maximize_001.ogg");
    }

    stop ()
    {
        this.playAudio("ui", "audios/ui/minimize_001.ogg");
    }

    open ()
    {
        this.playAudio("ui", "audios/ui/open_001.ogg");
    }

    close ()
    {
        this.playAudio("ui", "audios/ui/close_001.ogg");
    }

    hard ()
    {
        this.playAudio("ui", "audios/ui/glass_001.ogg");
    }

    tick ()
    {
        this.playAudio("ui", "audios/ui/tick_001.ogg")
    }

    sucess ()
    {
        this.playAudio("ui", "audios/ui/confirmation_001.ogg");
    }

    music1 () 
    {
        this.playAudio("music", "audios/musics/music1.wav");
    }

    play (sound)
    {
        this[sound]();
    }

    playAudio (_channel, src)
    {
        const channel = this.channels[_channel];
        if(!channel) return;
        //console.log("Audio ", src, " ", channel.audio.ended);
        if(channel.audio.src && !channel.audio.ended) return;
        channel.audio.volume = channel.volume * this.volume;
        channel.audio.src = src;
        if(_channel == "music") channel.audio.loop = true;
        else channel.audio.loop = false;
        channel.audio.play();
        //console.log(channel, src, this);
    }

    static define ()
    {
        console.log("Iniciou AudioSys");
        /* customElements.define('modal', Modal); */
        customElements.define('game-audio', AudioSys);
    }
}

AudioSys.define();

export {AudioSys};