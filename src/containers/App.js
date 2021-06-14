import React, { Component } from 'react';
import Navigation from '../components/navigation';
import Signin from '../components/signin';
import Register from '../components/register';
import Logo from '../components/logo';
import Rank from '../components/rank';
import ImageLinkForm from '../components/imagelinkform';
import FaceRecognition from '../components/facerecognition';
import Particles from "react-tsparticles";
import 'tachyons';

const initialState = { // default reset state
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  // particles
  particlesInit(main) {
    //console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  }
  particlesLoaded(container) {
    //console.log(container);
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); // for backend clarifi api (moved to backend to hide api key)
      //fetch('http://localhost:3001/imageurl', { // localhost
      fetch(`${process.env.REACT_APP_SERVER_URL}/imageurl`, { // remote heroku version 
        method: 'post',
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://rbhachu-smartbrain-b.herokuapp.com'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        //console.log('hi', response)
        if (response) {
          //fetch('http://localhost:3001/image', {
          fetch(`${process.env.REACT_APP_SERVER_URL}/image`, {            
            method: 'put',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://rbhachu-smartbrain-b.herokuapp.com'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log); //always add a error/catch statement after .then etc as safe precaution to catch issues
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {

    const { isSignedIn, imageUrl, route, boxes } = this.state;

    return (

      <div className="App">
         <Particles className='particles'
            id="tsparticles"
            //url="http://localhost:3000/particles.json"
            url={`${process.env.REACT_APP_SERVER_URL}/particles.json`}
            init={this.particlesInit}
            loaded={this.particlesLoaded}
        />
      
      <header>
        {<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />}
      </header>
            
        { 
        
          route === 'home'
          
        ? 

          <section>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />

            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />

            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />

          </section>
        : 
          
          (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )

        }

      </div>

    );
  }

}

export default App;