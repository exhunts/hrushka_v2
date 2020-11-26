// music
const audio_main_music = document.getElementById('audio-main-music')
audio_main_music.loop = true
audio_main_music.volume = 0.2
const audio_win_music = document.getElementById('audio-win-music')
audio_win_music.loop = false
audio_win_music.volume = 1

// audio
const audio_dices_sound = document.getElementById('audio-dices-sound')
audio_dices_sound.loop = false
audio_dices_sound.volume = 0.5
const audio_giggle_sound = document.getElementById('audio-giggle-sound')
audio_giggle_sound.loop = false
audio_giggle_sound.volume = 1
const audio_cash_sound = document.getElementById('audio-cash-sound')
audio_cash_sound.loop = false
audio_cash_sound.volume = 1
const audio_pig_sound = document.getElementById('audio-pig-sound')
audio_pig_sound.loop = false
audio_pig_sound.volume = 0.7

// consts
const PLAYER_ONE = 1
const PLAYER_TWO = 2
const NONE = 0
const MAX_WIN_POINTS = 9999

// main state
let gameState = {
  playerOneCollectedPoints: 0,
  playerTwoCollectedPoints: 0,
  playerOneSafePoints: 0,
  playerTwoSafePoints: 0,
  playerTurn: PLAYER_ONE,
  winPoints: 10,
  isGamePlaying: false,
  firstDiceDroppedPoints: 0,
  secondDiceDroppedPoints: 0,
  playerWin: NONE,
}

//state initializer
const initGameState = {
  playerOneCollectedPoints: 0,
  playerTwoCollectedPoints: 0,
  playerOneSafePoints: 0,
  playerTwoSafePoints: 0,
  playerTurn: NONE,
  winPoints: 10,
  isGamePlaying: false,
  firstDiceDroppedPoints: 0,
  secondDiceDroppedPoints: 0,
  playerWin: NONE,
}

// logic
const newGame = () => {
  gameState = { ...initGameState, playerTurn: getRandomPlayerTurn() }
  gameState.isGamePlaying = true
  render('newgame')
  playSound('newgame')
}

const rollDices = () => {
  gameState.firstDiceDroppedPoints = rollDice()
  gameState.secondDiceDroppedPoints = rollDice()
  const isWasDotPoint =
    gameState.firstDiceDroppedPoints === 1 ||
    gameState.secondDiceDroppedPoints === 1
  if (isWasDotPoint) {
    switch (gameState.playerTurn) {
      case PLAYER_ONE:
        gameState.playerOneSafePoints = 0
        gameState.playerTurn = PLAYER_TWO
        break
      case PLAYER_TWO:
        gameState.playerTwoSafePoints = 0
        gameState.playerTurn = PLAYER_ONE
        break
    }
  } else {
    switch (gameState.playerTurn) {
      case PLAYER_ONE:
        gameState.playerOneSafePoints +=
          gameState.firstDiceDroppedPoints + gameState.secondDiceDroppedPoints
        break
      case PLAYER_TWO:
        gameState.playerTwoSafePoints +=
          gameState.firstDiceDroppedPoints + gameState.secondDiceDroppedPoints
        break
    }
  }
  render('rolldices')
  playSound('rolldices')
}

const hold = () => {
  switch (gameState.playerTurn) {
    case PLAYER_ONE:
      gameState.playerOneCollectedPoints += gameState.playerOneSafePoints
      gameState.playerOneSafePoints = 0
      if (gameState.playerOneCollectedPoints >= gameState.winPoints) {
        gameState.playerWin = PLAYER_ONE
        gameState.isGamePlaying = false
      } else {
        gameState.playerTurn = PLAYER_TWO
      }
      break
    case PLAYER_TWO:
      gameState.playerTwoCollectedPoints += gameState.playerTwoSafePoints
      gameState.playerTwoSafePoints = 0
      if (gameState.playerTwoCollectedPoints >= gameState.winPoints) {
        gameState.playerWin = PLAYER_TWO
        gameState.isGamePlaying = false
      } else {
        gameState.playerTurn = PLAYER_ONE
      }
      break
  }
  render('hold')
  playSound('hold')
}

