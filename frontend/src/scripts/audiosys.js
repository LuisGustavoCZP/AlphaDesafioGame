class AudioSys extends HTMLElement
{
    sounds;
    channels = {};
    constructor()
    {
        super();
        
        if(this.hasAttribute("channels"))
        {
            const channels = get.hasAttribute("channels").replace(" ", "").split(",");
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
                newaudio.volume = volume;
                this.channels[keypair[0]] = {"volume":volume, "audio":newaudio};
            });
        }

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
        this.playAudio("music", "audios/music1.wav");
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
        channel.audio.volume = channel.volume;
        channel.audio.src = src;
        if(_channel == "music") channel.audio.loop = true;
        else channel.audio.loop = false;
        channel.audio.play();
        //console.log(channel, src, this);
    }

    static define ()
    {
        console.log("Iniciou Crafter");
        /* customElements.define('modal', Modal); */
        customElements.define('game-audio', AudioSys);
    }
}

AudioSys.define();

export {AudioSys};