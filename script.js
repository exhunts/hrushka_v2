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

let gameState = {
  pointsOfPlayerOne: 0,
  pointsOfPlayerTwo: 0,
  pointsToSafeForPlayerOne: 0,
  pointsToSafeForPlayerTwo: 0,
  playerTurn: PLAYER_ONE,
  finalScore: 10,
  isGamePlaing: false,
  firstDicePoints: 0,
  secondDicePoints: 0,
  playerWin: NONE,
}

const initGameState = {
  pointsOfPlayerOne: 0,
  pointsOfPlayerTwo: 0,
  pointsToSafeForPlayerOne: 0,
  pointsToSafeForPlayerTwo: 0,
  playerTurn: PLAYER_ONE,
  finalScore: 10,
  isGamePlaing: false,
  firstDicePoints: 0,
  secondDicePoints: 0,
  playerWin: NONE,
}

function newGame() {
  gameState = { ...initGameState, finalScore: gameState.finalScore }
  gameState.isGamePlaing = true
  render('newgame')
  playSound('newgame')
}

function rollDices() {
  gameState.firstDicePoints = rollDice()
  gameState.secondDicePoints = rollDice()
  const isWasDotPoint =
    gameState.firstDicePoints === 1 || gameState.secondDicePoints === 1
  if (isWasDotPoint) {
    switch (gameState.playerTurn) {
      case PLAYER_ONE:
        gameState.pointsToSafeForPlayerOne = 0
        gameState.playerTurn = PLAYER_TWO
        break
      case PLAYER_TWO:
        gameState.pointsToSafeForPlayerTwo = 0
        gameState.playerTurn = PLAYER_ONE
        break
    }
  } else {
    switch (gameState.playerTurn) {
      case PLAYER_ONE:
        gameState.pointsToSafeForPlayerOne +=
          gameState.firstDicePoints + gameState.secondDicePoints
        break
      case PLAYER_TWO:
        gameState.pointsToSafeForPlayerTwo +=
          gameState.firstDicePoints + gameState.secondDicePoints
        break
    }
  }
  render('rolldices')
  playSound('rolldices')
}

function hold() {
  switch (gameState.playerTurn) {
    case PLAYER_ONE:
      gameState.pointsOfPlayerOne += gameState.pointsToSafeForPlayerOne
      gameState.pointsToSafeForPlayerOne = 0
      if (gameState.pointsOfPlayerOne >= gameState.finalScore) {
        gameState.playerWin = PLAYER_ONE
        gameState.isGamePlaing = false
      } else {
        gameState.playerTurn = PLAYER_TWO
      }
      break
    case PLAYER_TWO:
      gameState.pointsOfPlayerTwo += gameState.pointsToSafeForPlayerTwo
      gameState.pointsToSafeForPlayerTwo = 0
      if (gameState.pointsOfPlayerTwo >= gameState.finalScore) {
        gameState.playerWin = PLAYER_TWO
        gameState.isGamePlaing = false
      } else {
        gameState.playerTurn = PLAYER_ONE
      }
      break
  }
  render('hold')
  playSound('hold')
}

