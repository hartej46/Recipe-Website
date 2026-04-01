async function SearchFunc() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.trim();
    
    if (searchValue === '') {
        alert('Please enter a search term');
        return;
    }

    const loadingScreen = document.getElementById('loadingScreen');
    const mealContainer = document.getElementById('mealContainer');

    loadingScreen.style.display = 'flex';
    mealContainer.innerHTML = '';
    
    
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        const data = await res.json()
        
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
            `

            mealContainer.appendChild(card);
        })


    } catch (error) {
        console.log(error)
        mealContainer.innerHTML = '<p>Error loading meals</p>';
    } finally {
        loadingScreen.style.display = 'none';
    }
}