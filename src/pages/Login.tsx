import {SubmitHandler, useForm} from "react-hook-form";
import styles from '../styles/pages/_Login.module.sass';
import stylesBtn from '../styles/components/_button.module.sass';
import Api from "../services/api";
import {useAuth} from "../contexts/AuthContext";
import { Navigate} from "react-router-dom";

type Inputs = {
    email: string,
    password: string
}

const Login = () => {
    const {register, handleSubmit, formState: {errors, isValid, isSubmitted}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => Api.post('auth/login', data)
        .then(response => auth.dispatch({type: 'login'}))
        .catch(reason => console.log(reason))

    const loginGuest = () => {
        Api.post('/auth/login', {
            email: 'guest@guest.guest',
            password: 'guest1234.'
        }).then(response => auth.dispatch({type: 'login'}))
    }

    const auth = useAuth();

    return (
        <div className={styles.loginContainer}>
            {auth.state.logged && <Navigate to='/' replace={true}/>}
            <h1 className={styles.loginTitle}>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                <input type='email' placeholder={'email'} {...register('email',
                    {required: true})} className={styles.loginInput}/>
                <input type='password' placeholder={'password'} {...register('password', {
                    required: true})} className={styles.loginInput}/>
                <span className={styles.loginInfoError}>
                    {(!isValid && isSubmitted) ? 'Wrong email or password' : <br/>}
                </span>
                <input type='submit' value={'Login'} className={stylesBtn.btn + ' ' + stylesBtn.btnSmall + ' ' + stylesBtn.btnSecondary}/>
            </form>
            <button className={stylesBtn.btn + ' ' + stylesBtn.btnSmall + ' ' + stylesBtn.btnOff} onClick={loginGuest}>
                Login as Guest
            </button>
        </div>
    );
}

export default Login;