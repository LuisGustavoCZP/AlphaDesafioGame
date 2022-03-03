import { RequestSys } from "/scripts/request.js";

class User
{
    #hasUser;
    #userData;

    constructor ()
    {
        this.#hasUser = false;
        const cookie = document.cookie;
        const cookieValues = cookie.split(";");
        console.log(cookieValues);
        this.#userData = cookieValues[0].replace("userData=", "");
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
            console.log(data)
            if(status == 1 || status == 2 ){
                alert("Login ou Senha invalidos!");
            } 
            else/*  if(status == 0) */
            {
                this.#hasUser = true;
                this.#userData = `userData=${data.userData}; expires=${(new Date()).getTime() + (1000*60*5)}; SameSite=None; Secure;path=/`; //;domain=localhost:8080
                document.cookie = this.#userData;
                parent.game.src = "../modules/game/index.html";
                parent.modal.src = "";
            }
        })
        .catch(resp => { console.log(resp); });
    }

    newuser (user)
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
            console.log(data)
            if(status == 1 || status == 2 ){
                alert("Login ou Senha invalidos!");
            } 
            else/*  if(status == 0) */
            {
                const status = data;
                console.log(data);
                if(status == 1 ){//already exists 
                    this.login(username);
                } else if(status == 0){ //New user created
                    this.login(username);  
                }
            }
        })
        .catch(resp => { console.log(resp); });
    }

    update () 
    {
        console.log(this.#userData);
        
        RequestSys.get("user", {params:{"userData":this.#userData}}, UserSucess, UserError);
        
        function UserSucess (data)
        {
            window.game.src="modules/game/index.html";
        }

        function UserError (data)
        {
            window.game.src="modules/main/index.html";
        }
    }
}

export { User };