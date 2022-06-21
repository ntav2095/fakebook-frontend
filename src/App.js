import { Routes, Route } from 'react-router-dom'

import Login from './containers/Login/Login'
import Header from './containers/Header/Header'
import Notfound from './containers/Notfound/Notfound'
import AuthFilter from './Auth/AuthFilter'
import Home from './containers/Home/Home'
import Profile from './containers/Profile/Profile'
import SpecifiedPost from './containers/SpecifiedPost/SpecifiedPost'

import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />

        {/* require auth  */}
        <Route element={<AuthFilter />} >
          <Route element={<Header />} >
            <Route path="/" element={<Home />} />
            <Route path="/:email" element={<Profile />} />
            <Route path='/post/:pid' element={<SpecifiedPost />} />
          </Route>
        </Route>

        {/* not found  */}
        <Route path='*' element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
