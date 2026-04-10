   //Used AI for error Handling and some other parts and marked with *


function searchFunc(searchInput, filter = '') {
    if (!searchInput) return

    const searchValue = searchInput.value.trim()
    
    if (searchValue === '') {
        alert('This is not a miracle to guess ur mind, enter valid value')
        return;
    }

    window.location.href = `./afterSearch.html?query=${searchValue}&filter=${filter}`   //*
}

async function displayMeals() {
    const urlParams = new URLSearchParams(window.location.search); //*
    const searchValue = urlParams.get('query')
    const cuisineList = document.getElementById('cuisineList')
    const filter = urlParams.get('filter')
    let category = []
    let cusines = []


    const loadingScreen = document.getElementById('loadingScreen');
    const mealContainer = document.getElementById('searchResult');

    if (!loadingScreen || !mealContainer) return;

    loadingScreen.style.display = 'flex';
    mealContainer.innerHTML = '';
    
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
        const data = await res.json();
        
        if (!data.meals) {
            mealContainer.innerHTML = '<p>No meals found</p>';
            return;
        }

        data.meals.forEach((dish) => {
            if (!cusines.includes(dish.strArea)) {
                cusines.push(dish.strArea)
                const button = document.createElement('button')
                button.className = 'cuisine-btn'
                if (filter === dish.strArea) button.classList.add('active');
                button.textContent = dish.strArea;

                button.addEventListener('click', () => {
                    appliedFilter(searchValue, dish.strArea);
                })

                cuisineList.appendChild(button)
            }
        })

        const allBtn = document.getElementById('btn');
        if (allBtn) {
            allBtn.className = 'cuisine-btn';
            if (!filter) allBtn.classList.add('active');
            allBtn.addEventListener('click', () => {
                appliedFilter(searchValue, '');
            })
        }

        if (filter) {
            data.meals = data.meals.filter((meal) => meal.strArea === filter)
        }

        
        data.meals.forEach((meal) => {
            
            const a = document.createElement('a');
            a.href = `./recipeDetail.html?query=${meal.idMeal}`;
            a.className = 'Card-link';
            
            a.innerHTML = `
                <div class="Card">
                    <div class="mealImage">
                        <span class="category">${meal.strCategory}</span>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                    <div class="mealInfo">
                        <h3>${meal.strMeal}</h3>
                        <p class="description">
                            ${meal.strInstructions ? meal.strInstructions.slice(0, 80) + '...' : 'Delicious recipe to try at home.'}
                        </p>
                    </div>
                </div>
            `

            mealContainer.appendChild(a);
        })

    } catch (error) {
        console.log(error);
        mealContainer.innerHTML = '<p>Error loading meals</p>';
    } finally {
        loadingScreen.style.display = 'none';
    }
}

if (window.location.pathname.includes('afterSearch.html')) {         //*
    document.addEventListener('DOMContentLoaded', displayMeals);    //*     
}


async function loadRandom() {
    const chefsSpecialImage = document.getElementById('chefsSpecialImage')
    const title =  document.getElementById('title')
    const shortDescription = document.getElementById('shortDescription')

    if (!chefsSpecialImage || !title || !shortDescription) return;

    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        const recipeData = await response.json()

        if (!recipeData) return

        shortDescription.innerText = `${recipeData.meals[0].strCategory}`
        title.innerText = `${recipeData.meals[0].strMeal}`

        chefsSpecialImage.src = `${recipeData.meals[0].strMealThumb}`
        localStorage.setItem('id', recipeData.meals[0].idMeal);


    } catch (error) {
        console.log(error)
    }
}


async function loadHomeDynamicContent() {
    const mostLovedGrid = document.getElementById('mostLovedGrid');
    const craveGrid = document.getElementById('craveGrid');

    if (!mostLovedGrid && !craveGrid) return

    try {
        const recipes = [];

        for (let i = 0; i < 6; i++) {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json()
            if (data.meals && data.meals[0]) {
                recipes.push(data.meals[0])
            }
        }
        if (mostLovedGrid) {
            mostLovedGrid.innerHTML = ''
            recipes.slice(0, 3).forEach(meal => {
                const card = createRecipeCard(meal)
                mostLovedGrid.appendChild(card)
            });
        }

        if (craveGrid) {
            craveGrid.innerHTML = ''
            recipes.slice(3, 6).forEach(meal => {
                const card = createRecipeCard(meal)
                craveGrid.appendChild(card)
            })
        }

    } catch (error) {
        console.error('Error loading home content:', error)
    }
}

function createRecipeCard(meal) {
    const a = document.createElement('a');
    a.href = `./recipeDetail.html?query=${meal.idMeal}`
    a.className = 'recommendation-card'
    a.innerHTML = `
        <div class="card-img-wrapper">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="card-body">
            <span class="card-category">${meal.strCategory}</span>
            <h3 class="card-title">${meal.strMeal}</h3>
            <div class="card-footer">
                <span>25 MINS</span>
                <span>EASY</span>
            </div>
        </div>
    `
    return a
}

document.addEventListener('DOMContentLoaded', () => {
    loadRandom()
    loadHomeDynamicContent()
});




const input = document.getElementById('afterSearchInputSection');

if (input) {
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            searchFunc(input)
            console.log('hi')
        }
    });
}

function search() {
    const searchInput = document.getElementById('nameOrIngridents');
    if (!searchInput) return;
    searchFunc(searchInput)
}



function appliedFilter(searchValue, btnValue) {
    console.log("HJ")
    searchFunc({ value: searchValue }, btnValue)       //*
}



function recipeDetails() {
    const id = localStorage.getItem('id')
    if (id) {
        window.location.href = `./recipeDetail.html?query=${id}`;
    }
}

