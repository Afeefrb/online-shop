import React, {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Store from '../images/store.png';
import './Signin.css';
import M from 'materialize-css';

//firebase
import {auth,db} from '../firebase';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const signinHandler = (e) => {
        e.preventDefault();
        if(!email || !password) {
           return M.toast({html:`Please enter email and password.`})
        }
        auth
            .signInWithEmailAndPassword(email,password)
            .then(auth => {
                if(auth) {
                    //console.log(auth)
                    M.toast({html:`Logged in successfully`,classes:"toast__success"})
                    history.push("/")
                    //# auth => {user.email,displayName,photoURL,refreshToken}
                }
            }).catch(error => {
                console.log(error);
                if(error = 'auth/invalid-email'){

                return M.toast({html:`Email does not exist.`, classes:"toast__failure"})

                }
                M.toast({html:`No user found. Please create a new account.`})
    
            })

    }

    const signupHandler = (e) => {
        e.preventDefault();
        if(!email || !password) {
            M.toast({html:`Please enter email and password to create an account.`,classes:"toast__failure"})
        }
        auth.createUserWithEmailAndPassword(email,password)
          
            .then((auth) => {
                M.toast({html:`Account created successfully`,classes:"toast__success"})
                // console.log(auth)
                if(auth) {
                    history.push("/")
                }
            })
            .catch((error) => console.log(error.message))

            //# auth => {user.email,displayName,photoURL,refreshToken}
        
        setEmail("");
        setPassword("");
    }

    return (
        <div className="login">
           <Link to="/">

                    <div className="login__title__logo">


                        <div className="login__title">
                            <h1>Online Shop</h1>
                        </div>

                        <div >
                            <img className="login__logo" src={Store} alt="store" />
                                
                        </div>

                    </div>


           </Link>

            <div className="login__container">
                <h1>Sign In</h1>

              

                <form className="login__form" action="">
                    <h5>Email</h5>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => (setEmail(e.target.value))} />

                    <h5>Password</h5>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => (setPassword(e.target.value))} />
                    <br></br>

                    <button
                      type="submit"
                      className="login__signInButton"
                      onClick={signinHandler}>Login</button>

                    <p>By signing in you agree to the Online Shop's conditions. Please see our Privacy Notice, Cookies Notice, and our Interest-Based Ads Notice.</p>

                    <button onClick={signupHandler} className="login__createAccButton">Create a new account</button>

                </form>
            </div>

        </div>
    )
}

export default Login
