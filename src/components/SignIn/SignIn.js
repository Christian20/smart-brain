import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorMessage: '',
            signInIsLoading: false
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value, errorMessage: '' });
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value, errorMessage: '' });
    }

    onSubmitSignIn = () => {
        this.setState({ signInIsLoading: true });

        //fetch('http://localhost:3000/signin', {
        fetch('https://smart-brain-api-rzbk.onrender.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ signInIsLoading: false });

                if (response?.user?.id) {
                    const sessionToken = response.sessionToken;
                    localStorage.setItem('sessionToken', sessionToken);
                    this.props.loadUser(response);
                    this.props.onRouteChange('home');
                } else {
                    // Handle incorrect credentials
                    this.setState({
                        errorMessage: response,
                        signInEmail: '',  // Clear email
                        signInPassword: ''  // Clear password
                    });
                }
            })
            .catch(error => {
                console.log('Error during sign in:', error);
                // Handle other errors if needed
                this.setState({ signInIsLoading: false });
            });
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitSignIn();
        }
    }

    render() {
        const { onRouteChange } = this.props;
        const { errorMessage, signInIsLoading, signInEmail, signInPassword } = this.state;

        return (              
                <div className="flex justify-center items-center mt5">
                    {signInIsLoading ? (
                    <div className="flex items-center justify-center mt6">
                        <span className="spinner mt5"></span>
                    </div>
                    ) : (
                    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                        <main className="pa4 black-80">
                            <div className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                    {!errorMessage &&
                                        <div className="tc br3 pa2 transparent">  
                                        <div>&nbsp;</div>                              
                                        </div>
                                    }
                                    {errorMessage &&
                                        <div className="error-box bg-light-orange white tc br3 pa2 shadow-5">                                
                                            <div>{errorMessage}</div>
                                        </div>
                                    }
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                        <input
                                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                            type="email"
                                            name="email-address"
                                            id="email-address"
                                            value={signInEmail}
                                            onChange={this.onEmailChange}
                                            onKeyDown={this.onKeyDown}
                                        />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                        <input
                                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={signInPassword}
                                            onChange={this.onPasswordChange}
                                            onKeyDown={this.onKeyDown}
                                        />
                                    </div>
                                </fieldset>
                                <div className="">
                                    <input
                                        onClick={this.onSubmitSignIn}
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                        type="submit"
                                        value="Sign in"
                                    />
                                </div>
                                <div className="lh-copy mt3">
                                    <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                                </div>
                            </div>
                        </main>
                    </article>)} 
                </div>             
        );
    }
}

export default SignIn;
