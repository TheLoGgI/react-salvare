import React, { useState } from 'react';
import './App.css';
import './css/logo.css';
import './css/header.css';
import './css/hero.css';
import Container from './components/container';
import Search from './components/search';





function Header() {
  console.log('Header rerender');
  

  return (
    <header>
      <nav>
        <div>
          <div className="logo"></div>
        </div>
        <div className="share">
          <div className="share_icon">
            <img src="icons/share-arrow.png" alt="share details" />
          </div>
          <div className="share_icon">
            <img src="icons/social-media-share-icon.png" alt="social Media" />
          </div>
          <div className="share_icon">
            <img src="icons/print-icon.png" alt="print" />
          </div>
        </div>

      </nav>
    </header>
  )
}

function Hero() {
  console.log('Hero rerender');
  
  return (
    <div className="hero">
      <h1 className="hero__heading">Find the best Ingredients and Recipes for your meals </h1>
      <p className="hero__paragrath">Find your daily calorie intake and let us help you figure out what to eat, by searching for ingredients or recipes</p>
      <button className="hero__btn">Start Today</button>
    </div>
  )
}

function App() {
  console.log('App rerender');
  
  const [input, setInput] = useState<string|null>(null)
  const [onSubmit, toggle] = useState<boolean>(false)
  
  
  return (
    <div className="App">
      <Header />
      <Hero />
      <section className="grid__ingredients">
        <div className="grid-col pad-1">
          <Search setInput={setInput} toggle={toggle} />
          {/* <Search setInput={setInput} toggle={toggle} /> */}
          {/* <Container searchParam={input} isSubmitted={onSubmit} /> */}
        </div>
        <div className="grid-col">
          <img className="user-image" src="https://via.placeholder.com/600/771796" alt="placeholder image" />
        </div>
      </section>
      
    </div>
  );
}

export default App;
