import logo from './logo.svg';
import './App.css';


function MyButton() {
  return (
    <button>
      Click Me
    </button>
  );
  }

  function HomePageTitle() {
    return (
      <h1 className="greeting"> Welcome to Macopoly!</h1>
    );
  }
  
  function HomePageDescription() {
    return (
      <p className="description"> This is the home page for our project for <i>COMP225</i>, Fall 2025.
      Created by Josh, Chenhao, Bavo, and Colin.</p>
    );
  }

export default function App() {
  return (
    <div>
      <HomePageTitle />
      <HomePageDescription />
      <MyButton />
    </div>
  );
}

