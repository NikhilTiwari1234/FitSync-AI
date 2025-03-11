async function fetchRecommendations() {
    try {
        let response = await fetch("http://127.0.0.1:5000/recommend"); // Fetch API data
        let data = await response.json();

        if (data.error) {
            document.getElementById("output").innerHTML = <p>Error: ${data.error}</p>;
            return;
        }

        let outputHtml = `
            <h3>Personalized Fitness Plan</h3>
            <p><strong>Calories Needed:</strong> ${data.calories_needed.toFixed(2)}</p>
            <h4>Recommended Workout:</h4>
            <ul>
                ${data.recommended_workout.map(workout => <li>${workout}</li>).join("")}
            </ul>
        `;

        document.getElementById("output").innerHTML = outputHtml;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
    }
}

// Call function when page loads
window.onload = fetchRecommendations;