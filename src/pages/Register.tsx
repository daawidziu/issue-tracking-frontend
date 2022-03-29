import {SubmitHandler, useForm} from "react-hook-form";
import styles from '../styles/pages/_Register.module.sass';
import stylesBtn from '../styles/components/_button.module.sass';
import infoIcon from '../images/info.png';
import Api from "../services/api";
import {useAuth} from "../contexts/AuthContext";
import {useState} from "react";
import {Navigate} from "react-router-dom";

type Inputs = {
    email: string,
    password: string
}

const Register = () => {
    const {register, handleSubmit, formState: {errors, isValid, isSubmitted}} = useForm<Inputs>();
    const [message, setMessage] = useState<string>('')
    const onSubmit: SubmitHandler<Inputs> = data => Api.post('auth/register', data)
        .then(response => {
            auth.dispatch({type: 'login'})
        })
        .catch(error => setMessage('Email already registered!'))

    const loginGuest = () => {
        Api.post('/auth/login', {
            email: 'guest@guest.guest',
            password: 'guest1234.'
        }).then(response => auth.dispatch({type: 'login'}))
    }

    const auth = useAuth();

    return (
        <div className={styles.registerContainer}>
            {auth.state.logged && <Navigate to='/' replace={true}/>}
            <h1 className={styles.registerTitle}>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
                <input type='email' placeholder={'email'} {...register('email',
                    {required: true, pattern: /[^@]+@[^@]+\.[^@]+/})} className={styles.registerInput}/>
                <input type='password' placeholder={'password'} {...register('password', {
                    required: true,
                    pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
                })} className={styles.registerInput}/>
                <span className={styles.registerInfo}>
                    <img src={infoIcon} alt={'Information icon'}/>
                    {' '} Your password must contain at least 8 characters, one symbol and number
                </span>
                <span className={styles.registerInfoError}>
                    {(!isValid && isSubmitted) ? 'Wrong password' : <br/>}
                </span>
                <span className={styles.registerInfoError}>
                    {message}
                </span>
                <input type='submit' value={'Register'}
                       className={stylesBtn.btn + ' ' + stylesBtn.btnSmall + ' ' + stylesBtn.btnSecondary}/>
            </form>
            <button className={stylesBtn.btn + ' ' + stylesBtn.btnSmall + ' ' + stylesBtn.btnOff} onClick={loginGuest}>
                Login as Guest
            </button>
        </div>
    );
}

export default Register;