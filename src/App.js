
import { CssBaseline } from '@mui/material';
import NavigationBar from './common/navigationBar/NavigationBar.js'
import Footer from './common/footer/Footer.js'
import Signin from './components/signin/Signin.js'
import SignUp from './components/signup/SignUp.js'

import Home from './components/home/Home.js'
import Products from './components/products/Products.js'
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signin' element={<Signin />} />
        <Route exact path='/signUp' element={<SignUp />} />
        <Route exact path='/products' element={<Products />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
