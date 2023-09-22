import { useState } from 'react';
import './register.css';

const initialstate = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
    mobile: ''
};

const initialstateErr = {
    email: '',
    password: '',
    cpassword: '',
    mobile: '',
}


const Register = () => {

    const [data, setData] = useState(initialstate);
    const [errors, setErrors] = useState(initialstateErr);
    const [msg, setMsg] = useState()

    const validateEmail = (email) => {
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailReg.test(email)
    };

    const validateMobile = (mobile) => {
        const mobileReg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        return mobileReg.test(mobile)
    };

    const validatePassword = (password) => {
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(.{8,})$/;
        return passwordReg.test(password)
    };


    const isAnyFieldFilled = Object.values(data).some(field => field.trim() !== '');


    const changeHeandle = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: value
        });

        let err;
        if (name === 'email') {
            err = validateEmail(value) ? '' : "Invalid email Address";
        } else if (name === 'mobile') {
            err = validateMobile(value) ? '' : "Invalid mobile number";
        } else if (name === 'password') {
            err = validatePassword(value) ? '' : "password is to week";
        } else if (name === 'cpassword') {
            err = value === data.password ? '' : "password do not match";
        }

        setErrors({
            ...errors,
            [name]: err
        });

    };


    const submitform = (e) => {
        e.preventDefault()
        let field = data.email === '' || data.password === "" || data.mobile === '' || data.name === '';

        if (field) {
            setMsg('Please Fullfill The Form')
        } else {
            setMsg('Form Submit Successfully');
            setData(initialstate);
        }
    };

    const design = (
        <>
            <div className="form">
                <div class="container">
                    <h2>Hey buddy register!</h2>
                    <span className='msg'>{msg}</span>

                    <div class="form-control">
                        <label for="username">Username</label>
                        <input type="text" id="username"
                            placeholder="Enter username"
                            name='name' value={data.name}
                            onChange={changeHeandle} required />
                    </div>

                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="text" id="email"
                            placeholder="Enter email"
                            name='email' value={data.email}
                            onChange={changeHeandle} required />
                        <div className="error">{errors.email}</div>
                    </div>

                    <div class="form-control">
                        <label for="tel">Mobile</label>
                        <input type="tel" id="tel"
                            placeholder="Enter Mobile"
                            name='mobile' value={data.mobile}
                            onChange={changeHeandle} required />
                        <div className="error">{errors.mobile}</div>
                    </div>

                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" id="password"
                            placeholder="Enter password"
                            value={data.password} required
                            name='password'
                            onChange={changeHeandle} />
                        <div className="error">{errors.password}</div>
                    </div>

                    <div class="form-control">
                        <label for="password2">Confirm password</label>
                        <input
                            type="password"
                            id="password2"
                            value={data.cpassword}
                            placeholder="Renter your password"
                            name='cpassword'
                            onChange={changeHeandle}
                        />
                        <div className="error">{errors.cpassword}</div>
                    </div>
                    {isAnyFieldFilled &&
                        <button type="submit" onClick={submitform}>
                            Sing up
                        </button>
                    }
                </div>
            </div>
        </>
    );

    return design;

}



export default Register;