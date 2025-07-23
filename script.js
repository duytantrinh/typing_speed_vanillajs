const words = [
  "abandon",
  "beacon",
  "candy",
  "dove",
  "eagle",
  "flame",
  "grape",
  "happy",
  "ice",
  "jungle",
  "kingdom",
  "lunar",
  "mango",
  "noble",
  "ocean",
  "petal",
  "quest",
  "river",
  "shadow",
  "train",
  "umbrella",
  "vivid",
  "whale",
  "basket",
  "yellow",
  "zebra",
  "angel",
  "brave",
  "crane",
  "dusk",
  "enigma",
  "frost",
  "glow",
  "honey",
  "index",
  "juice",
  "knight",
  "lunar",
  "magic",
  "night",
  "oasis",
  "pearl",
  "quill",
  "rose",
  "scent",
  "tiger",
  "unity",
  "vortex",
  "wind",
  "xray",
  "yogurt",
  "zoned",
  "atlas",
  "bliss",
  "cider",
  "dawn",
  "epoch",
  "flame",
  "gauge",
  "heaven",
  "irony",
  "jolly",
  "koala",
  "lamb",
  "mint",
  "neon",
  "opal",
  "plum",
  "quartz",
  "ruby",
  "sunset",
  "tango",
  "urban",
  "vogue",
  "wave",
  "xerox",
  "yearn",
  "zephyr",
  "aqua",
  "bold",
  "crisp",
  "dove",
  "edge",
  "forge",
  "grace",
  "hush",
  "ink",
  "jade",
  "kite",
  "leaf",
  "mist",
  "navy",
  "oak",
  "pale",
  "quilted",
  "rare",
  "stone",
  "tone",
  "urban",
  "vibes",
  "wisp",
  "yacht",
  "zeal",
  "arc",
  "blaze",
  "core",
  "dust",
  "echo",
  "flint",
  "gaze",
  "halo",
  "iron",
  "june",
  "kale",
  "lime",
  "moss",
  "nest",
  "ore",
  "peach",
  "quail",
  "ridge",
  "snow",
  "tide",
  "use",
  "vow",
  "window",
  "xmas",
  "yoga",
  "zoo",
  "amber",
  "breeze",
  "clover",
  "drift",
  "enjoy",
  "flame",
  "grin",
  "hatch",
  "icicle",
  "jazz",
  "knack",
  "latch",
  "mocha",
  "nail",
  "open",
  "pale",
  "quiz",
  "rust",
  "sail",
  "tide",
  "ugly",
  "vowed",
  "wool",
  "xenon",
  "yawned",
  "zone",
  "awe",
  "belt",
  "charm",
  "dome",
  "elixir",
  "fawn",
  "gala",
  "hop",
  "inc",
  "june",
  "knot",
  "lump",
  "moon",
  "noon",
  "opal",
  "pier",
  "quiver",
  "ride",
  "stare",
  "twin",
  "unit",
  "vase",
  "wax",
  "yolk",
  "zoom",
  "arrow",
  "brick",
  "cloud",
  "dune",
  "eagle",
  "frost",
  "grip",
  "haze",
  "ignite",
  "jacket",
  "lure",
  "mesh",
  "nest",
  "ogre",
  "puff",
  "quilt",
  "rave",
  "swoop",
  "track",
  "urge",
  "view",
  "windy",
  "yell",
  "zen",
  "bolt",
  "clip",
  "deep",
  "echo",
  "flare",
  "gaze",
  "heron",
  "iris",
  "jolt",
  "key",
  "lily",
  "mint",
  "nook",
  "olive",
  "plow",
  "quill",
  "rust",
  "sage",
  "tick",
  "uniform",
  "vibe",
  "whip",
  "yarn",
  "zoomed",
  "art",
  "blow",
  "core",
  "dove",
  "eagle",
  "foam",
  "gloom",
  "hand",
  "ice",
  "joke",
  "knee",
  "loaf",
  "melt",
  "note",
  "open",
  "pale",
  "quill",
  "roar",
  "slug",
  "tear",
  "urge",
  "blank",
  "wait",
  "yawn",
  "zinc",
]

