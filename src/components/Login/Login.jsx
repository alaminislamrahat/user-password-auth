import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [loginError, setLoginError] = useState('');
    const emailRef = useRef(null);
    // success message 

    const handleSuccessLogin = () => {
        toast.warn('success fully Login!!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
    }

    // error message 
    const handleErrorLogin = () => {
        toast.error('error bellow', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
    }

    // varified error 
    const handleEmailVarifiedError = () => {
        toast.error('Please varifed by your email!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
    }



    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset 
        setLoginError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if(user.emailVerified){
                    handleSuccessLogin();
                }
                else{
                    handleEmailVarifiedError();
                }
               
            })

            .catch(error => {
                console.log(error.message);
                setLoginError(error.message);
                handleErrorLogin();
            })
    }

    // forget password 
    const handleForgetPass = () => {
       const email = emailRef.current.value;
        if(!email){
            console.log('plz provide an email');
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('plz emter valid email');
            return;
        }
        // reset pass word 
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('plz cheack your email');
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-pink-600">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    {
                        loginError && <p className="text-4xl font-bold text-red-600">{loginError}</p>
                    }
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="email"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPass} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-secondary">Login</button>
                            <p>new to this website please <Link to="/heroregister"><a className="text-pink-800 font-bold" href="">Register</a></Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;