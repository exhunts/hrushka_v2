let audio_main_music = document.getElementById('audio-main-music')
let audio_win_music = document.getElementById('audio-win-music')

let dices_sound = document.getElementById('dices-sound')
let audio_giggle_sound = document.getElementById('audio-giggle-sound')
let audio_cash_sound = document.getElementById('audio-cash-sound')

const PLAYER_ONE = 1
const PLAYER_TWO = 2
const NONE = 0

let gameState = {
  pointsOfPlayerOne: 0,
  pointsOfPlayerTwo: 0,
  pointsToSafeForPlayerOne: 0,
  pointsToSafeForPlayerTwo: 0,
  playerTurn: PLAYER_ONE,
  finalScore: 0,
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
  gameState = { ...gameState, ...initGameState }
  render('newgame')
  playSound('newgame')
}

function rollDices() {
  gameState.firstDicePoints = getRandomDicePoints()
  gameState.secondDicePoints = getRandomDicePoints()
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
    // case 'newstate':
    //   document
    //     .getElementById('btn-roll-dices')
    //     .classList.remove('btn--disabled')
    //   document.getElementById('btn-hold').classList.remove('btn--disabled')
    //   document.getElementById('player-1-dancer').classList.add('dance')
    //   document.getElementById('player-2-dancer').classList.remove('dance')
    //   document.getElementById('player-1-safe-points').innerText =
    //     gameState.pointsToSafeForPlayerOne
    //   document.getElementById('player-2-safe-points').innerText =
    //     gameState.pointsToSafeForPlayerTwo
    //   document.getElementById('player-1-score').innerText =
    //     gameState.pointsOfPlayerOne
    //   document.getElementById('player-2-score').innerText =
    //     gameState.pointsOfPlayerTwo
    //   break

    case 'newgame':
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
      document.getElementById('winner-text').innerText = ''
      document
        .getElementById('winner-text')
        .classList.remove(
          'animate__animated',
          'animate__infinite',
          'animate__rubberBand'
        )
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
          document.getElementById('btn-hold').classList.add('btn--disabled')
          document
            .getElementById('btn-roll-dices')
            .classList.add('btn--disabled')
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('winner-text').innerText = 'Player one win'
          document
            .getElementById('winner-text')
            .classList.add(
              'animate__animated',
              'animate__infinite',
              'animate__rubberBand'
            )

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
          document.getElementById('btn-hold').classList.add('btn--disabled')
          document
            .getElementById('btn-roll-dices')
            .classList.add('btn--disabled')
          document.getElementById('player-1-dancer').classList.remove('dance')
          document.getElementById('player-2-dancer').classList.remove('dance')
          document.getElementById('winner-text').innerText = 'Player two win'
          document
            .getElementById('winner-text')
            .classList.add(
              'animate__animated',
              'animate__infinite',
              'animate__rubberBand'
            )
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
          //   document
          //     .getElementById('winner-text')
          //     .classList.add(
          //       'animate__animated',
          //       'animate__infinite',
          //       'animate__rubberBand'
          //     )
          break
      }
      break
  }
}

function playSound(atAction) {
  switch (atAction) {
    case 'newgame':
      audio_win_music.pause()
      audio_win_music.currentTime = 0

      audio_main_music.loop = true
      audio_main_music.volume = 0.2
      // audio_main_music.load()
      audio_main_music.play()
      break

    case 'hold':
      switch (gameState.playerTurn) {
        case PLAYER_ONE:
          if (gameState.pointsOfPlayerOne >= gameState.finalScore) {
            audio_main_music.pause()
            audio_main_music.currentTime = 0

            audio_win_music.loop = false
            audio_win_music.volume = 1
            // audio_win_music.load()
            audio_win_music.play()
          }
          break
        case PLAYER_TWO:
          if (gameState.pointsOfPlayerTwo >= gameState.finalScore) {
            audio_main_music.pause()
            audio_main_music.currentTime = 0

            audio_win_music.loop = false
            audio_win_music.volume = 1
            // audio_win_music.load()
            audio_win_music.play()
          }
          break
      }
      audio_cash_sound.pause()
      audio_cash_sound.currentTime = 0
      audio_cash_sound.loop = false
      audio_cash_sound.volume = 1
      // audio_cash_sound.load()
      audio_cash_sound.play()
      break

    case 'rolldices':
      dices_sound.loop = false
      dices_sound.volume = 0.5
      // dices_sound.load()
      dices_sound.play()
      if (gameState.firstDicePoints === 1 || gameState.secondDicePoints === 1) {
        audio_giggle_sound.pause()
        audio_giggle_sound.currentTime = 0
        audio_giggle_sound.loop = false
        audio_giggle_sound.volume = 1
        // audio_giggle_sound.load()
        audio_giggle_sound.play()
      }
      break

    default:
      throw Error(`playSound: switch/case ${atAction} not found`)
  }
}

function getRandomDicePoints() {
  return Math.floor(Math.random() * 6) + 1
}
