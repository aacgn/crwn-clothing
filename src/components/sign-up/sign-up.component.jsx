import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

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
            <SignUpContainer>
            <SignUpTitle>I do not have a account</SignUpTitle>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
              <FormInput
                type='text'
                name='displayName'
                value={this.state.displayName}
                onChange={this.handleChange}
                label='Display Name'
                required
              />
              <FormInput
                type='email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                label='Email'
                required
              />
              <FormInput
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                label='Password'
                required
              />
              <FormInput
                type='password'
                name='confirmPassword'
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                label='Confirm Password'
                required
              />
              <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
          </SignUpContainer>
        );
    }
}