import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Authentication from "./pages/Authentication/Authentication";
import ProductProvider from "./contexts/ProductContext";
import AuthContainer from "./contexts/AuthContainer";
function App() {
  return (
    <>
      <ProductProvider>
        <AuthContainer>
          <Header />

          {/* main = temporary */}
          <main>
            <Authentication />
          </main>

          <Footer />
        </AuthContainer>
      </ProductProvider>
    </>
  );
}

export default App;
