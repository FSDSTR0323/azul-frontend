import "./App.css";
import Inicio from "./Components/Home";
import Nostros from "./Components/About";
import Resumen from "./Components/Work";
import Testimonios from "./Components/Testimonial";
import Contactos from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Inicio />
      <Nostros />
      <Resumen />
      <Testimonios />
      <Contactos />
      <Footer />
    </div>
  );
}

export default App;
