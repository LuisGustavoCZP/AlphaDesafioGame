class SoundSys 
{
    constructor ()
    {
        this.soundTremor = new Audio('assets/sons/Retro Impact Water 03.wav');
        this.music = new Audio('assets/sons/music1.wav');
    }
    
    /* Toca a musica de fundo */
    musicPlay()
    {
        this.music.loop = true;
        this.music.volume = 0.05;
        this.music.play();
    }

    /* Toca um som do item sendo jogado no caldeirão */
    droppingSound(){
        const soundDrop = new Audio('assets/sons/Retro Blop StereoUP 04.wav');
        soundDrop.play();
    }

    /* Toca um som quando os itens brilham */
    shineSound(){
        const soundShine = new Audio('assets/sons/Retro Event UI 01.wav');
        soundShine.play();
    }

    /* Efeito sonoro de quando a poção sai do caudeirão */
    potionSfx(){
        const createdPotion = new Audio('assets/sons/Retro Charge Magic 11.wav');
        createdPotion.play();
    }

    wrongSfx(){
        const wrongChoice = new Audio('assets/sons/Retro Negative Short 23.wav');
        wrongChoice.play();
    }

    tremor(){
        const soundTremor = new Audio('assets/sons/Retro Impact Water 03.wav');
        soundTremor.play();
    }
}

export { SoundSys };