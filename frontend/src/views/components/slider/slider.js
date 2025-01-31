import "./slider.css";

const renderSlider = () => {
  // Array of slide objects
  const slides = [
    {
      imageUrl: "../products-images/jacket-1.png",
      title: "Slide 1 title",
      description: "This is the first slide.",
    },
    {
      imageUrl: "../products-images/jacket-2.png",
      title: "Slide 2 title",
      description: "This is the second slide.",
    },
    {
      imageUrl: "../products-images/jacket-3.png",
      title: "Slide 3 title",
      description: "This is the third slide.",
    },
    {
      imageUrl: "../products-images/slider-4.jpg", // Fixed path
      title: "Slide 4 title",
      description: "This is the fourth slide.",
    },
  ];

  let currentIndex = 0;

  // Function to display a slide
  function showSlide(index) {
    const slider = document.querySelector(".slider-container");
    if (slider) {
      slider.innerHTML = `
        <div class="slide">
          <div class="left-raw">
            <h2>${slides[index].title}</h2>
            <p>${slides[index].description}</p>
            <button class="go-to-shop-btn">Go To Shop</button>
          </div>
          <div class="right-raw">
            <img src="${slides[index].imageUrl}" alt="${slides[index].title} image" />
          </div>
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

  // Attach event listeners after rendering
  document.addEventListener("DOMContentLoaded", () => {
    startSlider();

    document
      .querySelector(".slide-previous")
      ?.addEventListener("click", prevSlide);
    document.querySelector(".slide-next")?.addEventListener("click", nextSlide);
  });

  return `
  <!-- Slider Container -->
  <div class="section-container">
    <div class="slider-container container"></div>

    <div class="slide-previous">
      <ion-icon name="chevron-back-outline"></ion-icon>
    </div>
    <div class="slide-next">
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </div>
  </div>`;
};

export default renderSlider;
