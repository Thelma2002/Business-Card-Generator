// Function to handle the image upload and display it
function upload() {
    // Select the file input element
    const fileUploadInput = document.getElementById('logo-upload');

    // Ensure a file is selected
    if (!fileUploadInput.files.length) {
        alert('Please select an image file!');
        return;
    }

    // Get the uploaded file
    const imageFile = fileUploadInput.files[0];

    // Validate file type (ensure it's an image)
    if (!imageFile.type.startsWith('image/')) {
        alert('Only image files are allowed!');
        return;
    }

    // Validate file size (max 10MB)
    if (imageFile.size > 10_000_000) {
        alert('Maximum upload size is 10MB!');
        return;
    }

    // Read the file and display the uploaded image
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);

    fileReader.onload = (event) => {
        const uploadedImageUrl = event.target.result;

        // Display image in upload section
        document.querySelector('.upload-logo').style.backgroundImage = `url('${uploadedImageUrl}')`;

        // Display image in business card preview
        const avatar = document.querySelector('.card-avatar');
        avatar.style.backgroundImage = `url('${uploadedImageUrl}')`;
        avatar.style.backgroundSize = 'contain'; // Ensure image fits within container
        avatar.style.backgroundRepeat = 'no-repeat';
        avatar.style.backgroundPosition = 'center';
        avatar.style.width = '80px';
        avatar.style.height = '80px';
        avatar.style.borderRadius = '10px'; // Optional rounded corners
    };
}

// Function to update the business card preview dynamically
function generateCard() {
    // Get user input values from form fields
    const firstName = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const site = document.getElementById('website').value;
    const phoneNumber = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Update the business card preview section with correct IDs
    document.getElementById('preview-name').textContent = firstName || 'PLAYER NAME';
    document.getElementById('preview-title').textContent = title || 'Game Developer';
    document.getElementById('preview-phone').textContent = phoneNumber || 'Phone Number';
    document.getElementById('preview-email').textContent = email ? ` ${email}` : ' Email';
    document.getElementById('preview-website').textContent = site ? ` ${site}` : ' Website';
}

// Ensure preview updates dynamically as the user types
document.querySelector('.download-button').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Capture business card as an image
    html2canvas(document.querySelector('.preview-card'), { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        // Add image to PDF with positioning
        pdf.addImage(imgData, 'PNG', 15, 40, 180, 80); 

        // Save the generated PDF
        pdf.save('business_card.pdf');
    });
});


