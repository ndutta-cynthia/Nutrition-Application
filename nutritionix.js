const appId = 'c8546fb1';
const apiKey = 'f59dc49d3ee427581cb622c6b94f61d4';
const getResults = document.getElementById('searchedItem');
let isTextDisplayed = false;
const endpoint = 'https://trackapi.nutritionix.com/v2/search/instant';
async function getFood(foodQuery) {
    const url = `${endpoint}?query=${encodeURIComponent(foodQuery)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-app-id': appId,
            'x-app-key': apiKey
        },
        mode: 'cors'
    });
    if (response.status === 200) {
        const result = await response.json();
        return result;
    } else if (response.status === 204) {
        return [];
    } else {
        throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
    }
}
async function landingPage() {
    try {
        const defaultFoodData = await getFood('fruit');
        const images = document.getElementById('images');
        images.innerHTML = ''; // Clear existing content

        if (defaultFoodData.common.length > 0) {
            defaultFoodData.common.forEach(item => {
                const singleItem = document.createElement('div');
            singleItem.classList.add('single-item');
            const image = document.createElement('img');
            image.src = item.photo.thumb;
            singleItem.appendChild(image);
            const foodComponents = document.createElement('div');
            foodComponents.classList.add('food-components');
            const foodName = document.createElement('h5');
            foodName.textContent = item.food_name;
            const servingInfo = document.createElement('p');
            servingInfo.textContent = `${item.serving_qty} ${item.serving_unit}`;
            const calorieInfo = document.createElement('p');
            calorieInfo.textContent = `Calories: ${item.nf_calories}`;
            foodComponents.appendChild(foodName);
            foodComponents.appendChild(servingInfo);
            foodComponents.appendChild(calorieInfo);
            singleItem.appendChild(foodComponents);
            images.appendChild(singleItem);
            });
        }

        // Similar iteration for branded items if needed
        if (defaultFoodData.branded.length > 0) {
            defaultFoodData.branded.forEach(item => {
                const singleItem = document.createElement('div');
            singleItem.classList.add('single-item');
            const image = document.createElement('img');
            image.src = item.photo.thumb;
            singleItem.appendChild(image);
            const foodComponents = document.createElement('div');
            foodComponents.classList.add('food-components');
            const foodName = document.createElement('h5');
            foodName.textContent = item.food_name;
            const servingInfo = document.createElement('p');
            servingInfo.textContent = `${item.serving_qty} ${item.serving_unit}`;
            const calorieInfo = document.createElement('p');
            calorieInfo.textContent = `Calories: ${item.nf_calories}`;
            foodComponents.appendChild(foodName);
            foodComponents.appendChild(servingInfo);
            foodComponents.appendChild(calorieInfo);
            singleItem.appendChild(foodComponents);
            resultsContainer.appendChild(singleItem);
            });
        }
    } catch (error) {
        console.error('Error loading default food data:', error);
        displayError(error);
    }
}