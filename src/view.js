jQuery(document).ready(function ($) {
	// Loop through each flipbook container on the page
	$('[id^="flipbook-container-"]').each(function() {
		// Get the PDF URL and block ID from the current container
		var pdfUrl = $(this).data('pdf-url');
		var blockId = $(this).attr('id');

		// Define flipbook options
		var options = {
			scrollWheel: false,
			soundEnable: false,
			backgroundColor: 'transparent',
			// Add any additional flipbook options here
		};
		
		// Check if the PDF URL is available before initializing the flipbook
		if (pdfUrl) {
			// Initialize the flipbook for this specific container
			$(`#${blockId}`).flipBook(pdfUrl, options);
		}
	});
});