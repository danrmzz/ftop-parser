// Get the file input element and the output area
const imgInput = document.getElementById("img-input");
const output = document.getElementById("output");

// Function to clean up and extract relevant leaderboard entries
function cleanExtractedText(text) {
    // Regular expression to match the leaderboard pattern (#Rank FactionName - Value)
    const leaderboardPattern = /#\d+\s+[a-zA-Z]+[\w\s]*\s*-\s*\$[\d,]+/g;

    // Match all the leaderboard entries based on the pattern
    const matches = text.match(leaderboardPattern);

    // If we have matches, return the cleaned up text, otherwise return a message
    return matches ? matches.join("\n") : "No leaderboard data found.";
}

// Listen for changes (when the user uploads an image)
imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // get the uploaded file

    if (file) {
        const reader = new FileReader(); // create a file reader to read the image

        // When the file is loaded, this function is called
        reader.onload = function (e) {
            const img = new Image(); // create a new image object
            img.src = e.target.result; // set the source to the uploaded image

            // When the image loads, process it
            img.onload = function () {
                // Create a canvas element to preprocess the image
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Set canvas size to the image size
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the image on the canvas
                ctx.drawImage(img, 0, 0);

                // Convert the image to grayscale
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;      // Red channel
                    data[i + 1] = avg;  // Green channel          
                    data[i + 2] = avg;  // Blue channel
                }
                ctx.putImageData(imageData, 0, 0); // put the grayscale data back

                // Now pass the preprocessed image to Tesseract for OCR
                Tesseract.recognize(canvas.toDataURL())
                .then(function(result) {
                    // Clean and extract only the leaderboard data
                    const cleanedText = cleanExtractedText(result.text);
                    
                    // Display the extracted text in the output section
                    output.textContent = result.text;
                })
                .catch(function(error) {
                    // Handle any errors that occur during OCR
                    output.textContent = "Error processing image";
                    console.error(error);
                });
            };
        };

        // Read the image file
        reader.readAsDataURL(file);
    }
});

