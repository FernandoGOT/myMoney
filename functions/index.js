const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.soma = functions.database.ref('/movimentacoes/{dia}')
  .onWrite(async(change, context) => {
    const mesesRef = admin.database().ref('/meses/' + context.params.dia)
    const movimentacoesRef = change.after.ref
    const movimentacoesSS = await movimentacoesRef.once('value')
    const movimentacoes = movimentacoesSS.val()

    let saidas = 0
    let entradas = 0

    Object.keys(movimentacoes).forEach(m => {
      if (movimentacoes[m].valor > 0) {
        entradas += movimentacoes[m].valor
      } else {
        saidas += movimentacoes[m].valor
      }
    })

    return mesesRef.transaction(current => {
      if (current === null) {
        return {
          saidas,
          entradas,
          previsao_saida: 0,
          previsao_entrada: 0
        }
      }

      return {
        ...current,
        saidas,
        entradas
      }
    })
  })