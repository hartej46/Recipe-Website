async function SearchFunc() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.trim();
    
    if (searchValue === '') {
        alert('Please enter a search term');
        return;
    }
    
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        const data = await res.json()
        
        const mealContainer = document.getElementById('mealContainer');
        mealContainer.innerHTML = '';
        
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
    }
}