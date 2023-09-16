// Retrieve the HTML elements
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertButton = document.getElementById('convert');
const result = document.getElementById('result');

// Initialize an empty object to store conversion rates
let conversionRates = {};

// Function to fetch and update conversion rates
async function fetchConversionRates() {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/83483a6b2c7a3c9ecc361b54/latest/USD');
        const data = await response.json();
        
        if (data.result === 'success') {
            conversionRates = data.conversion_rates;
            result.textContent = 'Conversion rates updated.';
        } else {
            result.textContent = 'Failed to fetch conversion rates.';
        }
    } catch (error) {
        result.textContent = 'An error occurred while fetching data.';
    }
}

// Initial fetch of conversion rates when the page loads
fetchConversionRates();

// Handle the conversion when the "Convert" button is clicked
convertButton.addEventListener('click', () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const inputAmount = parseFloat(amount.value);

    // Validate input
    if (!from || !to || isNaN(inputAmount)) {
        result.textContent = 'Please enter a valid amount.';
        return;
    }

    // Get the conversion rates
    const fromRate = conversionRates[from];
    const toRate = conversionRates[to];

    // Check if the conversion rates exist
    if (fromRate === undefined || toRate === undefined) {
        result.textContent = 'Invalid currency selection.';
        return;
    }

    // Perform the conversion
    const convertedAmount = (inputAmount / fromRate) * toRate;
    result.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${to}`;
});

// Optional: Add a button to manually update conversion rates
const updateRatesButton = document.getElementById('updateRates');
updateRatesButton.addEventListener('click', () => {
    fetchConversionRates();
});
