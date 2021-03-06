import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';

import { FormInput, FormButton } from '../formFields';

import { Heading } from '../common/headings';
import { PlaceholderImage, BackgroundImage } from '../common/image';

import background from '../../../static/assets/img/login-img.jpg';
import { required } from '../formFieldsValidation';
import FormError from '../common/formError';

class LoginForm extends Component {
    render() {
        const { className, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit} className={`${className} login-form`}>
                <Field className='login-form__email' type='email' name='email' title='Email' placeholder='Email' component={FormInput} validate={[required]}/>
                <Field className='login-form__password' type='password' name='password' title='Password' placeholder='Password' component={FormInput} validate={[required]}/>
                <Field className='login-form__login' type='submit' name='login' title='Login' onClick={() => console.log('submiting')} component={FormButton}/>
            </form>
        )
    }
}

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            formerr: ''
        }
    }

    componentWillMount() {
        const localToken = localStorage.getItem('token');
        const isUserEmpty = Object.entries(this.props.user).length === 0 && this.props.user.constructor === Object;
        // if(localToken !== null && isUserEmpty){
        //     this.props.getUserByToken(localToken, () => {
        //         this.props.history.push('/home');
        //     })
        // }

        // if(localToken !== null && !isUserEmpty){
        //     this.props.history.push('/home');
        // }
    }

    onSubmit = (fields) => {
        this.props.login(fields, (res) => {
            this.props.history.push('/home');
        }, 
        (res) => {
            if(res.message == "Network Error"){
                this.setState({formerr: "There is a problem on the server side, please try again later"});
            }
            else {     
                this.setState({formerr: res.data.error});
            }
        });
    }

    onClick = () => {
        this.setState({formerr: ''});
    }

    render() {
        return (
            <div className='login'>
                <div className='login__background'>
                    <BackgroundImage className='login__background__image' src={background}/>
                    {/* <PlaceholderImage className='login__background__image' width='1920' height='1080' /> */}
                </div>
                <div className='login__content'>
                    <Heading className='login__content__heading'>Login
                    {
                        this.state.formerr != '' ?
                            <FormError className='login__content__form-err' onClick={this.onClick}>{this.state.formerr}</FormError>
                        :
                            ''
                    }
                    </Heading>
                    <LoginForm onSubmit={this.onSubmit} className='login__content__form' />
                </div>
            </div>
        )
    }
}

LoginForm = reduxForm({
    form: 'Login'
})(LoginForm);

function mapStateToProps(state){
    const { user } = state.auth;
    return { user };
}

export default connect(mapStateToProps, actions)(Login);