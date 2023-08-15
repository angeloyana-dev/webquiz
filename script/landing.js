function quickStart() {
  window.location.href = "quiz.html";
}

// APPLY CUSTOMIZATION
const selectedCategoryInput = document.querySelectorAll(
  'input[type="hidden"]'
)[0];
const questionTypeInput = document.querySelectorAll('input[type="hidden"]')[1];
const difficultyInput = document.querySelectorAll('input[type="hidden"]')[2];
const questionCountInput = document.querySelectorAll('input[type="hidden"]')[3];

const selectedCategoryDisplay = document.getElementById(
  "selectedCategoryDisplay"
);
const questionTypeDisplay = document.getElementById("questionTypeDisplay");
const difficultyDisplay = document.getElementById("difficultyDisplay");
const questionCountDisplay = document.getElementById("questionCountDisplay");

function applyCategory(value, category) {
  selectedCategoryDisplay.innerText = `Selected - ${category}`;
  selectedCategoryInput.value = value;
  closeCategoriesList();
}

function applyQuestionType(type) {
  const decoded = type === "multiple" ? "Multiple choices" : "True or False";
  questionTypeDisplay.innerText = `Selected - ${
    type === "random" ? "Random" : decoded
  }`;
  questionTypeInput.value = type;
}

function applyDifficulty(difficulty) {
  difficultyDisplay.innerText = `Selected - ${difficulty[0].toUpperCase()}${difficulty.slice(
    1
  )}`;
  difficultyInput.value = difficulty;
}

function applyQuestionCount(method) {
  if (method === "increment") {
    if (questionCountDisplay.innerText == 50) return;
    questionCountDisplay.innerText = Number(questionCountDisplay.innerText) + 5;
    questionCountInput.value = questionCountDisplay.innerText;
  } else {
    if (questionCountDisplay.innerText == 5) return;
    questionCountDisplay.innerText = Number(questionCountDisplay.innerText) - 5;
    questionCountInput.value = questionCountDisplay.innerText;
  }
}

// DYNAMIC FUNCTIONS
const customizeContainer = document.getElementById("customize");
const customizeWrapper = document.querySelector("#customize > .wrapper");

function showCustomize() {
  customizeContainer.style.display = "block";
  setTimeout(() => {
    customizeContainer.style.opacity = "1";
    customizeWrapper.style.transform = "translateY(0)";
  }, 1);
}

function closeCustomize() {
  customizeContainer.style.opacity = "0";
  customizeWrapper.style.transform = "translateY(100%)";
  setTimeout(() => {
    customizeContainer.style.display = "none";
  }, 300);
}

const categoriesList = document.getElementById("categoriesList");
const categoriesButtonList = document.getElementById("categoriesButtons");
const categoriesButtons = categoriesButtonList.querySelectorAll("button");

function showCategoriesList() {
  categoriesList.style.display = "flex";
  setTimeout(() => {
    categoriesList.style.opacity = "1";
  }, 1);

  for (let i = 0; i < categoriesButtons.length; i++) {
    let timer = 100 + Number(`${i}0`); // Milliseconds
    setTimeout(() => {
      categoriesButtons[i].style.opacity = "1";
      categoriesButtons[i].style.transform = "translateY(0)";
    }, timer);
  }
}

function closeCategoriesList() {
  setTimeout(() => {
    categoriesList.style.opacity = "0";
    setTimeout(() => {
      categoriesList.style.display = "none";
    }, 150);
  }, 200);

  for (let i = 0; i < categoriesButtons.length; i++) {
    let timer = 1 + Number(`${i}0`); // Milliseconds
    setTimeout(() => {
      categoriesButtons[i].style.opacity = "0";
      categoriesButtons[i].style.transform = "translateY(20px)";
    }, timer);
  }
}

document.getElementById("searchInputCategories").addEventListener('input', (e) => {
	const query = e.target.value
	categoriesButtons.forEach((targetBtn) => {
		if(targetBtn.textContent.toLowerCase().includes(query)){
			targetBtn.style.display = 'block'
			setTimeout(() => {
				targetBtn.style.opacity = '1'
				targetBtn.style.transform = 'translateY(0)'
			}, 1)
		} else {
			targetBtn.style.opacity = '0'
			targetBtn.style.transform = 'translateY(20px)'
			targetBtn.style.display = 'none'
		}
	})
})
