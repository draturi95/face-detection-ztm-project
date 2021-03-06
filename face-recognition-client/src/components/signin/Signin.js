import React, { Component } from 'react';

// =({onRouteChange}) =>

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data?.id) {
          this.props.loadUser(data);
          this.props.onRouteChange('home');
          //console.log(data);  
        }
        else {
          console.log('incorrect combination of email and password');
        }
      })
      .catch(console.log('error contacting the server'));

    // console.log(this.state); 
  }



  render() {
    const { onRouteChange } = this.props;

    return (
      <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email: </label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={(e) => this.onEmailChange(e)} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password:</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={(e) => this.onPasswordChange(e)} />
              </div>
            </fieldset>
            <div className="">
              <input className="b br1 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={() => this.onSubmitSignIn()} />
            </div>
            <div className="lh-copy mt3">
              <a href='#0' className="f6 link dim black db" onClick={() => onRouteChange('register')}>Register</a>
            </div>
          </div>
        </main>
      </article>
    )
  }

}


export default Signin;

// there used to be a form tag but were creating our own server so no need to have a form. form actually automatically tries to submit to http 

