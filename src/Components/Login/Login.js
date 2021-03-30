import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig'
import { useContext, useState } from 'react';
import { UserContenxt } from "../../App";
import { useHistory, useLocation } from "react-router";

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    // Old Login System
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        photo: '',
        email: ''
    })
    const [newUser, setNewUser] = useState(false)

    const [loggedinUser, setLoggedinUser] = useContext(UserContenxt)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    // Signed in 
                    console.log(res)
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.sucess = true
                    setUser(newUserInfo)
                    setLoggedinUser(newUserInfo)
                    updateUserName()
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.sucess = false
                    setUser(newUserInfo)
                    // ..
                });

        }

        const updateUserName = () => {
            const currentUser = firebase.auth().currentUser
            currentUser.updateProfile({ displayName: user.name, userId: 3 })
                .then(() => console.log('user name updated successful.'))
                .catch(err => console.log(err))
        }
        if (!newUser && user.email && user.password) {
            console.log('log in user.')
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    // Signed in
                    console.log(res)
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.sucess = true
                    setUser(newUserInfo)
                    setLoggedinUser(newUserInfo)
                    history.replace(from)
                    console.log(res.user.displayName)
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.sucess = false
                    setUser(newUserInfo)
                });
        }
    }
    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            isFormValid = e.target.value.length > 6
        }
        if (isFormValid) {
            const newUser = { ...user }
            newUser[e.target.name] = e.target.value
            setUser(newUser)
        }
    }
    // New Login System

    // Login Provider 
    const ghProvider = new firebase.auth.GithubAuthProvider();
    // Facebook Login
    const handleFacebookLogin = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const credential = result.credential;
                const user = result.user;
                const accessToken = credential.accessToken;
                console.log(user, accessToken)
                setUser(user)
                setLoggedinUser(user)
                history.replace(from)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
    }
    const handleGoogleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log(token, user)
                setUser(user)
                setLoggedinUser(user)
                history.replace(from)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
    }
    const handleGithubLogin = () => {
        firebase
            .auth()
            .signInWithPopup(ghProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                setUser(user, token)
                setLoggedinUser(user)
                history.replace(from)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
    }
    return (
        <div style={{ textAlign: 'center' }}>
            {
                loggedinUser.email ? <h2>{loggedinUser.email}</h2> : <></>
            }
            <h2>Authentic Login System</h2>
            <button onClick={handleFacebookLogin}>Log In With Facebook</button>
            <button onClick={handleGoogleLogin}>Log In With Google</button>
            <button onClick={handleGithubLogin}>Log In With Github</button>
            {
                user && <div>
                    <p>{user.displayName}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
            {/* Old Login */}
            <form onSubmit={handleSubmit}>
                <h2>Log in or register</h2>
                <input type="checkbox" name='newUser' onChange={() => setNewUser(!newUser)} />
                <label htmlFor="newUser">Don't have a account? Register now.</label>
                {newUser && <p>Name: <input type="text" name='name' onBlur={handleBlur} /></p>}
                <p>Email: <input name='email' required onBlur={handleBlur} type="email" /></p>
                <p>Password: <input required name='password' onChange={handleBlur} type="password" /></p>
                <input type="submit" placeholder='Button' />
            </form>
            {
                user.sucess ? <p style={{ color: 'green' }}>{newUser ? 'Registration' : 'Logged in'} sucessful.</p> : <p style={{ color: 'red' }}>{user.error}</p>
            }
        </div>
    );
}

export default Login;