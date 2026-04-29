import "./Home.css"

import NavBar from './NavBar'

function Home() {
  return (
    <div className="app-container">
      
      <NavBar />

      
      <section className="hero-section">
        <img src="images/bg.jpeg" alt="Hero Image" className="hero-image"/>
        <div className='hero-content'>
          <h1>Find Your Dream Home</h1>
          <p>Searching for luxury villas and apartments in your area.</p>
          <button className="cta-btn">View Listings</button>
        </div>
      </section>

      
      <section className="properties-section">
        <h2>Featured Properties</h2>
        <div className="property-grid">
          <div className="property-card"><img src="images/h1.jpeg" alt="Property 1"/> </div>
          <div className="property-card"><img src="images/h2.jpeg" alt="Property 2"/></div>
          <div className="property-card"><img src="images/h3.jpeg" alt="Property 3"/></div>
          <div className="property-card"><img src="images/h4.jpeg" alt="Property 4"/></div>
        </div>
      </section>

      
      <section className="about-section">
        <h2>About Us</h2>
        <p className='about-p'>Our Story</p>
        <p className='story-p'>Founded in 2023, RealEstate.io started with a simple mission: to make finding a home as seamless and transparent as possible. We understand that a home is more than just four walls—it’s where memories are made and futures are built. Our platform connects buyers, sellers, and renters with the most exclusive properties in the region.</p>
        <h1>Why choose us?</h1>
        <p>
          <ul>
            <li><b>Verified Listings:</b> Every property on our platform undergoes a strict verification process to ensure authenticity.</li>
            <li><b>Expert Guidance:</b> Our team of experienced agents provides personalized advice to help you make the right investment.</li>
            <li><b>Transparent Pricing:</b> No hidden costs. We believe in clear, honest communication from start to finish.</li>
            <li><b>Local Expertise: </b>Specializing in both urban luxury apartments and serene suburban villas in your favorite neighborhoods.</li>
          </ul>
        </p>
      </section>

     <div className="footer-section">
      <footer >
        <p>© 2026 RealEstate.io. All rights reserved.</p>
      </footer>
      </div>
    </div>
  )
}

export default Home 