const textContainer = document.querySelector("#text-container")
const timerElement = document.querySelector("#timer")
const tryAgainBtn = document.querySelector("#try-again")
const finalScore = document.querySelector("#final-score")

let totalTyped = ""
let currentCharIndex = 0
let errors = 0
let longText = generateLongText()

// == for timer
let timeLeft = 60
let timerInterval
let typingStarted = false

// (1. Shuffle the words array)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

// (2. Combine shuffled words into 1 long string with spaces)
function generateLongText() {
  //   const shufflewords = shuffleArray([...words])
  const shufflewords = shuffleArray(words)

  return shufflewords.join(" ")
}

// (3. handle Typing over the displayed text and scrolling)
document.addEventListener("keydown", (e) => {
  startTimer() // only start timer when start typing

  if (e.key === "Backspace") {
    // remove previous letter
    if (totalTyped.length > 0) {
      currentCharIndex = Math.max(currentCharIndex - 1, 0)
      totalTyped = totalTyped.slice(0, -1)
    }
  }
  // ONLY SINGLE LETTER keys can be tracked
  else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totalTyped += e.key
    currentCharIndex++
  }

  console.log(
    "e.key:",
    e.key,
    " / totalTyped: ",
    totalTyped,
    " / currentCharIndex: ",
    currentCharIndex
  )

  // split word inside array into single letter
  const textArray = longText.split("")
  // console.log(textArray)

  textContainer.innerText = ""
  errors = 0

  for (let i = 0; i < textArray.length; i++) {
    const span = document.createElement("span")

    if (i < totalTyped.length) {
      if (totalTyped[i] === textArray[i]) {
        span.classList.add("correct")
      } else {
        span.classList.add("error")
        errors++
      }
    }

    span.textContent = textArray[i]

    textContainer.appendChild(span)
  }

  // Scroll container (text) after 20 characters, each scrolling is 14px
  if (totalTyped.length >= 20) {
    const scrollAmount = (totalTyped.length - 20) * 14
    textContainer.scrollLeft = scrollAmount
  }
})

// (4. Start Countdown Timer)
function startTimer() {
  if (!typingStarted) {
    typingStarted = true

    timerInterval = setInterval(() => {
      timeLeft--
      timerElement.textContent = `Time left: ${timeLeft}s`

      if (timeLeft <= 0) {
        clearInterval(timerInterval)
        endTest()
      }
    }, 1000)
  }
}

// (5. end Test and display final score)
function endTest() {
  timerElement.textContent = `Time's up!!!`
  finalScore.textContent = `Final WPM: ${calculateWPM()} `
  textContainer.style.display = "none"
  tryAgainBtn.style.display = "block"
}

// (6. Calculate word-per-minute (WPM))
function calculateWPM() {
  // .split(/\s+/) : split spaces( don't count space)
  // totalTyped.trim().split(/\s+/) : words already been typed
  const wordsTyped = totalTyped.trim().split(/\s+/).length
  // console.log(wordsTyped, totalTyped.trim().split(/\s+/))

  // const baseWPM = Math.round((wordsTyped / 6) * 60) // timer : 6s => convert to minutes
  const baseWPM = Math.round((wordsTyped / 60) * 60) // timer : 60s => convert to minutes

  // only count right letter
  const rightWordWPM = Math.max(baseWPM - errors, 0)

  return rightWordWPM
}

// (7. Reset for Try Again Button)
function resetTest() {
  clearInterval(timerInterval)
  timeLeft = 60
  timerElement.textContent = `Time left: ${timeLeft}s`
  finalScore.textContent = ""
  textContainer.style.display = "block"
  tryAgainBtn.style.display = "none"

  totalTyped = ""
  currentCharIndex = 0
  errors = 0
  longText = generateLongText()
  // console.log(longText)

  typingStarted = false
  init()
}

function init() {
  console.log(isMobileDevice())
  if (isMobileDevice()) {
    showMobileMessage()
  } else {
    textContainer.textContent = longText
    timerElement.textContent = `Time left: ${timeLeft}s`
  }
}

// (8. Try Again Button Listenner)
tryAgainBtn.addEventListener("click", resetTest)

// (9. Detect Mobile device)
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800
}

// Show message for mobile
function showMobileMessage() {
  textContainer.textContent = "This typing test is only designed for desktop"
}

init()
