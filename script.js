       // Gallery data - replace with your actual image paths
        const galleryData = {
            "6people": [
                "./img/big/big1.JPG",
                "./img/big/big2.JPG",
                "./img/big/big3.JPG",
                "./img/big/big4.JPG",
                "./img/big/big5.JPG",
                "./img/big/big6.JPG",
                "./img/big/big7.JPG",
                "./img/big/big8.JPG",
                "./img/big/big9.JPG"
            ],
            "4people": [
                "./img/soso/soso1.JPG",
                "./img/soso/soso2.JPG",
                "./img/soso/soso3.JPG",
                "./img/soso/soso4.JPG",
                "./img/soso/soso5.JPG",
                "./img/soso/soso6.JPG",
            ],
            "2people": [
                "./img/smoal/smoal1.JPG",
                "./img/smoal/smoal2.JPG",
                "./img/smoal/smoal3.JPG",
                "./img/smoal/smoal4.JPG",
                "./img/smoal/smoal5.JPG"
            ]
        };

        // Gallery functionality
        document.querySelectorAll('.house-img').forEach(img => {
            img.addEventListener('click', function() {
                const houseType = this.getAttribute('data-house');
                const images = galleryData[houseType];
                
                // Clear previous slides
                document.getElementById('gallerySlides').innerHTML = '';
                document.getElementById('galleryDots').innerHTML = '';
                
                // Create slides
                images.forEach((image, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'gallery-slide';
                    if (index === 0) slide.classList.add('active');
                    
                    const imgElement = document.createElement('img');
                    imgElement.src = image;
                    imgElement.alt = `Photo ${index + 1}`;
                    
                    slide.appendChild(imgElement);
                    document.getElementById('gallerySlides').appendChild(slide);
                    
                    // Create dots
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    if (index === 0) dot.classList.add('active');
                    dot.setAttribute('data-index', index);
                    dot.addEventListener('click', () => goToSlide(index));
                    document.getElementById('galleryDots').appendChild(dot);
                });
                
                // Show gallery modal
                document.getElementById('galleryModal').style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Set current slide index
                currentSlide = 0;
            });
        });

        // Close gallery modal
        document.querySelector('.close-gallery').addEventListener('click', function() {
            document.getElementById('galleryModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close gallery when clicking outside
        document.getElementById('galleryModal').addEventListener('click', function(e) {
            if (e.target === this) {
                document.getElementById('galleryModal').style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Navigation between slides
        let currentSlide = 0;
        
        document.getElementById('prevSlide').addEventListener('click', function() {
            goToSlide(currentSlide - 1);
        });
        
        document.getElementById('nextSlide').addEventListener('click', function() {
            goToSlide(currentSlide + 1);
        });
        
        function goToSlide(index) {
            const slides = document.querySelectorAll('.gallery-slide');
            const dots = document.querySelectorAll('.dot');
            
            // Wrap around if at beginning or end
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;
            
            // Hide all slides and deactivate dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show selected slide and activate dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (document.getElementById('galleryModal').style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    goToSlide(currentSlide - 1);
                } else if (e.key === 'ArrowRight') {
                    goToSlide(currentSlide + 1);
                } else if (e.key === 'Escape') {
                    document.getElementById('galleryModal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Booking modal functionality
        const bookingModal = document.getElementById('bookingModal');
        const closeModalBtn = document.querySelector('.close-modal');
        const bookBtns = document.querySelectorAll('.book-btn');
        const modalHouseTitle = document.getElementById('modalHouseTitle');
        const formHouse = document.getElementById('formHouse');
        const formPrice = document.getElementById('formPrice');
        const bookingFormElement = document.getElementById('bookingFormElement');
        const successMessage = document.getElementById('successMessage');
        const closeSuccessBtn = document.getElementById('closeSuccess');
        const bookingFormDiv = document.getElementById('bookingForm');
        const cottageSelect = document.getElementById('cottage');


        bookBtns.forEach(button => {
            button.addEventListener('click', function() {
                const houseName = this.getAttribute('data-house');
                const housePrice = this.getAttribute('data-price');
                
                modalHouseTitle.textContent = houseName;
                formHouse.value = houseName;
                formPrice.value = housePrice;

                // Set the selected option in the dropdown
                Array.from(cottageSelect.options).forEach(option => {
                    if (option.value === houseName) {
                        option.selected = true;
                    }
                });

                bookingFormDiv.style.display = 'block'; // Show the form
                successMessage.style.display = 'none'; // Hide success message
                bookingModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        closeModalBtn.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        closeSuccessBtn.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Handle form submission with Formspree
        bookingFormElement.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                bookingFormDiv.style.display = 'none';
                successMessage.style.display = 'block';
                form.reset(); // Clear the form
            } else {
                alert('Виникла помилка під час відправлення заявки. Будь ласка, спробуйте ще раз.');
            }
        });

        // Sticky navigation
        const nav = document.getElementById('mainNav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav .nav-links a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.getElementById('navLinks').classList.remove('active'); // Close mobile menu if open

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - nav.offsetHeight, // Adjust for fixed header height
                        behavior: 'smooth'
                    });
                } else if (targetId === '') { // For "Головна" link pointing to '#'
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

