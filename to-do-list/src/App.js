import './App.css';
import Login from './component/Login';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './component/Home';
import Signup from './component/Signup';
import { AuthContextProvider } from './component/context/AuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>

          <Routes>
            <Route exact path='/' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<Home />}></Route>
          </Routes>

        </AuthContextProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
