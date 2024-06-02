import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Register = () => {
    const handleForm = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, 'password',password);

        // creat user 
        createUserWithEmailAndPassword(auth,email,password)
        .then(result => {
            const user = result.user;
            console.log(user)
        })
        .catch(error =>{
            console.log(error.message)
        })
    }
    return (
        <div>
            <div className="md:w-1/2 mx-auto">
                <h2>this is register</h2>
                <form onSubmit={handleForm}>
                    <input className="w-3/4 mb-2 border" type="email" name="email" id="" /><br />
                    <input className="w-3/4 mb-2 border" type="password" name="password" id="" /><br />
                    <input  className="w-3/4 btn btn-secondary" type="submit" name="submit" id="" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;