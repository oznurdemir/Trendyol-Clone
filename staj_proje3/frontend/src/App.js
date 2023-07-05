import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Homescreen from './screen/Homescreen';
import { Routes, Route, Link } from "react-router-dom";
import AboutScreen from './screen/AboutScreen';
import ProductScreen from './screen/ProductScreen';
import LoginScreen from './screen/LoginScreen';
import {Container} from 'react-bootstrap'

function App() {
  return (
    <div>
      <Header/>
      <Container className='mt-50 mb-50 justify-content-center'>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        
      </Routes>

      
      <Footer/>
      </Container>
      
    </div>
  );
}

export default App;
