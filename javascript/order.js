// Pricing logic (placeholder - adjust to match your backend)
const pricing = {
    // Zone 1: 600 cedis for 5000L, 850 above 5000L
    eastlegon: { deliveryFee: 20, pricePerLitre: 600 / 5000 },
    adjiringanor: { deliveryFee: 20, pricePerLitre: 600 / 5000 },
    ashaley_botwe: { deliveryFee: 22, pricePerLitre: 600 / 5000 },
    ablekuma: { deliveryFee: 16, pricePerLitre: 600 / 5000 },
    achimota: { deliveryFee: 14, pricePerLitre: 600 / 5000 },
    airport_residential: { deliveryFee: 10, pricePerLitre: 600 / 5000 },
    abokobi: { deliveryFee: 22, pricePerLitre: 600 / 5000 },
    roman_ridge: { deliveryFee: 10, pricePerLitre: 600 / 5000 },
    abelemkpe: { deliveryFee: 11, pricePerLitre: 600 / 5000 },
    dzorwulu: { deliveryFee: 11, pricePerLitre: 600 / 5000 },
    tesano: { deliveryFee: 13, pricePerLitre: 600 / 5000 },
    osu: { deliveryFee: 8, pricePerLitre: 600 / 5000 },
    sowutoum: { deliveryFee: 15, pricePerLitre: 600 / 5000 },
    nima: { deliveryFee: 10, pricePerLitre: 600 / 5000 },
    new_ashongman: { deliveryFee: 19, pricePerLitre: 600 / 5000 },
    old_ashongman: { deliveryFee: 18, pricePerLitre: 600 / 5000 },

    // Zone 2: 500 cedis for 5000L, 750 above 5000L
    dansoman: { deliveryFee: 10, pricePerLitre: 500 / 5000 },
    kwashieman: { deliveryFee: 14, pricePerLitre: 500 / 5000 },
    odokor: { deliveryFee: 12, pricePerLitre: 500 / 5000 },
    darkuman: { deliveryFee: 14, pricePerLitre: 500 / 5000 },
    lapaz: { deliveryFee: 15, pricePerLitre: 500 / 5000 },
    abeka: { deliveryFee: 13, pricePerLitre: 500 / 5000 },
    awoshi: { deliveryFee: 12, pricePerLitre: 500 / 5000 },
    weija: { deliveryFee: 15, pricePerLitre: 500 / 5000 },
    kaneshie: { deliveryFee: 14, pricePerLitre: 500 / 5000 },
};

// Helper: Calculate price based on location and water amount
function calculateEstimatedPrice(location, waterAmount) {
    if (location && waterAmount) {
        const { deliveryFee, pricePerLitre } = pricing[location];
        return (waterAmount * pricePerLitre + deliveryFee).toFixed(2);
    }
    return '0.00';
}

// Update price estimate dynamically
function updatePriceEstimate() {
    const location = document.getElementById('location').value;
    const waterAmount = parseFloat(document.getElementById('water-amount').value) || 0;
    const totalPrice = calculateEstimatedPrice(location, waterAmount);
    document.getElementById('price-estimate').textContent = `GHS${totalPrice}`;
}

// Event listeners for dynamic price updates
document.getElementById('location').addEventListener('change', updatePriceEstimate);
document.getElementById('water-amount').addEventListener('input', updatePriceEstimate);

// Form submission
document.getElementById('water-order-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = document.getElementById('submit-button');
    button.disabled = true;
    button.textContent = 'Submitting...';

    const location = document.getElementById('location').value;
    const waterAmount = parseFloat(document.getElementById('water-amount').value) || 0;
    const totalPrice = calculateEstimatedPrice(location, waterAmount);

    const formData = {
        full_name: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        location: location,
        water_amount: waterAmount,
        delivery_time: document.getElementById('delivery-time').value,
        estimated_price: totalPrice
    };

    // Client-side validation
    if (!formData.full_name || !/^[A-Za-z\s]+$/.test(formData.full_name.trim())) {
        alert('Please enter a valid full name (letters only).');
        button.disabled = false;
        button.textContent = 'Submit Request';
        return;
    }

    if (!/^(02\d{8}|030\d{7}|05\d{8})$/.test(formData.phone)) {
        alert('Please enter a valid 10-digit phone number');
        button.disabled = false;
        button.textContent = 'Submit Request';
        return;
    }

    if (!formData.location) {
        alert('Please select a location.');
        button.disabled = false;
        button.textContent = 'Submit Request';
        return;
    }

    if (!formData.delivery_time) {
        alert('Please select a delivery time.');
        button.disabled = false;
        button.textContent = 'Submit Request';
        return;
    }

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxALnuFm9_wu_xHMNbqq5AMS2aacWzM-pE0k4oOgG8THlD8UgPYWz-uVRcOfPCPEhw7Fw/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        alert('Order submitted successfully!');
        document.getElementById('water-order-form').reset();
        document.getElementById('price-estimate').textContent = 'GHS0.00';

    } catch (error) {
        console.error('Fetch error:', error);
        alert(`Error connecting to the server: ${error.message}. Please try again later.`);
    } finally {
        button.disabled = false;
        button.textContent = 'Submit Request';
    }
});
