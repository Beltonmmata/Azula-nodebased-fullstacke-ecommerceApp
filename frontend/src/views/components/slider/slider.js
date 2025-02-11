import "./slider.css";

const slider = {
  render() {
    // Array of slide objects
    const slides = [
      {
        imageUrl: "../products-images/jacket-1.png",
        title: "Slide 1 title",
        description: "This is the first slide.",
      },
      {
        imageUrl: "../products-images/slide-3.png",
        title: "Slide 2 title",
        description: "This is the second slide.",
      },
      {
        imageUrl: "../products-images/slide-1.png",
        title: "Slide 3 title",
        description: "This is the t hird slide.",
      },
      {
        imageUrl: "../products-images/slide-2.png",
        title: "Slide 4 title",
        description: "This is the fourth slide.",
      },
    ];

    let currentIndex = 0;

    // Function to display a slide
    function showSlide(index) {
      const slider = document.querySelector(".slide");
      if (slider) {
        slider.innerHTML = `
        
          <div class="left-raw">
            <h2>${slides[index].title}</h2>
            <p>${slides[index].description}</p>
            <button class="go-to-shop-btn">Go To Shop</button>
          </div>
          <div class="right-raw">
            <img src="${slides[index].imageUrl}" alt="${slides[index].title} image" />
          </div>
        
      `;
      }
    }

    // Function to go to the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    // Function to go to the previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    // Auto slide
    function startSlider() {
      showSlide(currentIndex);
      setInterval(nextSlide, 5000);
    }

    // Attach event listeners after  rendering
    document.addEventListener("DOMContentLoaded", () => {
      startSlider();

      document
        .querySelector(".slide-previous")
        ?.addEventListener("click", prevSlide);
      document
        .querySelector(".slide-next")
        ?.addEventListener("click", nextSlide);
    });

    return `
  <!-- Slider Container -->
  <div class="section-container">
    <div class="slider-container container">
     <div class="slide"></div>
     <div class="slide-previous">
       <ion-icon name="chevron-back-outline"></ion-icon>
     </div>
     <div class="slide-next">
       <ion-icon name="chevron-forward-outline"></ion-icon>
     </div>
    </div>
    
  </div>`;
  },
};

export default slider;