// renderer
const render = atAction => {
  switch (atAction) {
    case 'newgame':
      document.getElementById('first-player-name').innerText = 'first'
      document.getElementById('second-player-name').innerText = 'second'
      document.getElementById('result-img-player-1').src = ''
      document.getElementById('result-img-player-2').src = ''
      document
        .getElementById('first-player-name')
        .classList.remove(
          'animate__animated',
          'animate__infinite',
          'animate__rubberBand'
        )
      document
        .getElementById('second-player-name')
        .classList.remove(
          'animate__animated',
          'animate__infinite',
          'animate__rubberBand'
        )
      document
        .getElementById('result-img-player-1')
        .classList.remove(
          'animate__animated',
          'animate__infinite',
          'animate__flip'
        )
      document
        .getElementById('result-img-player-2')
        .classList.remove(
          'animate__animated',
          'animate__infinite',
          'animate__flip'
        )
      document
        .getElementById('result-img-player-1')
        .classList.remove('animate__animated', 'animate__swing')
      document
        .getElementById('result-img-player-2')
        .classList.remove('animate__animated', 'animate__swing')
      document.getElementById('btn-hold').classList.add('btn--disabled')
      document
        .getElementById('btn-roll-dices')
        .classList.remove('btn--disabled')

      switch (gameState.playerTurn) {
        case PLAYER_ONE:
          document.getElementById('player-1-dancer').classList.add('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          break
        case PLAYER_TWO:
          document.getElementById('player-2-dancer').classList.add('dance')
          document.getElementById('player-1-dancer').classList.remove('dance')
          break
        default:
          break
      }

      document.getElementById('player-1-safe-points').innerText =
        gameState.playerOneSafePoints
      document.getElementById('player-2-safe-points').innerText =
        gameState.playerTwoSafePoints
      document.getElementById('player-1-score').innerText =
        gameState.playerOneCollectedPoints
      document.getElementById('player-2-score').innerText =
        gameState.playerTwoCollectedPoints
      break

    case 'rolldices':
      let isWasDotPoint =
        gameState.firstDiceDroppedPoints === 1 ||
        gameState.secondDiceDroppedPoints === 1
      if (isWasDotPoint) {
        document.getElementById('btn-hold').classList.add('btn--disabled')
      } else {
        document.getElementById('btn-hold').classList.remove('btn--disabled')
      }
      document
        .getElementById('dice-1')
        .classList.add('animate__animated', 'animate__rotateIn')
      document
        .getElementById('dice-2')
        .classList.add('animate__animated', 'animate__rotateIn')
      document.getElementById(
        'dice-1'
      ).src = `images/dice-${gameState.firstDiceDroppedPoints}.png`
      document.getElementById(
        'dice-2'
      ).src = `images/dice-${gameState.secondDiceDroppedPoints}.png`
      document.getElementById('player-1-safe-points').innerText =
        gameState.playerOneSafePoints
      document.getElementById('player-2-safe-points').innerText =
        gameState.playerTwoSafePoints

      switch (gameState.playerTurn) {
        case PLAYER_ONE:
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('player-1-dancer').classList.add('dance')
          break
        case PLAYER_TWO:
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.add('dance')
          break
      }
      remountNodeByCloned(document.getElementById('dice-1'))
      remountNodeByCloned(document.getElementById('dice-2'))
      break

    case 'hold':
      document.getElementById('btn-hold').classList.add('btn--disabled')
      document.getElementById('player-1-score').innerText =
        gameState.playerOneCollectedPoints
      document.getElementById('player-2-score').innerText =
        gameState.playerTwoCollectedPoints
      document.getElementById('player-1-safe-points').innerText = 0
      document.getElementById('player-2-safe-points').innerText = 0

      if (gameState.playerWin === NONE) {
        switch (gameState.playerTurn) {
          case PLAYER_ONE:
            document.getElementById('player-2-dancer').classList.remove('dance')
            document.getElementById('player-1-dancer').classList.add('dance')
            break
          case PLAYER_TWO:
            document.getElementById('player-1-dancer').classList.remove('dance')
            document.getElementById('player-2-dancer').classList.add('dance')
            break
        }
      } else {
        document.getElementById('player-1-dancer').classList.remove('dance')
        document.getElementById('player-2-dancer').classList.remove('dance')
        document.getElementById('btn-hold').classList.add('btn--disabled')
        document.getElementById('btn-roll-dices').classList.add('btn--disabled')
        switch (gameState.playerWin) {
          case PLAYER_ONE:
            document.getElementById('first-player-name').innerText = 'win'
            document.getElementById('second-player-name').innerText = 'loose'
            document
              .getElementById('first-player-name')
              .classList.add(
                'animate__animated',
                'animate__infinite',
                'animate__rubberBand'
              )
            document
              .getElementById('result-img-player-1')
              .classList.add(
                'animate__animated',
                'animate__infinite',
                'animate__flip'
              )
            document
              .getElementById('result-img-player-2')
              .classList.add('animate__animated', 'animate__swing')
            document.getElementById('result-img-player-1').src =
              'images/win-pig.png'
            document.getElementById('result-img-player-2').src =
              'images/cat-loose.png'
            break
          case PLAYER_TWO:
            document.getElementById('first-player-name').innerText = 'loose'
            document.getElementById('second-player-name').innerText = 'win'
            document
              .getElementById('second-player-name')
              .classList.add(
                'animate__animated',
                'animate__infinite',
                'animate__rubberBand'
              )
            document.getElementById('result-img-player-1').src =
              'images/cat-loose.png'
            document.getElementById('result-img-player-2').src =
              'images/win-pig.png'
            document
              .getElementById('result-img-player-1')
              .classList.add('animate__animated', 'animate__swing')
            document
              .getElementById('result-img-player-2')
              .classList.add(
                'animate__animated',
                'animate__infinite',
                'animate__flip'
              )
            break
        }
      }
      break
    default:
      throw Error(`render: switch/case ${atAction} not found`)
  }
}

// sound
const playSound = atAction => {
  switch (atAction) {
    case 'newgame':
      audio_win_music.pause()
      audio_win_music.currentTime = 0
      audio_main_music.play()
      break

    case 'hold':
      audio_cash_sound.pause()
      audio_cash_sound.currentTime = 0
      audio_cash_sound.play()
      const isOneOfThePlayersWin =
        gameState.playerOneCollectedPoints >= gameState.winPoints ||
        gameState.playerTwoCollectedPoints >= gameState.winPoints
      if (isOneOfThePlayersWin) {
        audio_main_music.pause()
        audio_main_music.currentTime = 0
        audio_win_music.play()
        audio_pig_sound.play()
      }
      break

    case 'rolldices':
      audio_dices_sound.pause()
      audio_dices_sound.currentTime = 0
      audio_dices_sound.play()
      const isWasDotPoint =
        gameState.firstDiceDroppedPoints === 1 ||
        gameState.secondDiceDroppedPoints === 1
      if (isWasDotPoint) {
        audio_giggle_sound.pause()
        audio_giggle_sound.currentTime = 0
        audio_giggle_sound.play()
      }
      break

    default:
      throw Error(`playSound: switch/case ${atAction} not found`)
  }
}

// other >>>
// utils
const rollDice = () => {
  return getRandomIntFromTo(1, 6)
}

const getRandomPlayerTurn = () => {
  return getRandomIntFromTo(1, 2)
}

const getRandomIntFromTo = (from, to) => {
  return from + Math.floor(Math.random() * (to - from + 1))
}

// !!! not used but don't delete it >>>
function remountCloneNodeWithoutClasses(none, ...classes) {
  const clonedNode = node.cloneNode(true)
  clonedNode.classList.remove(...classes)
  node.parentNode.replaceChild(clonedNode, node)
}
// function remountNodeByClonedUseClasses () {}
// <<<

const remountNodeByCloned = node => {
  const clonedNode = node.cloneNode(true)
  node.parentNode.replaceChild(clonedNode, node)
}

// keyboard control
document.addEventListener('keydown', event => {
  if (!gameState.isGamePlaying && event.code === 'Enter') {
    newGame()
  }
  if (gameState.isGamePlaying) {
    if (event.code === 'KeyQ' && gameState.playerTurn === PLAYER_ONE) {
      rollDices()
    }
    if (event.code === 'KeyP' && gameState.playerTurn === PLAYER_TWO) {
      rollDices()
    }
    if (
      event.code === 'Space' &&
      (gameState.playerOneSafePoints !== 0 ||
        gameState.playerTwoSafePoints !== 0)
    ) {
      event.preventDefault()
      hold()
    }
  }
})

// DOM
document.getElementById('win-input').value = gameState.winPoints

// logo
setTimeout(() => {
  document.querySelector('.logo-screen').style.display = 'none'
}, 7000)

const onAbout = () => {
  document.querySelector('.about-pop-up').classList.add('about-pop-up--show')
}

const hideAbout = () => {
  document.querySelector('.about-pop-up').classList.remove('about-pop-up--show')
}

const onWinScoreInput = () => {
  const $win_input = document.getElementById('win-input')
  const win_input_value = Number($win_input.value)
  if (Number.isNaN(win_input_value)) {
    document.getElementById('win-input').value = gameState.winPoints
  } else {
    if (win_input_value > MAX_WIN_POINTS) {
      $win_input.value = MAX_WIN_POINTS
      gameState.winPoints = MAX_WIN_POINTS
      initGameState.winPoints = MAX_WIN_POINTS
    } else {
      gameState.winPoints = win_input_value
      initGameState.winPoints = win_input_value
    }
  }
}

const onWinScoreInputBlur = () => {
  if (document.getElementById('win-input').value === '') {
    gameState.winPoints = 10
    initGameState.winPoints = 10
  }
}
