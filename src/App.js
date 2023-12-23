import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: {},
  sessionToken: localStorage.getItem('sessionToken') || null,
  route: localStorage.getItem('sessionToken') ? 'home' : 'signIn',
  isSignedIn: false,
  isLoading: true,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  numParticles: window.innerWidth < 600 ? 50 : 200
  
}

//let sessionToken = localStorage.getItem('sessionToken');

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // Add this function to handle sign-out
  handleSignOut = () => {
    // Clear the session token from localStorage
    localStorage.removeItem('sessionToken');
    //sessionToken = null;
    this.setState({
      ...initialState,
      route: 'signIn',
      isLoading: false,
      sessionToken: null
    });
    
  }

  validateToken = (sessionToken) => {
    fetch('https://smart-brain-api-rzbk.onrender.com/validatetoken', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionToken  // Send the token in the Authorization header
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.isValid) {
          // The token is valid
          this.loadUser(response); // Load user data from the server
          this.setState({ isSignedIn: true, route: 'home' });
        } else {
          // The token is not valid, or the server rejected it for some reason
          console.error('Token validation failed. Logging out...');
          this.handleSignOut();
      }
      })
      .catch(error => {
        console.error('Error validating token:', error);
        this.handleSignOut();
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ isLoading: false }); // Set loading state to false
        }, 500);
      });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    const { sessionToken } = this.state;
    if (sessionToken) {
      // Validate the token on the server side
      this.validateToken(sessionToken);
    } else {
      this.setState({ isLoading: false }); // Set loading state to false
    }
  }

  componentWillUnmount() {
    // Cleanup the event listener on component unmount
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const newNumParticles = window.innerWidth < 600 ? 50 : 200;
    if (newNumParticles !== this.state.numParticles) {
      this.setState({
        numParticles: newNumParticles,
      });
    }
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        entries: data.user.entries,
        joined: data.user.joined
      },
      sessionToken: data.sessionToken,
      isSignedIn: true  // Assuming that if user data is provided, the user is signed in
    });
    const { sessionToken } = this.state;
    // Save the session token in localStorage
    if (!sessionToken) {
      // If the session token is not present in localStorage, store it
      localStorage.setItem('sessionToken', data.sessionToken);
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(region => {
      const boundingBox = region.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height)
      };
    });
  
    return clarifaiFaces;
  }
  
  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    const { sessionToken } = this.state;  
    this.setState({imageUrl: this.state.input}, () => {
      //send image url to backend, where the clarifai API call occurs
      //fetch('http://localhost:3000/clarifai', {
      fetch('https://smart-brain-api-rzbk.onrender.com/clarifai', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionToken
        },
        body: JSON.stringify({
            imageUrl: this.state.imageUrl
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          //fetch('http://localhost:3000/image', {
          fetch('https://smart-brain-api-rzbk.onrender.com/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': sessionToken
            },
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}));
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    })
  }

  onRouteChange = (route) => {
    if (route === 'signIn') {
      this.handleSignOut();
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route, user, boxes, imageUrl, isLoading, numParticles } = this.state;

    return (
      <div className={`App ${isLoading ? 'flex items-center justify-center vh-100' : ''}`}>
        <ParticlesBg color="#FFFFFF" type="cobweb" bg={true} num={numParticles} />
        {!isLoading && (
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        )}
        {isLoading ? (
          <span className="spinner"></span>
        ) : (
          <>
            {route === 'home' && isSignedIn ? (
              <div>
                <Logo />
                <Rank name={user.name} entries={user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onPictureSubmit} />
                <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
              </div>
            ) : (
              route === 'signIn' && isSignedIn ? (
                // Render loading or a placeholder component while validating token
                <span className="spinner"></span>
              ) : (
                route === 'signIn' ? (
                  <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                ) : (
                  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                )
              )
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;
