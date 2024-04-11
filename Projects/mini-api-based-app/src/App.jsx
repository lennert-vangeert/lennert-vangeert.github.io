import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CountryProvider from "./contexts/CountryContext";
import Authentication from "./pages/Authentication/Authentication";

function App() {
  return (
    <>
      <CountryProvider>
        <Header />
        <Authentication />
        <Footer />
      </CountryProvider>
    </>
  );
}

export default App;
