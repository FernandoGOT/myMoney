import React from 'react'

import { useMesApi } from '../../api'

const InfoMes = ({ date }) => {
  const { infoMes, alterarMes } = useMesApi(date)
  
  const sleep = time => new Promise(resolve => setTimeout(resolve, time))
  
  const alterarPrevisaoDeEntrada = async evt => {
    alterarMes({previsao_entrada: evt.target.value})

    await sleep(3000)
      
    infoMes.refetch()
  }

  const alterarPrevisaoDeSaida = async evt => {
    alterarMes({previsao_saida: evt.target.value})

    await sleep(3000)
      
    infoMes.refetch()
  }

  if (infoMes.loading) {
    return <p>Carregando dados do mês</p>
  }
  if (infoMes.data) {
    return (
      <div>
        Previsão entrada: {infoMes.data.previsao_entrada} <input type='text' onBlur={alterarPrevisaoDeEntrada} /> / Previsão saída: {infoMes.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoDeSaida} />
        <br/>
        Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
      </div>
    )
  }

  return null
}

export default InfoMes