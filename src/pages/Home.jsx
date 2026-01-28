import React from 'react';
import { Link } from 'react-router-dom';
import AboutUs from '../AboutUs';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-content">
          <h1>Welcome to Plant Shopping</h1>
          <div className="home-divider" />
          <p>Where Green Meets Serenity</p>
          <Link to="/products" className="home-cta">
            Get Started
          </Link>
        </div>
      </div>
      <section className="home-about">
        <AboutUs />
      </section>
    </div>
  );
}

export default Home;
