import React from 'react'

import Meses from './Meses'
import AdicioanrMes from './AdicionarMes'

const Home = () => {
  
  return (
    <div className='container'>
      <AdicioanrMes />
      <Meses />
    </div>
  )
}

export default Home