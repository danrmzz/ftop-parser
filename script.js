// Get the file input element and the output area
const imgInput = document.getElementById("img-input");
const output = document.getElementById("output");

// Listen for changes (when the user uploads an image)
imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // get the uploaded file

    if (file) {
        // Clear the old output and show the loading gif
        output.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" class="loading">';
        output.classList.remove("hidden");

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

                // Image Preprocessing: Increase contrast and convert to black & white for better OCR
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    if (avg > 128) {
                        // Make the pixel white
                        data[i] = data[i + 1] = data[i + 2] = 255;
                    } else {
                        // Make the pixel black
                        data[i] = data[i + 1] = data[i + 2] = 0;
                    }
                }
                ctx.putImageData(imageData, 0, 0); // apply the changes back to the canvas

                // Now pass the preprocessed image to Tesseract for OCR
                Tesseract.recognize(canvas.toDataURL())
                .then(function(result) {
                    // Clean up the extracted text
                    const cleanedText = cleanOCRResult(result.text);
                    // If no text is detected, show an error message
                    if (cleanedText === "") {
                        output.innerHTML = "Error: No data detected in the image.";
                    } else {
                        // Display the cleaned-up text in the output section with proper HTML new lines
                        output.innerHTML = cleanedText.replace(/\n/g, '<br>'); // Display new lines in HTML
                    }
                })
                .catch(function(error) {
                    // Handle any errors that occur during OCR
                    output.innerHTML = "Error processing image";
                    console.error(error);
                });
            };
        };

        // Read the image file
        reader.readAsDataURL(file);
    }
});

// Function to clean the OCR result and only keep ranking, faction name, and value
function cleanOCRResult(text) {
    // Split text into lines
    const lines = text.split('\n');
    
    // Define a regex pattern
    const factionPattern = /#\d+\s+([a-zA-Z0-9]+)\s+-\s+\$?([0-9,.]+)/;

    let cleanedData = '';

    // Loop through each line
    lines.forEach(line => {
        const match = line.match(factionPattern);
        if (match) {
            // Extract the rank, name, and value
            const rank = match[0].split(' ')[0]; // #1, #2, etc.
            const name = match[1];               // faction name
            let value = match[2];                // faction value
            
            // Fix the dollar sign - replace only the first '5' that appears at the beginning of the value
            if (value.startsWith('5')) {
                value = '$' + value.slice(1);    // replace the first '5' with '$'
            }

            // Replace all periods with commas
            value = value.replace(/\./g, ',');   // replace periods with commas

            // Append the cleaned up line to the final result
            cleanedData += `${rank} ${name} - ${value}\n`;
        }
    });

    return cleanedData;
}
