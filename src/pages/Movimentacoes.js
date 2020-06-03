import React from 'react'
import { useState } from 'react'

import Rest from '../utils/rest'

const baseUrl = 'https://devpleno-mymoney.firebaseio.com/'

const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

const Movimentacoes = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`meses/${match.params.data}`)
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, remover] = useDelete('')
  const [patchData, patch] = usePatch('')
  const [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = evt => {
    setValor(evt.target.value)
  }

  const salvarMovimentacao = async () => {
    if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
      await salvar({
        descricao,
        valor: parseFloat(valor)
      })
  
      setDescricao('')
      setValor(0)
      data.refetch()

      await sleep(3000)
      
      dataMeses.refetch()
    }
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  const removerovimentação = async (id) => {
    await remover(`movimentacoes/${match.params.data}/${id}`)

    data.refetch()

    await sleep(3000)

    dataMeses.refetch()
  }

  const alterarPrevisaoDeEntrada = async evt => {
    patch(`meses/${match.params.data}`, {previsao_entrada: evt.target.value})

    await sleep(3000)
      
    dataMeses.refetch()
  }

  const alterarPrevisaoDeSaida = async evt => {
    patch(`meses/${match.params.data}`, {previsao_saida: evt.target.value})

    await sleep(3000)
      
    dataMeses.refetch()
  }

  return (
    <div className='container'>
      <h1>Movimentações</h1>
      {
        !dataMeses.loading && dataMeses.data &&
        <div>
          Previsão entrada: {dataMeses.data.previsao_entrada} <input type='text' onBlur={alterarPrevisaoDeEntrada} /> / Previsão saída: {dataMeses.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoDeSaida} />
          <br/>
          Entradas: {dataMeses.data.entradas} / Saídas: {dataMeses.data.saidas}
        </div>
      }
      <table className='table'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          { data.data &&
            Object.keys(data.data).map(movimentacao => {
              return (
                <tr key={movimentacao}>
                  <td>{data.data[movimentacao].descricao}</td>
                  <td>{data.data[movimentacao].valor}</td>
                  <td><button className='btn btn-danger' onClick={() => removerovimentação(movimentacao)}>-</button></td>
                </tr>
              )
            })
          }
          <tr>
            <td><input type='text' value={descricao} onChange={onChangeDescricao}/></td>
            <td>
              <input type='text' value={valor} onChange={onChangeValor}/>
            </td>
            <td>
              <button className='btn btn-success' onClick={salvarMovimentacao}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Movimentacoes