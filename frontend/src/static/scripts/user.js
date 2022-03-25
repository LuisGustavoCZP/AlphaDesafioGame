import { RequestSys } from "./request.js";

const pages = 
[
    {
        key:"main", path:"/modules/main/",
        modals: 
        [

        ]
    },
    {
        key:"free", path:"/modules/mode-free/",
        modals: 
        [
            
        ]
    },
    {
        key:"ranked", path:"/modules/mode-ranked/",
        modals: 
        [
            
        ]
    },
]

class User
{
    #hasUser;
    #sessionData;
    data;
    match;
    constructor ()
    {
        this.#hasUser = false;
        this.#sessionData = this.#recoverCookie ();
        this.data = null;
        this.match = {};
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
            const thisuser = this;
            setTimeout(() => { thisuser.login(user); }, 500);
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
        window.modal.src="";

        console.log(gamePath, modalPath);
        if(window.game.src == gamePath)
        {
            if(modalPath) window.modal.src=modalPath;
            return;
        }

        window.transition.oncomplete = (target) => 
        {
            window.game.onload = (d)=> 
            {
                //console.log("Carregou janela "+d);
                if(modalPath) window.modal.src=modalPath;
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
                thisuser.goTo("modules/main/", !data.tutorial ? "windows/help" : "windows/main");
            }

            //console.log(thisuser.data);
            //thisuser.requestRanking();
            //thisuser.requestStages();
            //thisuser.requestBook();
            //thisuser.requestStock();

            /* console.log(thisuser.stages, thisuser.ranking); */
            /* 
            thisuser.requestBook();
             */
        }
    }

    /* start (stageid)
    {
        if(this.stages.length <= stageid-1) return;
        this.requestStage(stageid, (stage) => 
        {
            this.goTo("modules/game/");
        });
    }

    async stageWin ()
    {
        window.modal.src = "windows/gamewin";
    }

    async stageTimeout ()
    {
        window.modal.src = "windows/gameover";
        //this.goTo("modules/game/", );
    } */
    
    async sendItems (itens, callback)
    {
        console.log("Sending itens", itens);
        let response = undefined;
        const thisuser = this; 
        function userSuccess (data)
        {
            if(callback) callback(data);
            //thisuser.match.result = data;
            response = data;
        }
        await RequestSys.post("verifyRecipe", {"items":itens}, userSuccess, this.userError, {"sessionData":this.#sessionData});
        //thisuser.requestBook();
        return response;
    }

    /* async requestStage (stageid, callback)
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
    } */

    async requestDialog (callback)
    {
        let response = undefined;
        const thisuser = this;
        function userSucess (data)
        {
            response = data;
            /* thisuser.book = data; */
            console.log(data);
            if(callback){
                callback(data);
            }
        }
        await RequestSys.get("dialog/random", {params:{"sessionData":this.#sessionData}}, userSucess, this.userError);
        return response;
    }

    async requestTip (callback)
    {
        let response = undefined;
        const thisuser = this;
        function userSucess (data)
        {
            response = data;
            /* thisuser.book = data; */
            console.log(data);
            if(callback){
                callback(data);
            }
        }
        await RequestSys.get("dialog/tip", {params:{"sessionData":this.#sessionData}}, userSucess, this.userError);
        return response;
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
        return response;
    }

    async requestStock (callback)
    {
        let response = undefined;
        const thisuser = this;
        function userSucess (data)
        {
            thisuser.stock = data;
            response = data;
            console.log(data);
            if(callback){
                callback(data);
            }
        }
        await RequestSys.get("stock", {params:{"sessionData":this.#sessionData}}, userSucess, this.userError);
        return response;
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