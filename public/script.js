let allCoffees = [];

function fetchAllCoffees() {
    fetch('http://localhost:3003/coffees')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(coffees => {
            allCoffees = coffees; // Store all coffee data
        })
        .catch(error => {
            console.error('Failed to fetch all coffees:', error);
        });
}

function getRandomCoffee() {
    const coffeeDisplay = document.getElementById('coffeeDisplay');
    const coffeeDetails = document.getElementById('coffeeDetails');
    const coffeeImage = document.getElementById('coffeeImage');
    const loading = document.getElementById('loading');
    const crashLevelSelect = document.getElementById('crash-level');
    const selectedCrashLevel = crashLevelSelect.options[crashLevelSelect.selectedIndex].value;

    loading.style.display = 'block';
    coffeeDetails.innerHTML = '';
    coffeeImage.src = ''; // Clear previous image
    coffeeImage.alt = 'Loading image...';
    coffeeDisplay.style.display = 'none'; // Hide until coffee is found

    const filteredCoffees = allCoffees.filter(coffee => coffee.crashLv.toLowerCase() === selectedCrashLevel);

    if (filteredCoffees.length > 0) {
        const randomCoffee = filteredCoffees[Math.floor(Math.random() * filteredCoffees.length)];
        coffeeDetails.innerHTML = `
            <div class="Detail">Your Coffee of the Day Is <strong>${randomCoffee.name}</Strong>.</Div>
            <Div Class=”Detail”>Below Is a Composition of a Standard ${randomCoffee.size} of Your Coffee:</Div>
            <Div Class=”Detail ”><strong>${randomCoffee.espresso}</Strong> Espresso</Div>
            <Div Class=”Detail”><strong>${randomCoffee.steamedMilk}</Strong> Steamed Milk</Div>
            <Div Class=”Detail”><strong>${randomCoffee.milkFoam}</Strong> Milk Foam</Div>
            <Div Class=”Detail”>Recommended Optional Add-Ons: <strong>${randomCoffee.optionalAddOns}</Strong></Div>
            <Div Class=”Detail”>It Contains <strong>${randomCoffee.caffineLv}</Strong> of Caffeine.</Div>
            <br><br><!-- Adding 2 line breaks for spacing -->
            <div class="Detail" style="font-size: 8px;">Add-Ons Is a MUST DO If It Says "fill the remaining ..."</div>`; // Always included
                        
        coffeeImage.src = randomCoffee.img; // Set image source from the coffee data
        coffeeImage.alt = `Image of ${randomCoffee.name}`; // Set appropriate alt text
        coffeeDisplay.style.display = 'flex'; // Show coffee details and image
    } else {
        coffeeDetails.innerHTML = '<strong>No coffee found that matches the specified crash level.</strong>';
        coffeeDisplay.style.display = 'block'; // Show message only
    }
    loading.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', fetchAllCoffees);
