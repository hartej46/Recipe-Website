function searchFunc() {
    const searchInput = document.getElementById('nameOrIngridents');
    if (!searchInput) return;

    const searchValue = searchInput.value.trim();
    
    if (searchValue === '') {
        alert('This is not a miracle to guess ur mind, enter valid value');
        return;
    }

    window.location.href = `./afterSearch.html?query=${searchValue}`;   //*
}

async function displayMeals() {
    const urlParams = new URLSearchParams(window.location.search); //*
    const searchValue = urlParams.get('query');
    

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
        
        data.meals.forEach((meal) => {
            const card = document.createElement('div');
            card.className = 'Card';
            
            card.innerHTML = `
                <div class="mealImage">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <div class="mealInfo">
                    <h3>${meal.strMeal}</h3>
                </div>
            `;

            mealContainer.appendChild(card);
        });

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
    
    //Used AI for error Handling and some parts and marked with *
