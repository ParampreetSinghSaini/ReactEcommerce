import logo from './logo.svg';
import './App.css';
import RouteFiles from './RouteFiles/RouteFiles';
import Navbar from './components/navbar/Navbar';
import ShopContextProvider from './context/ShopContext'

function App() {
  return (
    <>
      <ShopContextProvider>

        <RouteFiles/>
      </ShopContextProvider>
    </>
  );
}

export default App;
