
const apiUrl = "http://localhost:8000/v1/completions"; // Adjust if your Gemma server is running elsewhere.

document.getElementById('submit-button').addEventListener('click', async () => {
    const inputText = document.getElementById('input-text').value;

    if (!inputText) {
        alert("Please enter a query.");
        return;
    }

    document.getElementById('output-area').classList.add('loading'); // Show loading indicator
    document.getElementById('output-area').innerHTML = "Processing...";

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Include your API key in the header
            },
            body: JSON.stringify({
                model: "gemma-3",  // Specify the model name
                prompt: inputText,
                max_tokens: 150,   // Adjust as needed - controls output length
                temperature: 0.7    // Controls randomness (higher = more creative)
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].text; // Adjust based on the API's response format

        document.getElementById('output-area').classList.remove('loading'); // Hide loading indicator
        document.getElementById('output-area').innerHTML = aiResponse;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('output-area').classList.remove('loading');
        document.getElementById('output-area').innerHTML = "An error occurred: " + error.message; // Display the error to the user
    }
});
