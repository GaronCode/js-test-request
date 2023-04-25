class UserService {
    #_password;
    #_username;
    #_url = "https://examples.com/api/authenticate"

    constructor({username, password}) {
        this._username = username;
        this._password = password;
    }

    get username() {return this._username }
    set username(v) {}

    authenticateUser({done, err}) {
        let xhr = new XMLHttpRequest()
        xhr.open("POST", this._url)
        xhr.send({username: this._username, password: this._password})
        xhr.onload = ()=>{
            switch (xhr.status) {
                case 200:
                    done(xhr.response)
                    break;
            
                default:
                    err(`${xhr.status}: ${xhr.statusText}`)
            }
        }
    }
}


document.querySelector('#login').addEventListener('click', auth);


function auth() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value

    const User = new UserService({username, password})

    User.authenticateUser({
        done: ()=>document.location.href = '/home',
        err: (errText)=> {
            alert('authentication error')
            console.log(errText);
        }
    })
}




