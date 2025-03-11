async function saveUserData(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let goal = document.getElementById("goal").value;

    // Send data to Flask backend
    let response = await fetch("http://127.0.0.1:5000/save_user_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, height, age, gender, goal })
    });

    let result = await response.json();
    if (result.success) {
        fetchRecommendations(); // Fetch recommendations after saving data
    } else {
        alert("Failed to save user data: " + result.error);
    }
}

async function fetchRecommendations() {
    try {
        let response = await fetch("http://127.0.0.1:5000/recommend");
        let data = await response.json();

        if (data.error) {
            document.getElementById("output").innerHTML = <p style="color:red;">Error: ${data.error}</p>;
            return;
        }

        let outputHtml = `
            <h3>🔹 Personalized Fitness Plan</h3>
            <p><strong>🔥 Calories Needed:</strong> ${data.calories_needed.toFixed(2)}</p>
            <h4>🏋 Recommended Workout:</h4>
            <ul>
                ${data.recommended_workout.map(workout => <li>${workout}</li>).join("")}
            </ul>
        `;

        document.getElementById("output").innerHTML = outputHtml;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        document.getElementById("output").innerHTML = <p style="color:red;">Failed to fetch data. Check API connection.</p>;
    }
}

// Attach event listener to form submission
document.getElementById("fitnessForm").addEventListener("submit", saveUserData);