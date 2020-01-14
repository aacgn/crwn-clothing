import React from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password:  '',
            confirmPassword: ''
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password:  '',
                confirmPassword: ''
            });
        } catch(error) {
            console.log(error);
        }

    }

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
                <div className="sign-up">
                    <h2>I do not have an account</h2>
                    <span>Sign up with your email and password</span>
                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                            label="display name" 
                            name="displayName" 
                            type="text" 
                            value={this.state.displayName} 
                            handleChange={this.handleChange}
                            required
                        />
                        <FormInput
                            label="email" 
                            name="email" 
                            type="email"
                            value={this.state.email}
                            handleChange={this.handleChange}
                            required
                        />
                        <FormInput
                            label="password" 
                            name="password" 
                            type="password" 
                            value={this.state.password} 
                            handleChange={this.handleChange}
                            required
                        />
                        <FormInput
                            label="confirm password" 
                            name="confirmPassword" 
                            type="password" 
                            value={this.state.confirmPassword} 
                            handleChange={this.handleChange}
                            required
                        />
                        <div className="buttons">
                            <CustomButton type="submit">
                                Sign up
                            </CustomButton>
                        </div>
                    </form>
                </div>
        );
    }
}