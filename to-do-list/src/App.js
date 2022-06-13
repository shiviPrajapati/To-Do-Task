import './App.css';
import NotFound from './component/NotFound';
import { AuthContextProvider } from './component/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import {lazy, Suspense} from "react";
import Signup from "./component/Signup"
const Home = lazy(() => import ('./component/Home'))
const Login = lazy(() => import ('./component/Login'))






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>

          <Routes>
            <Route exact path='/' element={<Signup />}></Route>
              <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>

        </AuthContextProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
