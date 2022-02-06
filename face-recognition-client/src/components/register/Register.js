import React, {Component} from 'react'; 

// there used to be a form tag but were creating our own server so no need to have a form. form actually automatically tries to submit to http 

class Register extends Component { 

  constructor(props){
    super(props); 
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: ''
    }
  }

  onNameChange = (event) =>{
    this.setState({registerName: event.target.value}); 
  }

  onEmailChange = (event) =>{
    this.setState({registerEmail: event.target.value}); 
  }

  onPasswordChange = (event) =>{
    this.setState({registerPassword: event.target.value}); 
  }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json',
'Accept': 'application/json'
    },
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    })
    .then(response => response.json())
    .then((data) => {
      if(data?.id){
        this.props.loadUser(data); 
        this.props.onRouteChange('home'); 
        //console.log(data); 
      }
      else console.log('Contact with server was established but couldnt register the user')
    })
    .catch(console.log('There was an error contacting the server'))
  }

  render() {
    return (
    <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure"> 
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name: </label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={(e) => this.onNameChange(e)}/>
      </div>

      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email: </label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={(e) => this.onEmailChange(e)}/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password:</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={(e) => this.onPasswordChange(e)}/>
      </div>
    </fieldset>
    <div className="">
      <input className="b br1 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up" onClick={() => this.onSubmitRegister()}/>
    </div>

  </div>
</main>
</article> 
    )
  }

  
}


export default Register; 

