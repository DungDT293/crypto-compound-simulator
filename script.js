
document.getElementById("simulation-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let capital = parseFloat(document.getElementById("initialCapital").value);
    const days = parseInt(document.getElementById("days").value);
    const tradesPerDay = parseInt(document.getElementById("tradesPerDay").value);
    const winsPerDay = parseInt(document.getElementById("winsPerDay").value);
    const profitPercent = parseFloat(document.getElementById("profitPercent").value) / 100;
    const lossPercent = parseFloat(document.getElementById("lossPercent").value) / 100;
    const data = [];

    for (let i = 0; i < days; i++) {
        for (let j = 0; j < winsPerDay; j++) {
            capital += capital * profitPercent;
        }
        for (let j = 0; j < tradesPerDay - winsPerDay; j++) {
            capital -= capital * lossPercent;
        }
        data.push(capital.toFixed(2));
    }

    // Vẽ biểu đồ bằng Chart.js
    const ctx = document.getElementById('capitalChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...Array(days).keys()].map(i => "Ngày " + (i+1)),
            datasets: [{
                label: 'Vốn ($)',
                data: data,
                borderColor: 'green',
                fill: false
            }]
        }
    });
});
