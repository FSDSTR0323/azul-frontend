import "./App.css";
import Home from "./Components/Home";
import RandomCards from "./Components/RandomCards";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import { Catalog } from './Catalog';

function App() {
  const cards =[];
  return (
    <div className="App">
      <Home />
      <RandomCards cards={cards}/>
      <Catalog />
      {/* Aquí va el listado de cartas */}
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