function render(atAction) {
  switch (atAction) {
    case 'newgame':
      document.getElementById('first-player-name').innerText = 'first'
      document.getElementById('second-player-name').innerText = 'second'

      let first_player_name = document.getElementById('first-player-name')
      clonedWin_first_player_name = document
        .getElementById('first-player-name')
        .cloneNode(true)
      clonedWin_first_player_name.classList.remove(
        'animate__animated',
        'animate__infinite',
        'animate__rubberBand'
      )
      first_player_name.parentNode.replaceChild(
        clonedWin_first_player_name,
        first_player_name
      )

      let second_player_name = document.getElementById('second-player-name')
      clonedWin_second_player_name = document
        .getElementById('second-player-name')
        .cloneNode(true)
      clonedWin_second_player_name.classList.remove(
        'animate__animated',
        'animate__infinite',
        'animate__rubberBand'
      )
      second_player_name.parentNode.replaceChild(
        clonedWin_second_player_name,
        second_player_name
      )

      document.getElementById('btn-hold').classList.add('btn--disabled')
      document
        .getElementById('btn-roll-dices')
        .classList.remove('btn--disabled')
      document.getElementById('player-1-dancer').classList.add('dance')
      document.getElementById('player-2-dancer').classList.remove('dance')
      document.getElementById('player-1-safe-points').innerText =
        gameState.pointsToSafeForPlayerOne
      document.getElementById('player-2-safe-points').innerText =
        gameState.pointsToSafeForPlayerTwo
      document.getElementById('player-1-score').innerText =
        gameState.pointsOfPlayerOne
      document.getElementById('player-2-score').innerText =
        gameState.pointsOfPlayerTwo
      document.getElementById('result-img-player-1').src = ''
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
      document.getElementById('result-img-player-2').src = ''
      break

    case 'rolldices':
      if (gameState.firstDicePoints === 1 || gameState.secondDicePoints === 1) {
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
      ).src = `images/dice-${gameState.firstDicePoints}.png`
      document.getElementById(
        'dice-2'
      ).src = `images/dice-${gameState.secondDicePoints}.png`

      document.getElementById('player-1-safe-points').innerText =
        gameState.pointsToSafeForPlayerOne
      document.getElementById('player-2-safe-points').innerText =
        gameState.pointsToSafeForPlayerTwo

      switch (gameState.playerTurn) {
        case PLAYER_ONE:
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('player-1-dancer').classList.add('dance')
          break
        case PLAYER_TWO:
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.add('dance')
          break
      }
      const dice_1 = document.getElementById('dice-1')
      const clonedDice_1 = document.getElementById('dice-1').cloneNode(true)
      dice_1.parentNode.replaceChild(clonedDice_1, dice_1)

      const dice_2 = document.getElementById('dice-2')
      const clonedDice_2 = document.getElementById('dice-2').cloneNode(true)
      dice_2.parentNode.replaceChild(clonedDice_2, dice_2)
      break

    default:
      break

    case 'hold':
      document.getElementById('btn-hold').classList.add('btn--disabled')
      document.getElementById('player-1-score').innerText =
        gameState.pointsOfPlayerOne
      document.getElementById('player-2-score').innerText =
        gameState.pointsOfPlayerTwo
      document.getElementById('player-1-safe-points').innerText = 0
      document.getElementById('player-2-safe-points').innerText = 0

      switch (gameState.playerTurn) {
        case PLAYER_ONE:
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('player-1-dancer').classList.add('dance')
          break
        case PLAYER_TWO:
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.add('dance')
          break
      }

      let win_img_player_1
      let clonedWin_img_player_1
      let win_img_player_2
      let clonedWin_img_player_2
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
          document.getElementById('btn-hold').classList.add('btn--disabled')
          document
            .getElementById('btn-roll-dices')
            .classList.add('btn--disabled')
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('result-img-player-1').src =
            'images/win-pig.png'

          win_img_player_1 = document.getElementById('result-img-player-1')
          clonedWin_img_player_1 = document
            .getElementById('result-img-player-1')
            .cloneNode(true)
          win_img_player_1.parentNode.replaceChild(
            clonedWin_img_player_1,
            win_img_player_1
          )

          document
            .getElementById('result-img-player-1')
            .classList.add(
              'animate__animated',
              'animate__infinite',
              'animate__flip'
            )

          document.getElementById('result-img-player-2').src =
            'images/cat-loose.png'
          win_img_player_2 = document.getElementById('result-img-player-2')
          clonedWin_img_player_2 = document
            .getElementById('result-img-player-2')
            .cloneNode(true)
          win_img_player_2.parentNode.replaceChild(
            clonedWin_img_player_2,
            win_img_player_2
          )
          document
            .getElementById('result-img-player-2')
            .classList.add('animate__animated', 'animate__swing')
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
          document.getElementById('btn-hold').classList.add('btn--disabled')
          document
            .getElementById('btn-roll-dices')
            .classList.add('btn--disabled')
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('result-img-player-1').src =
            'images/cat-loose.png'
          document.getElementById('result-img-player-2').src =
            'images/win-pig.png'
          win_img_player_2 = document.getElementById('result-img-player-2')
          clonedWin_img_player_2 = document
            .getElementById('result-img-player-2')
            .cloneNode(true)
          win_img_player_2.parentNode.replaceChild(
            clonedWin_img_player_2,
            win_img_player_2
          )
          document
            .getElementById('result-img-player-2')
            .classList.add(
              'animate__animated',
              'animate__infinite',
              'animate__flip'
            )
          document
            .getElementById('result-img-player-1')
            .classList.add('animate__animated', 'animate__swing')

          win_img_player_1 = document.getElementById('result-img-player-1')
          clonedWin_img_player_1 = document
            .getElementById('result-img-player-1')
            .cloneNode(true)
          win_img_player_1.parentNode.replaceChild(
            clonedWin_img_player_1,
            win_img_player_1
          )
          break
      }
      break
    // default:
    //   throw Error(`render: switch/case ${atAction} not found`)
  }
}

