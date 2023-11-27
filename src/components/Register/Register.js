import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () => {
        fetch('https://smart-brain-api-rzbk.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.user) {
                // In the success block of your sign-in and register functions
                const sessionToken = response.sessionToken;
                // Save the session token in localStorage
                localStorage.setItem('sessionToken', sessionToken);
                this.props.loadUser(response);
                this.props.onRouteChange('home');
            } else {
                // Handle incorrect credentials
                this.setState({
                    errorMessage: response,
                    name: '',
                    email: '',
                    password: ''
                });
            }
        })        
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitRegister();
        }
    }

    render() {      
        return(
            <div className="flex justify-center items-center h-screen mt5">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            {!this.state.errorMessage &&
                                    <div className="tc br3 pa2 transparent">  
                                    <div>&nbsp;</div>                              
                                    </div>
                            }
                            {this.state.errorMessage &&
                                <div className="error-box bg-light-orange white tc br3 pa2 shadow-5">                                
                                    <div>{this.state.errorMessage}</div>
                                </div>
                            }
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"
                                    value={this.state.name} 
                                    onChange={this.onNameChange}
                                    onKeyDown={this.onKeyDown} 
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
                                    value={this.state.email} 
                                    onChange={this.onEmailChange}
                                    onKeyDown={this.onKeyDown} 
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
                                    value={this.state.password} 
                                    onChange={this.onPasswordChange}
                                    onKeyDown={this.onKeyDown} 
                                />
                            </div>
                            </fieldset>
                            <div className="">
                            <input onClick={this.onSubmitRegister}className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
    
}

export default Register;