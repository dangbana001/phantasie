// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Toggle for Mobile ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burgerMenu.classList.toggle('toggle'); // For burger animation
    });

    // Close nav when a link is clicked (for mobile)
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // 10% of section visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger CSS animations when visible
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add CSS for `animate-in` to trigger animations
    // (This part would be in your style.css, but for clarity, here's the concept)
    /*
    .animate-in h2 { animation: fadeInUp 1s ease-out forwards; }
    .animate-in .gallery-item { animation: fadeIn 0.8s ease-out forwards; animation-delay: var(--animation-delay); }
    */

    // --- Firebase Booking Form Submission ---
    const bookingForm = document.getElementById('bookingForm');
    const bookingMessage = document.getElementById('bookingMessage');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const clientName = document.getElementById('clientName').value;
            const clientEmail = document.getElementById('clientEmail').value;
            const clientPhone = document.getElementById('clientPhone').value;
            const serviceType = document.getElementById('serviceType').value;
            const preferredDateTime = document.getElementById('preferredDateTime').value;
            const clientMessage = document.getElementById('clientMessage').value;

            // Basic validation (more robust validation can be added)
            if (!clientName || !clientEmail || !serviceType || !preferredDateTime) {
                bookingMessage.textContent = 'Please fill in all required fields.';
                bookingMessage.className = 'error';
                bookingMessage.classList.remove('hidden');
                return;
            }

            try {
                // Add a new document to the 'bookings' collection in Firestore
                await db.collection('bookings').add({
                    name: clientName,
                    email: clientEmail,
                    phone: clientPhone,
                    service: serviceType,
                    dateTime: new Date(preferredDateTime), // Store as Firestore Timestamp
                    message: clientMessage,
                    status: 'pending', // Initial status
                    submittedAt: firebase.firestore.FieldValue.serverTimestamp() // Timestamp from Firebase server
                });

                bookingMessage.textContent = 'Booking submitted successfully! We will contact you shortly.';
                bookingMessage.className = 'success';
                bookingMessage.classList.remove('hidden');
                bookingForm.reset(); // Clear the form

            } catch (error) {
                console.error("Error adding document: ", error);
                bookingMessage.textContent = 'There was an error submitting your booking. Please try again.';
                bookingMessage.className = 'error';
                bookingMessage.classList.remove('hidden');
            }
        });
    }

    // --- Gallery Lightbox (Optional, but highly recommended) ---
    // This is a placeholder. You would integrate a library like SimpleLightbox, Fancybox, etc.
    // Or build a custom one:
    /*
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Logic to open a modal/lightbox with the clicked image
            console.log('Image clicked:', item.src);
        });
    });
    */
});