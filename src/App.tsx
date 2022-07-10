import React from 'react';
import { Link, Route } from './mini-react-router'
import Home from './Home';
import About from './About';

function App() {
  return (
    <div className='app'>
      <Link to='/'>HOME</Link>
      <Link to='/about'>ABOUT</Link>
      <Route path='/' component={<Home />}/>
      <Route path='/about' component={<About />}/>
    </div>
  );
}

export default App;
