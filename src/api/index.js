import Rest from '../utils/rest'

const baseUrl = 'https://devpleno-mymoney.firebaseio.com/'

const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

export const useMesApi = date => {
  const infoMes = useGet(`meses/${date}`)
  const [patchData, alterarMes] = usePatch(`meses/${date}`)

  return { infoMes, alterarMes}
}

export const useMovimentacaoApi = date => {
  const movimentacoes = useGet(`movimentacoes/${date}`)
  const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${date}`)
  const [removeData, removerMovimentacao] = useDelete('')

  return { movimentacoes, salvarNovaMovimentacao, removerMovimentacao }
}