function playSound(atAction) {
  switch (atAction) {
    case 'newgame':
      audio_win_music.pause()
      audio_win_music.currentTime = 0
      audio_main_music.play()
      break

    case 'hold':
      const isOneOfThePlayersWin =
        gameState.pointsOfPlayerOne >= gameState.finalScore ||
        gameState.pointsOfPlayerTwo >= gameState.finalScore
      if (isOneOfThePlayersWin) {
        audio_main_music.pause()
        audio_main_music.currentTime = 0
        audio_win_music.play()
        audio_pig_sound.play()
      }
      audio_cash_sound.pause()
      audio_cash_sound.currentTime = 0
      audio_cash_sound.play()
      break

    case 'rolldices':
      audio_dices_sound.pause()
      audio_dices_sound.currentTime = 0
      audio_dices_sound.play()
      const isWasDotPoint =
        gameState.firstDicePoints === 1 || gameState.secondDicePoints === 1
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

function onWinScoreInput() {
  gameState.finalScore = +document.getElementById('win-input').value
  if (+document.getElementById('win-input').value > 9999) {
    document.getElementById('win-input').value = 9999
    gameState.finalScore = 9999
  }
}

function onWinScoreInputBlur() {
  if (document.getElementById('win-input').value === '') {
    gameState.finalScore = 10
  }
}

//!!!
function remountComponent(id) {
  let component = document.getElementById(id)
  let cloned = document.getElementById(id).cloneNode(true)
  component.parentNode.replaceChild(cloned, component)
}

function rollDice() {
  return getRandomIntFromTo(1, 6)
}

function getRandomPlayerTurn() {
  return getRandomIntFromTo(1, 2)
}

function getRandomIntFromTo(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1))
}

function remountCloneNodeWithoutClasses(none, ...classes) {
  const clonedNode = node.cloneNode(true)
  clonedNode.classList.remove(...classes)
  node.parentNode.replaceChild(clonedNode, node)
}

document.addEventListener('keydown', event => {
  if (!gameState.isGamePlaing && event.code === 'Enter') {
    newGame()
  }
  if (gameState.isGamePlaing) {
    if (event.code === 'KeyQ' && gameState.playerTurn === PLAYER_ONE) {
      rollDices()
    }
    if (event.code === 'KeyP' && gameState.playerTurn === PLAYER_TWO) {
      rollDices()
    }
    //  e.key === ' '
    // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
    if (
      event.code === 'Space' &&
      (gameState.pointsToSafeForPlayerOne !== 0 ||
        gameState.pointsToSafeForPlayerTwo !== 0)
    ) {
      event.preventDefault()
      hold()
    }
  }
})

document.getElementById('win-input').value = gameState.finalScore

setTimeout(() => {
  document.querySelector('.intro-logo').classList.add('intro-logo--remove')
}, 4000)

function onAbout() {
  document.querySelector('.about-pop-up').classList.add('about-pop-up--show')
}

function hideAbout() {
  document.querySelector('.about-pop-up').classList.remove('about-pop-up--show')
}
