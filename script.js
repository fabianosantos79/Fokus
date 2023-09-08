const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const shortBtn = document.querySelector('.app__card-button--curto')
const longBtn = document.querySelector('.app__card-button--longo')
const imageBanner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const btnComecar = document.querySelector('#start-pause')
const inputMusica = document.querySelector('#alternar-musica')
const musicaFundo = new Audio('/sons/luna-rise-part-one.mp3')
const musicaIniciar = new Audio('/sons/play.wav')
const musicaPausar = new Audio('/sons/pause.mp3')
const musicaFim = new Audio('/sons/beep.mp3')

musicaFundo.loop = true

let tempoDecorrido = 5;
let intervaloId = null;

inputMusica.addEventListener('change', () => {
    if (musicaFundo.paused) {
        musicaFundo.play()
    } else {
        musicaFundo.pause()
    }
})

focoBtn.addEventListener('click', () => {
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

shortBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    shortBtn.classList.add('active')
})

longBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longBtn.classList.add('active')
})

inputMusica.addEventListener('change', () => {

})

function alterarContexto(contexto) {

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
    console.log('Temporizador: ' + tempoDecorrido);
}

btnComecar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        musicaPausar.play()
        zerar()
        return
    }
    musicaIniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}