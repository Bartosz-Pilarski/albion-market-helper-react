import sectionOneImage from '../images/section1.png'
import sectionTwoImage from '../images/section2.png'
import sectionThreeImage from '../images/section3.png'

const Home = () => {
  return(
    <div id="home" className='main-view'>
      <div id="hero">
        <header>
          <h1>
            Albion Market Helper
          </h1>
          <div className="separator"></div>
          <h2>
            Economy utility tool for Albion Online
          </h2>
        </header>
      </div>
      <div className="section">
      <img className="sectionImg" src={sectionOneImage} alt="Woman mining ore with a pickaxe" />
        <p>
          <span className="highlight">Albion Market Helper</span> is a tool aiming to help Albion Online players with engaging in the game&apos;s economy.
        </p>
      </div>
      <div className="section">
        <p>
          We help you by keeping track of resource prices and crafting costs, using community-sourced data.
        </p>
        <img className="sectionImg" src={sectionTwoImage} alt="Group of men, knight in front holds out silver coins and points into distance" />
      </div>
      <div className="section">
        <img className="sectionImg" src={sectionThreeImage} alt="Man rides transport ox into forest" />
        <p>
          Keep an eye on profitable routes or price opportunities with our app and stay ahead!
        </p>
      </div>
      <footer>

      </footer>
    </div>
  )
}

export default Home