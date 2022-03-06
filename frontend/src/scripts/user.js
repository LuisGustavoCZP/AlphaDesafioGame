import { RequestSys } from "/scripts/request.js";

class User
{
    #hasUser;
    #userData;
    data;

    constructor ()
    {
        this.#hasUser = false;
        this.#userData = this.#recoverCookie ();
        this.data = null;
        
    }

    #createCookie (userData) 
    {
        const date = new Date();
        date.setTime(date.getTime() + 1000*60*5); //31536000000
        return `userData=${userData}; expires=${date.toGMTString()}; SameSite=None; Secure;path=/`; //;domain=localhost:8080
    }

    #recoverCookie () {
        const cookie = document.cookie;
        const cookieValues = cookie.split(";");
        //console.log(cookieValues);
        return cookieValues[0].replace("userData=", "");
    }

    login (user)
    {
        if(this.#hasUser) return;

        fetch(`${RequestSys.URL()}login`, 
        {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({"user":user}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((resp) => resp.json())
        .then(data => 
        {
            const status = data;
            //console.log(data)
            if(status == 1 || status == 2){
                //alert("Login ou Senha invalidos!");
                this.newuser(user);
            } 
            else/*  if(status == 0) */
            {
                this.#hasUser = true;
                document.cookie = this.#createCookie(data.userData);
                this.#userData = this.#recoverCookie ();
                this.update();
                parent.modal.src = "";
            }
        })
        .catch(resp => { console.log(resp); });
    }

    newuser (user)
    {
        if(this.#hasUser) return;

        fetch(`${RequestSys.URL()}newuser`, 
        {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({"user":user}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((resp) => resp.json())
        .then(data => 
        {
            const status = data;
            this.login(user);
        })
        .catch(resp => { console.log(resp); });
    }

    userError = (data, unable) =>
    {
        this.#hasUser = false;
        console.log(unable);
        if(unable)
        {
            window.game.src="modules/error/index.html";
        } else {
            this.goTo("modules/main/", "modules/windows/login/");
            
        }
    }

    goTo (gamePath, modalPath)
    {
        /* if(!window.transition.readyGo) {
            if(this.stackGo) this.stackGo++;
            else this.stackGo = 1;
            window.transition.speed *= (1+this.stackGo);
            window.transition.onfinish = () => {delete this.stackGo;};
            return;
        } */
        window.transition.oncomplete = (target) => 
        { 
            console.log(target);
            window.transition.stop();
            //console.log(target);
            window.game.src=gamePath;
            if(modalPath) window.modal.src=modalPath;
            window.transition.play();
            //console.log(window.transition.playing);
        };
        window.transition.play();
    }

    update (callback) 
    {
        RequestSys.get("user", {params:{"userData":this.#userData}}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.#hasUser = true;
            thisuser.data = data;
            //window.modal.src="";
            if(callback){
                callback(data);
            } else {
                thisuser.goTo("modules/main/", !data.tutorial ? "modules/windows/howToPlay" : undefined);
            }

            console.log(thisuser.data.stages);
            thisuser.requestRanking();
            thisuser.requestStages();
            thisuser.requestBook();
            thisuser.requestStock();

            /* console.log(thisuser.stages, thisuser.ranking); */
            /* 
            thisuser.requestBook();
             */
        }
    }

    start (stage)
    {
        console.log(stage);
        if(this.stages.length <= stage-1) return;
        this.stage = stage;
        this.goTo("modules/game/");
        /* window.game.src="modules/game/";
        window.modal.src=""; */
    }

    requestStages (callback)
    {
        RequestSys.get("stages", {params:{"userData":this.#userData}}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.stages = data;
            if(callback){
                callback(data);
            }
        }
    }

    requestBook (callback)
    {
        RequestSys.get("book", {params:{"userData":this.#userData}}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.book = data;
            console.log(data);
            if(callback){
                callback(data);
            }
        }
    }

    requestStock (callback)
    {
        RequestSys.get("stock", {params:{"userData":this.#userData}}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.stock = data;
            console.log(data);
            if(callback){
                callback(data);
            }
        }
    }

    requestRanking (callback)
    {
        RequestSys.get("ranking/5", {}, userSucess, this.userError); //params:{"userData":this.#userData}
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.ranking = data;
            console.log(data);
            if(callback){
                callback(data);
            }
        }
    }
}

export { User };