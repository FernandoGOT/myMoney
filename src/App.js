import React from 'react'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Home from './pages/Home'
import Movimentacoes from './pages/Movimentacoes'
import Header from './elements/Header'


function App() {
  
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/movimentacoes/:data' exact component={Movimentacoes} />
      </div>
    </Router>
  )
}

export default App
