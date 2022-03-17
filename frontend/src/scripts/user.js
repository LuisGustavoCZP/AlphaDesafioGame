import { RequestSys } from "/scripts/request.js";

class User
{
    #hasUser;
    #sessionData;
    data;
    stage;

    constructor ()
    {
        this.#hasUser = false;
        this.#sessionData = this.#recoverCookie ();
        this.data = null;
        this.stage = null;
    }

    #createCookie (sessionData) 
    {
        const date = new Date();
        date.setTime(date.getTime() + 1000*60*60); //31536000000
        return `sessionData=${sessionData}; expires=${date.toGMTString()}; SameSite=None; Secure;path=/`; //;domain=localhost:8080
    }

    #removeCookie () 
    {
        document.cookie = `sessionData=; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure;path=/`;
    }

    #recoverCookie () {
        const cookie = document.cookie;
        if(cookie=="") return null;
        const cookieValues = cookie.split(";");
        console.log(cookieValues);
        return cookieValues[0].replace("sessionData=", "");
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
                window.audiosys.play("error");
            } 
            else/*  if(status == 0) */
            {
                this.#hasUser = true;
                document.cookie = this.#createCookie(data.sessionData);
                this.#sessionData = this.#recoverCookie ();
                window.audiosys.play("sucess");
                
                parent.modal.src = "";
                this.update();
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
        this.#removeCookie();
        console.log(unable);
        if(unable)
        {
            window.game.src="modules/error/index.html";
        } else {
            this.goTo("modules/splash/");
        }
    }

    goTo (gamePath, modalPath)
    {
        if(modalPath) window.modal.src=modalPath;

        if(window.game.src == gamePath)
        {
            return;
        }

        window.transition.oncomplete = (target) => 
        {
            window.game.onload = (d)=> 
            {
                //console.log("Carregou janela "+d);
                window.transition.revert();
            };
            window.game.src=gamePath;
        };
        window.transition.play();
    }

    update (callback)
    {
        if(this.#sessionData == null) 
        {
            this.userError(this.#sessionData, false);
            return;
        }
        /* let ns = Object.keys(this.#sessionData);
        let n = ns.reduce((n, p) => n + p, ""); */
        console.log(`Update para`, this.#sessionData);
        const params = {"sessionData":this.#sessionData};
        
        RequestSys.get("user", {params}, userSucess, this.userError);
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.#hasUser = true;
            thisuser.data = data;
            //window.modal.src="";
            if(callback){
                callback(data);
            } else {
                thisuser.goTo("modules/main/", !data.tutorial ? "modules/windows/howToPlay" : "modules/windows/main");
            }

            //console.log(thisuser.data);
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

    start (stageid)
    {
        if(this.stages.length <= stageid-1) return;
        this.requestStage(stageid, (stage) => 
        {
            this.goTo("modules/game/");
        });
    }

    async stageWin ()
    {
        window.modal.src = "modules/windows/gamewin";
        //this.requestRanking();
        /* this.requestStages();
        this.requestBook();
        this.requestStock();
        this.goTo("modules/game/", "modules/windows/stages"); */
    }

    async stageTimeout ()
    {
        window.modal.src = "modules/windows/gameover";
        //this.goTo("modules/game/", );
    }
    
    async sendItems (itens)
    {
        let response = undefined;
        function userSuccess (data)
        {
            response = data;
        }
        await RequestSys.post("stage", {"items":itens}, userSuccess, this.userError, {"sessionData":this.#sessionData});
        return response;
    }

    async requestStage (stageid, callback)
    {
        const thisuser = this; 
        function userSucess (data)
        {
            console.log(data);
            thisuser.stage = stageid;
            thisuser.currentStage = data;
            if(callback){
                callback(data);
            }
        }
        const response = await RequestSys.get("stage/prepare", {params:{"sessionData":this.#sessionData}, query:{"stage":stageid}}, userSucess, this.userError);
    }

    async requestStageStart (callback)
    {
        const thisuser = this; 
        function userSucess (data)
        {
            console.log(data);
            thisuser.currentStage.expiration = data;
            if(callback){
                callback(data);
            }
        }
        const response = await RequestSys.get("stage", {params:{"sessionData":this.#sessionData}}, userSucess, this.userError);
    }

    async requestStages (callback)
    {
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.stages = data;
            if(callback){
                callback(data);
            }
        }
        const response = await RequestSys.get("stages", {params:{"sessionData":this.#sessionData}}, userSucess, this.userError);
    }

    async requestBook (callback)
    {
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.book = data;
            console.log(data);
            if(callback){
                callback(data);
            }
        }
        const response = await RequestSys.get("book", {params:{"sessionData":this.#sessionData}}, userSucess, this.userError);
    }

    async requestStock (callback)
    {
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.stock = data;
            console.log(data);
            if(callback){
                callback(data);
            }
        }
        const response = await RequestSys.get("stock", {params:{"sessionData":this.#sessionData}}, userSucess, this.userError);
    }

    async requestRanking (callback)
    {
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.ranking = data;
            console.log(data);
            if(callback){
                callback(data);
            }
        }
        const response = await RequestSys.get("ranking/5", {}, userSucess, this.userError); //params:{"userData":this.#userData}
    }
}

export { User };