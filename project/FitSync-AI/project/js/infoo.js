document.getElementById('questionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get all the answers
    const answers = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        hobby: document.getElementById('hobby').value,
        color: document.getElementById('color').value,
        food: document.getElementById('food').value
    };

    // Convert answers to string
    const answersText = Object.entries(answers)
        .map(([question, answer]) => `${question}: ${answer}`)
        .join('\n');

    // Create a blob with the answers
    const blob = new Blob([answersText], { type: 'text/plain' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questionnaire-answers.txt';

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Optional: Reset the form
    this.reset();
});
