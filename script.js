const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const shortBtn = document.querySelector('.app__card-button--curto')
const longBtn = document.querySelector('.app__card-button--longo')
const imageBanner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const btnComecar = document.querySelector('#start-pause')
const btnIniciarOuPausar = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const inputMusica = document.querySelector('#alternar-musica')
const musicaFundo = new Audio('/sons/luna-rise-part-one.mp3')
const musicaIniciar = new Audio('/sons/play.wav')
const musicaPausar = new Audio('/sons/pause.mp3')
const musicaFim = new Audio('/sons/beep.mp3')
const iconeBtn = document.querySelector('.app__card-primary-butto-icon')

musicaFundo.loop = true

let tempoDecorrido = 1500;
let intervaloId = null;

inputMusica.addEventListener('change', () => {
    if (musicaFundo.paused) {
        musicaFundo.play()
    } else {
        musicaFundo.pause()
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorrido = 1500
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

shortBtn.addEventListener('click', () => {
    tempoDecorrido = 300
    alterarContexto('descanso-curto')
    shortBtn.classList.add('active')
})

longBtn.addEventListener('click', () => {
    tempoDecorrido = 900
    alterarContexto('descanso-longo')
    longBtn.classList.add('active')
})

inputMusica.addEventListener('change', () => {

})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach((item) => {
        item.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    imageBanner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }

}

const contagemRegressiva = () => {
    if (tempoDecorrido <= 0) {
        musicaFim.play()
        zerar()
        alert('Tempo finalizado!')
        return
    }
    tempoDecorrido -= 1
    mostrarTempo()
}

btnComecar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        iconeBtn.setAttribute('src', '/imagens/play_arrow.png')
        musicaPausar.play()
        btnIniciarOuPausar.textContent = "Começar"
        zerar()
        return
    }
    musicaIniciar.play()
    iconeBtn.setAttribute('src', '/imagens/pause.png')
    btnIniciarOuPausar.textContent = "Pausar"
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = tempoFormatado
}

mostrarTempo()