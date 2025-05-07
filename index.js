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
        document.getElementById('logo-preview').style.backgroundImage = `url('${uploadedImageUrl}')`;
    };
}

// Function to update the business card preview dynamically
function generateCard() {
    // Get user input values from form fields
    const companyName = document.getElementById('input-company').value;
    const title = document.getElementById('input-title').value;
    const userName = document.getElementById('input-name').value;
    const contact = document.getElementById('input-contact').value;
    const email = document.getElementById('input-email').value;

    // Update the business card preview section
    document.getElementById('preview-name').textContent = companyName || 'Company Name';
    document.getElementById('preview-title').textContent = title || 'Title';
    document.getElementById('preview-user-name').textContent = userName || 'Your Name';
    document.getElementById('preview-contact').textContent = contact ? `📞 ${contact}` : '📞 Contact Number';
    document.getElementById('preview-email').textContent = email ? `✉️ ${email}` : '✉️ Email';
}

// Function to allow users to download the business card as an image
document.getElementById('download-btn').addEventListener('click', function () {
    const card = document.getElementById('business-card');

    // Capture business card using html2canvas
    html2canvas(card).then(canvas => {
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.download = 'business_card.png'; // File name
        downloadLink.href = canvas.toDataURL(); // Convert to image URL
        downloadLink.click(); // Trigger download
    });
});