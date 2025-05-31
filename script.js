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
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', function() {
                const house = this.getAttribute('data-house');
                const price = this.getAttribute('data-price');
                
                document.getElementById('modalHouseTitle').textContent = house;
                document.getElementById('formHouse').value = house;
                document.getElementById('formPrice').value = price;
                
                document.getElementById('bookingModal').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close booking modal
        document.querySelector('.close-modal').addEventListener('click', function() {
            document.getElementById('bookingModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close booking modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('bookingModal')) {
                document.getElementById('bookingModal').style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Form submission
        document.getElementById('bookingFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    document.getElementById('bookingForm').style.display = 'none';
                    document.getElementById('successMessage').style.display = 'block';
                    
                    // Reset form
                    form.reset();
                } else {
                    throw new Error('Помилка при відправленні форми');
                }
            })
            .catch(error => {
                alert('Сталася помилка при відправленні форми. Будь ласка, спробуйте ще раз або зателефонуйте нам.');
                console.error(error);
            });
        });
        
        // Close success message
        document.getElementById('closeSuccess').addEventListener('click', function() {
            document.getElementById('bookingModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            document.getElementById('bookingForm').style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
        });
        
        // Set minimum date for booking (today)
        document.getElementById('date').min = new Date().toISOString().split('T')[0];