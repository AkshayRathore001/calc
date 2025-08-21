function calculateTotal() {
    const input = document.getElementById('timeInput').value;
    const rate = parseFloat(document.getElementById('rateInput').value) || 0;
    const times = input.split(',').map(t => t.trim()).filter(t => t !== '');

    let totalHours = 0;
    let totalMinutes = 0;

    for (let t of times) {
        if (t.includes(':')) {
            const [h, m] = t.split(':').map(Number);
            totalHours += h || 0;
            totalMinutes += m || 0;
        } else if (t.includes('.')) {
            const [h, m] = t.split('.').map(Number);
            totalHours += h || 0;
            totalMinutes += m || 0;
        } else {
            totalHours += parseInt(t) || 0;
        }
    }

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    const resultText = `Total: ${totalHours} hrs ${totalMinutes} min`;
    document.getElementById('totalHours').innerText = resultText;

    if (rate > 0) {
        const decimalHours = totalHours + (totalMinutes / 60);
        const totalAmount = (decimalHours * rate).toFixed(2);
        document.getElementById('totalCost').style.display = "block";
        document.getElementById('totalCost').innerText = `💰 Total Cost: ₹${totalAmount}`;
    } else {
        document.getElementById('totalCost').style.display = "none";
    }

    localStorage.setItem("tubewell_input", input);
    localStorage.setItem("tubewell_rate", rate);
    localStorage.setItem("tubewell_result", resultText);
    localStorage.setItem("tubewell_cost", document.getElementById('totalCost').innerText);
}

function resetCalculator() {
    document.getElementById('timeInput').value = "";
    document.getElementById('totalHours').innerText = "Total: 0 hrs 0 min";
    document.getElementById('totalCost').style.display = "none";

    localStorage.removeItem("tubewell_input");
    localStorage.removeItem("tubewell_result");
    localStorage.removeItem("tubewell_cost");
}

window.onload = function() {
    const savedInput = localStorage.getItem("tubewell_input");
    const savedRate = localStorage.getItem("tubewell_rate");
    const savedResult = localStorage.getItem("tubewell_result");
    const savedCost = localStorage.getItem("tubewell_cost");

    if (savedInput) document.getElementById('timeInput').value = savedInput;
    if (savedRate) document.getElementById('rateInput').value = savedRate;
    if (savedResult) document.getElementById('totalHours').innerText = savedResult;
    if (savedCost && savedRate > 0) {
        document.getElementById('totalCost').style.display = "block";
        document.getElementById('totalCost').innerText = savedCost;
    }
}
