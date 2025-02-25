const button = document.getElementById("button");
const audioElement = document.getElementById("audio")
const JOKE_API = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
let joke


function toggleButton() {
    button.disabled = !button.disabled
}

function tellMe(joke) {
    const jokeString = joke.trim().replace(getJokes, '%20')
    VoiceRSS.speech({
        key: '18ea73a94e1f49d28921a3d136d8cffb',
        src: `${jokeString}`,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}

async function getJokes() {
    try {
        const response = await fetch(JOKE_API)
        const data = await response.json()
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = `${data.joke}`
        }
        tellMe(joke)
        toggleButton()
    } catch (error) {
        console.log("Whoops", error)
    }
}

getJokes()
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)