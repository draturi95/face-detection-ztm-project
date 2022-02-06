import React, {Component} from 'react'; 
import './App.css';
import Navigation from './components/navigation/Navigation'; 
import Logo from './components/logo/Logo'; 
import ImageLinkForm from './components/linkform/ImageLinkForm'; 
import SignIn from './components/signin/Signin'; 
import Register from './components/register/Register'; 
import FaceRecognition from './components/facerecognition/FaceRecognition'; 

                                            
import Rank from './components/rank/Rank'; 
import Particles from "react-tsparticles";

const initialState = {
  input : '',
  imageUrl : '',
  box : {}, 
  route : 'signin',
  isSignedIn : false,
  user: {
    id: '',
name: '', 
email: '',
entries: '',
joined: ''
  }
}; 

class App extends Component {
  constructor(){
    super(); 
    this.state = initialState; 
  }; 

  loadUser = (data) =>{
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined,
      entries: data.entries
    }})

  }

  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(console.log('Error error error')); 
  // }

  calculateFaceLocation = (data) =>{
    console.log(data); 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 

    console.log(clarifaiFace); 
    const image = document.getElementById('inputimage'); 
    const width = Number(image.width); 
    const height = Number(image.height); 
    console.log(width, height); 


    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (boxIn) =>{
    console.log(boxIn); 
    this.setState({box : boxIn}); 
  }

  onInputChange = (event) =>{ 
    this.setState({input : event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl : this.state.input}); 

    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.imageUrl
      })
    })
    .then(response => response.json())
    .then( response => {
// console.log('id', this.state.user.id);
        fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      }).then(response => response.json())
        .then(data => {
          if(data!=='User not found')
            this.setState({user: {...this.state.user, entries: data}})
          else console.log(data)
        }
        )
        .catch(console.log('User entry upgrade error'))
      
    this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(err => console.log('FaceAPI error'));  

  }

  onRouteChange = (inRoute) =>{
    this.setState({route : inRoute}); 
    if((inRoute==='signin')||(inRoute==='register'))
      this.setState({isSignedIn : false}); 
    else if(inRoute === 'signout'){
      this.setState(initialState); 
      this.setState({isSignedIn: false}); 
    }
    else 
      this.setState({isSignedIn : true}); 


    }

  render()  {
    return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/> 
      <Logo/> 
      {this.state.route==='signin'?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> : 
        (this.state.route==='register'? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>: 
      <>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> </>)}
      <Particles className = 'particles'
      id="tsparticles"
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
    </div>
  );
  } 
}

export default App;


    


    