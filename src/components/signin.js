import React from 'react';

class Signin extends React.Component {
    constructor(props) { // create state to capture email/password
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => { // get email from form
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => { // get password from form
        this.setState({signInPassword: event.target.value})
    }
    onSubmitSignIn = () => { //capture values from email/pass to check data
      //fetch('http://localhost:3001/signin', { // localhost
      fetch(`${process.env.REACT_APP_SERVER_URL}/signin`, { // remote heroku version 
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://rbhachu-smartbrain-b.herokuapp.com'},
            //headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ //convert to JSON format
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user)
            this.props.onRouteChange('home');
          }
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address" 
                                    onChange={this.onEmailChange} // pass email value to state
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    onChange={this.onPasswordChange} // pass password value to state
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn} // function that gets called to change state to 'home'
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">or Register?</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;
