
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
        document.querySelector('.upload-logo').style.backgroundSize = 'cover';
        document.querySelector('.upload-logo').style.backgroundPosition = 'center';
        document.querySelector('.upload-logo').style.backgroundRepeat = 'no-repeat';

        // Display image in business card preview
        const avatar = document.querySelector('.card-avatar');
        avatar.style.backgroundImage = `url('${uploadedImageUrl}')`;
        avatar.style.backgroundSize = 'cover';
        avatar.style.backgroundRepeat = 'no-repeat';
        avatar.style.backgroundPosition = 'center';
        avatar.style.backgroundSize = 'contain';
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
    document.getElementById('preview-phone').textContent = phoneNumber || '(+27) 123 4567 91';
    document.getElementById('preview-email').textContent = email || 'your.email@domain.com';
    document.getElementById('preview-website').textContent = site || 'https://yourwebsite.com';
}

// Add event listeners for real-time updates
document.addEventListener('DOMContentLoaded', function() {
    // Add input event listeners to all form fields
    const formInputs = ['name', 'title', 'website', 'phone', 'email'];
    
    formInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', generateCard);
        }
    });

    // Download button functionality
    document.querySelector('.download-button').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent form submission
        
        const previewCard = document.querySelector('.preview-card');
        
        // Use html2canvas to capture the preview card
        html2canvas(previewCard, { 
            scale: 2,
            backgroundColor: '#1a0033',
            useCORS: true
        }).then(canvas => {
            // Create download link for PNG
            const link = document.createElement('a');
            link.download = 'retro-business-card.png';
            link.href = canvas.toDataURL();
            link.click();
            
            // Also create PDF version
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [85.6, 53.98] // Standard business card size
            });
            
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98);
            pdf.save('retro-business-card.pdf');
        }).catch(error => {
            console.error('Error generating card:', error);
            alert('Error generating card. Please try again.');
        });
    });
    
    // Initial call to populate preview with default values
    generateCard();
});
