// Get the file input element and the output area
const imgInput = document.getElementById("img-input");
const output = document.getElementById("output");

// Listen for changes (when the user uploads an image)
imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // get the uploaded file

    if (file) {
        const reader = new FileReader(); // create a file reader to read the image

        // When the file is loaded, this function is called
        reader.onload = function (e) {
            const img = new Image(); // create a new image object
            img.src = e.target.result; // set the source to the uploaded image


            // Use Tesseract.js to perform OCR on the uploaded image
            Tesseract.recognize(img.src)
                .then(function(result) {
                    // Display the extracted text in the output section
                    output.textContent = result.text;
                })
                .catch(function(error) {
                    // Handle any errors that occur during OCR
                    output.textContent = "Error processing image";
                    console.error(error);
                });
        };

        // Read the image file
        reader.readAsDataURL(file);
    }
});

