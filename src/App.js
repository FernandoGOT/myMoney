import React from 'react'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Header from './elements/Header'
import Movimentacoes from './pages/Movimentacoes'


function App() {
  
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/movimentacoes/:data' exact component={Movimentacoes} />
      </div>
    </Router>
  )
}

export default App
