document.getElementById("student-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const walletAddress = document.getElementById("wallet-address").value.trim();

    // Validate the input
    if (!name || !walletAddress) {
        alert("Please provide both a name and a wallet address.");
        return;
    }

    // Submit the data to the serverless function
    try {
        const response = await fetch("/.netlify/functions/submit-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, walletAddress }),
        });

        if (response.ok) {
            alert("Data submitted successfully!");
            document.getElementById("student-form").reset();
        } else {
            alert("An error occurred. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    }
});
