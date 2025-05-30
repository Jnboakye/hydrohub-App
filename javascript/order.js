// Pricing logic (placeholder - adjust to match your backend)
const pricing = {
    dansoman: { deliveryFee: 10, pricePerLitre: 0.05 },
    eastlegon: { deliveryFee: 20, pricePerLitre: 0.06 },
    spintex: { deliveryFee: 30, pricePerLitre: 0.07 },
    weija: { deliveryFee: 15, pricePerLitre: 0.05 },
    kasoa: { deliveryFee: 30, pricePerLitre: 0.06 },
    awoshie: { deliveryFee: 12, pricePerLitre: 0.05 },
    kaneshie: { deliveryFee: 14, pricePerLitre: 0.05 },
    osu: { deliveryFee: 8, pricePerLitre: 0.045 },
    ablekuma: { deliveryFee: 16, pricePerLitre: 0.052 },
    teshie: { deliveryFee: 18, pricePerLitre: 0.055 },
    lapaz: { deliveryFee: 15, pricePerLitre: 0.05 },
    achimota: { deliveryFee: 14, pricePerLitre: 0.052 },
    nungua: { deliveryFee: 17, pricePerLitre: 0.055 },
    latebiokoshie: { deliveryFee: 13, pricePerLitre: 0.05 },
    burmacamp: { deliveryFee: 18, pricePerLitre: 0.055 },
    sowutoum: { deliveryFee: 15, pricePerLitre: 0.05 },
    oyarifa: { deliveryFee: 22, pricePerLitre: 0.06 },
    danfa: { deliveryFee: 24, pricePerLitre: 0.06 },
    oyibi: { deliveryFee: 26, pricePerLitre: 0.06 },
    madina: { deliveryFee: 18, pricePerLitre: 0.055 },
    lakeside: { deliveryFee: 20, pricePerLitre: 0.057 },
    teiman: { deliveryFee: 21, pricePerLitre: 0.058 },
    abokobi: { deliveryFee: 22, pricePerLitre: 0.058 },
    old_ashongman: { deliveryFee: 18, pricePerLitre: 0.055 },
    new_ashongman: { deliveryFee: 19, pricePerLitre: 0.055 },
    kwashieman: { deliveryFee: 14, pricePerLitre: 0.05 },
    airport_residential: { deliveryFee: 10, pricePerLitre: 0.045 },
    roman_ridge: { deliveryFee: 10, pricePerLitre: 0.045 },
    dzorwulu: { deliveryFee: 11, pricePerLitre: 0.048 },
    abelemkpe: { deliveryFee: 11, pricePerLitre: 0.048 },
    adjiringanor: { deliveryFee: 20, pricePerLitre: 0.06 },
    ashaley_botwe: { deliveryFee: 22, pricePerLitre: 0.06 },
    tesano: { deliveryFee: 13, pricePerLitre: 0.05 },
    abeka: { deliveryFee: 13, pricePerLitre: 0.05 },
    odokor: { deliveryFee: 12, pricePerLitre: 0.05 },
    nima: { deliveryFee: 10, pricePerLitre: 0.045 },
    darkuman: { deliveryFee: 14, pricePerLitre: 0.05 }
};

// Update price estimate dynamically
function updatePriceEstimate() {
    const location = document.getElementById('location').value;
    const waterAmount = parseFloat(document.getElementById('water-amount').value) || 0;
    if (location && waterAmount) {
        const { deliveryFee, pricePerLitre } = pricing[location];
        const totalPrice = (waterAmount * pricePerLitre + deliveryFee).toFixed(2);
        document.getElementById('price-estimate').textContent = `GHS${totalPrice}`;
    } else {
        document.getElementById('price-estimate').textContent = 'GHS0.00';
    }
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

    const formData = {
        full_name: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        water_amount: parseFloat(document.getElementById('water-amount').value),
        delivery_time: document.getElementById('delivery-time').value,
        estimated_price: document.getElementById('price-estimate').textContent.replace("GHS", "").trim()
    };

    // Client-side validation
    if (!formData.full_name || !/^[A-Za-z\s]+$/.test(formData.full_name.trim())) {
        alert('Please enter a valid full name (letters only).');
        button.disabled = false;
        button.textContent = 'Submit Request';
        return;
    }

    if (
        !/^(02\d{8}|030\d{7}|05\d{8})$/.test(formData.phone)
    ) {
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
            // mode: 'no-cors', // Required for Google Apps Script Web App if not published as "Anyone"
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        // Since no-cors mode doesn't return a readable response, assume success
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
