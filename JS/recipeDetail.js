async function details() {
    const urlParams = new URLSearchParams(window.location.search)
    const mealId = urlParams.get('query')

    const loadingScreen = document.getElementById('loadingScreen')
    const heroSection   = document.getElementById('hero')
    const layoutSection = document.getElementById('layout')
    const image         = document.getElementById('heroImage')

    if (!loadingScreen || !heroSection) return

    loadingScreen.style.display = 'flex'
    heroSection.style.display   = 'none'
    layoutSection.style.display = 'none'

    try {
        const response   = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const recipeData = await response.json();
        const meal       = recipeData.meals ? recipeData.meals[0] : null

        if (!meal) {
            loadingScreen.innerHTML = '<p>Recipe not found.</p>'
            return;
        }

        image.src = meal.strMealThumb
        image.alt = meal.strMeal

        document.getElementById('mealTitle').textContent = meal.strMeal;
        document.getElementById('mealCategory').textContent = `${meal.strCategory}`
        document.getElementById('mealArea').textContent     = `${meal.strArea}`

        const ytLink = document.getElementById('youtubeLink')
        if (meal.strYoutube) {
            ytLink.href = meal.strYoutube;
            ytLink.style.display = 'inline-flex'
        } else {
            ytLink.style.display = 'none'
        }

        const tagsContainer = document.getElementById('tags')
        tagsContainer.innerHTML = ''
        if (meal.strTags) {
            meal.strTags.split(',').forEach(tag => {
                if (tag.trim()) {
                    const span = document.createElement('span')
                    span.className = 'tag'
                    span.textContent = tag.trim()
                    tagsContainer.appendChild(span)
                }
            });
        }

        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = '';

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure    = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim()) {
                const li = document.createElement('li');
                li.className = 'ingredient-item';
                li.innerHTML = `
                    <img 
                        src="https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient.trim())}-Small.png" 
                        alt="${ingredient.trim()}"
                        onerror="this.style.display='none'"
                    >
                    <div class="ingredient-info">
                        <span class="ingredient-name">${ingredient.trim()}</span>
                        <span class="ingredient-measure">${measure ? measure.trim() : ''}</span>
                    </div>
                `;
                ingredientsList.appendChild(li);
            }
        }

        const stepsContainer = document.getElementById('steps')
        stepsContainer.innerHTML = ''

        if (meal.strInstructions) {
            const rawSteps = meal.strInstructions            //*
                .split(/\r?\n+/)
                .map(s => s.trim())
                .filter(s => s.length > 0);

            rawSteps.forEach((step, index) => {
                const stepDiv = document.createElement('div')
                stepDiv.className = 'step'
                stepDiv.innerHTML = `
                    <div class="step-number">${index + 1}</div>
                    <p class="step-text">${step}</p>
                `;
                stepsContainer.appendChild(stepDiv)
            });
        }
        loadingScreen.style.display = 'none'
        heroSection.style.display   = 'block'
        layoutSection.style.display = 'grid'
        document.getElementById('moreLikeThis').style.display = 'block'

        const trayImg = document.getElementById('trayImage')
        if (trayImg) trayImg.src = meal.strMealThumb

    } catch (error) {
        console.error('Error loading recipe:', error)
        loadingScreen.innerHTML = '<p style="color: #ba1a1a; font-weight: bold;">Something went wrong. Please try again.</p>'
    }
}

async function loadMoreLikeThis() {
    const grid = document.getElementById('recommendationsGrid')
    if (!grid) return

    grid.innerHTML = ''

    try {
        for (let i = 0; i < 3; i++) {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            const data = await response.json()
            const meal = data.meals[0]

            if (meal) {
                const card = document.createElement('a')
                card.href = `./recipeDetail.html?query=${meal.idMeal}`
                card.className = 'recommendation-card'
                card.innerHTML = `
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
                grid.appendChild(card)
            }
        }
    } catch (error) {
        console.error('Error loading recommendations:', error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    details()
    loadMoreLikeThis()
});

function searchFunc(searchInput, filter = '') {
    if (!searchInput) return

    const searchValue = searchInput.value.trim()
    
    if (searchValue === '') {
        alert('This is not a miracle to guess ur mind, enter valid value')
        return
    }

    window.location.href = `./afterSearch.html?query=${searchValue}&filter=${filter}`   //*
}

const searchValueInput = document.getElementById('searchValueInput')


if (searchValueInput) {
    searchValueInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            searchFunc(searchValueInput)
        }
    })
}