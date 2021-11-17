const title = document.querySelector(".title")
const playButton = document.querySelector(".play-btn")

const restart = () => {
    location.reload()
}

const getTargetNumber = (randomNumbers) => {
    let randomIndex = Math.round(Math.random() * 2)
    return randomNumbers[randomIndex]
}

let idx = 0;

const guessingGame = () => {
    let randomNumbers = [];

    for (let idx = 0; idx < 3; idx++) {
        let randomNumber = Math.round(Math.random() * 100)
        randomNumbers.push(randomNumber)
    }

    let targetNumber = getTargetNumber(randomNumbers)

    const mainCont = document.createElement("div")
    mainCont.classList.add("main-cont")

    const title2 = document.createElement("h1")
    title2.textContent = "Guess The Secret Number"
    mainCont.append(title2)

    const div = document.createElement("div")
    div.classList.add("align-horizantal")

    
    mainCont.append(div)

    document.body.prepend(mainCont)

    randomNumbers.forEach(randomNumber => {
        const option = document.createElement("div")
        option.textContent = randomNumber;
        option.classList.add("option")
        div.append(option)

        option.addEventListener("click", eve => {
            if (eve.target.textContent === String(targetNumber)) {
                mainCont.remove()
                if (idx < 9) {
                    guessingGame()
                    idx++;
                } else {

                    const successMessage = document.createElement("h1");
                    successMessage.textContent = `You Win!!! You Made Through This 10 Rounds! Great`
                    successMessage.style.textAlign = "center";
                    document.body.prepend(successMessage)

                    const playAgain = document.createElement("button");
                    playAgain.classList.add("play-btn")
                    playAgain.textContent = "Play Again"
                    successMessage.after(playAgain)

                    playAgain.addEventListener("click", restart)
                }
            } else {
                mainCont.remove()
                const failedMessage = document.createElement("h1");
                failedMessage.textContent = `You Lose...The Correct Guess Should Be ${targetNumber}`
                failedMessage.style.textAlign = "center";
                document.body.prepend(failedMessage)

                const restartButton = document.createElement("button");
                restartButton.classList.add("play-btn")
                restartButton.textContent = "Restart"
                failedMessage.after(restartButton)

                restartButton.addEventListener("click", restart)
            }
        })
    })
}

playButton.addEventListener("click", () => {
    playButton.remove()
    title.remove()

    guessingGame()
})