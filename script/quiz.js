const urlToFetch = createURLToFetch()
fetchQuestions(urlToFetch)
	.then(questions => {
		updateQuestionDisplay(questions[0])
		updateChoicesBtn(questions[0].choices, questions[0].correct, questions)
		totalQuestionIndicator.innerText = questions.length
		currentQuestionNumber.innerText = currentQuestionIndex + 1
		difficultyIndicator.innerText = questions[0].difficulty[0].toUpperCase() + questions[0].difficulty.slice(1)
		removePreloader()
		
		function startNewQuestion(){
			checkClick = false
			if(Number(currentQuestionNumber.innerText) == questions.length){
				return showFinalResult(questions.length)
			}
			
			currentQuestionNumber.innerText = currentQuestionIndex === 1 ? 2 : currentQuestionIndex + 1
			difficultyIndicator.innerText = questions[currentQuestionIndex].difficulty[0].toUpperCase() + questions[currentQuestionIndex].difficulty.slice(1)
			hideNextBtn()
			updateQuestionDisplay(questions[currentQuestionIndex])
			updateChoicesBtn(questions[currentQuestionIndex].choices, questions[currentQuestionIndex].correct, questions)
		}
		
		nextBtn.addEventListener('click', startNewQuestion)
	})
	.catch(err => updatePreloader('error'))


var currentQuestionIndex = 0
var checkClick = false

// Functions
// Creates Choices Button Element
function updateChoicesBtn(choices, correct, questions){
	const choicesWrapper = document.getElementById("choicesWrapper")
	choicesWrapper.innerHTML = ''
	choices.forEach((choice) => {
		const choiceBtn = document.createElement('button')
		const choiceTextbox = document.createElement('span')
		choiceBtn.dataset.choice = choice
		choiceTextbox.innerHTML = choice
		
		choiceBtn.addEventListener('click', choice == correct ? eventlistenerCorrect : eventlistenerWrong, { once: true })
		
		function eventlistenerCorrect(){
			if(checkClick) return
			checkClick = true
			choiceTextbox.innerText = `${choiceTextbox.innerText} - Your answer`
			showNextBtn(questions)
			updateIndicators(choiceBtn , choicesWrapper, true)
		}
		
		function eventlistenerWrong(){
			if(checkClick) return
			checkClick = true
			choiceTextbox.innerText = `${choiceTextbox.innerText} - Your answer`
			showNextBtn(questions)
			updateIndicators(choiceBtn , choicesWrapper, false, correct)
		}
		
		choiceBtn.append(choiceTextbox)
		choicesWrapper.append(choiceBtn)
	})
}

// Update question textbox
function updateQuestionDisplay(question){
	const questionTextbox = document.getElementById("questionTextbox")
	const questionCategoryDisplay = document.getElementById("questionCategoryDisplay")
	questionTextbox.innerHTML = question.question
	questionCategoryDisplay.innerText = question.category
}

// Updates point, question indicators
const pointsIndicator = document.getElementById("pointsIndicator")
var currentQuestionNumber = document.getElementById("currentQuestionNumber")
var totalQuestionIndicator = document.getElementById("totalQuestion")
var difficultyIndicator = document.getElementById("difficultyIndicator")

function updateIndicators(choiceBtn, choicesWrapper, answer, correct){
	const otherChoicesBtn = choicesWrapper.querySelectorAll('button')
	if(answer){
		pointsIndicator.innerText = Number(pointsIndicator.innerText) + 1
		
		otherChoicesBtn.forEach((otherChoiceBtn) => {
			otherChoiceBtn.classList.add('wrong-btn')
		})
		
		choiceBtn.classList.remove('wrong-btn')
		choiceBtn.classList.add('correct-btn')
	} else {
		otherChoicesBtn.forEach((otherChoiceBtn) => {
			otherChoiceBtn.classList.add('wrong-btn')
			if(otherChoiceBtn.dataset.choice.includes(correct)){
				otherChoiceBtn.classList.remove('wrong-btn')
				otherChoiceBtn.classList.add('correct-btn')
			}
		})
	}
}

var nextBtn = document.getElementById("nextBtn")

// Procedures to the next questions
function showNextBtn(questions){
	currentQuestionIndex++
	if(currentQuestionIndex == totalQuestionIndicator.innerText){
		const nextBtnTextbox = nextBtn.querySelector('span')
		nextBtnTextbox.innerText = 'Result'
	}
	
	nextBtn.style.display = 'block'
	setTimeout(() => {
		nextBtn.style.opacity = '1'
		nextBtn.style.transform = 'translateY(3px)'
	}, 1)
}

function hideNextBtn(){
	nextBtn.style.opacity = '0'
	nextBtn.style.transform = 'translateY(20px)'
	setTimeout(() => {
		nextBtn.style.display = 'none'
	}, 150)
}

const finalResultPage = document.querySelector('.finalResultPage')
const resultWrapper = finalResultPage.querySelector('.wrapper')
const resultPointsDisplay = document.getElementById("resultPointsDisplay")
// Show final result and allow user to restart or go back to main menu
function showFinalResult(questionsLength){
	resultPointsDisplay.innerText = `${pointsIndicator.innerText} out of ${totalQuestionIndicator.innerText}`
	finalResultPage.style.display = 'flex'
	setTimeout(() => {
		finalResultPage.style.opacity = '1'
		setTimeout(() => {
			resultWrapper.style.transform = 'translateY(0)'
		}, 151)
	}, 1)
}

// Fetching questions in API
async function fetchQuestions(queries){
	try {
		const res = await fetch(queries)
		let questions = await res.json()
		questions = questions.results.map((question) => {
			const choices = question.incorrect_answers.concat(question.correct_answer)
			const randomizedChoices = choices.sort(() => {
				return Math.floor(Math.random() - 0.5)
			})
			
			return {
				category: question.category,
				question: question.question,
				difficulty: question.difficulty,
				choices: randomizedChoices,
				correct: question.correct_answer
			}
		})
		
		return questions
	} catch(err){
		throw new Error(err)
	}
}

// Getting customization in url queries and creating the url to fetch
function createURLToFetch(){
	const params = new URLSearchParams(window.location.search)
	const category = params.get('category') || 'random'
	const type = params.get('type') || 'random'
	const difficulty = params.get('difficulty') || 'random'
	const amount = params.get('amount') || 10
	
	const fetchQueries = []
	let fetchURL = 'https://opentdb.com/api.php?'
	
	if(category !== 'random'){ fetchQueries.push(`category=${category}`) }
	if(type !== 'random'){ fetchQueries.push(`type=${type}`) }
	if(difficulty !== 'random'){ fetchQueries.push(`difficulty=${difficulty}`) }
	fetchQueries.push(`amount=${amount}`)
	
	const queriesURLEncoded = fetchQueries.join('&')
	fetchURL = fetchURL + queriesURLEncoded
	return fetchURL
}

// Preloader
function removePreloader(){
	const preloaderPage = document.getElementById("preloader")
	preloaderPage.style.opacity = '0'
	setTimeout(() => {
		preloaderPage.style.display = 'none'
	}, 201)
}

function updatePreloader(type){
	const errorText = document.getElementById("errorText")
	const loadingText = document.getElementById("loadingText")
	if(type === 'error'){
		loadingText.style.opacity = '0'
		setTimeout(() => {
			loadingText.style.display = 'none'
			errorText.style.display = 'block'
			setTimeout(() => {
				errorText.style.opacity = '1'
			}, 1)
			
		}, 200)
	}
}

// Redirections
function tryAgain(){
	window.location.reload()
}

function goToLanding(){
	window.location.href = 'landing.html'
}