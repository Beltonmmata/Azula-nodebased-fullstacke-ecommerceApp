import "./slider.css";

const slider = {
  // Array of slides
  slides: [
    {
      imageUrl: "../slider-images/faster-delivery.png",
      title: "Enjoy Faster Delivery",
      description:
        "We have the express delivery option that will ensure order delivered in 24hrs",
    },
    {
      imageUrl: "../products-images/slide-3.png",
      title: "Slide 2 title",
      description: "This is the second slide.",
    },
    {
      imageUrl: "../products-images/slide-1.png",
      title: "Slide 3 title",
      description: "This is the third slide.",
    },
    {
      imageUrl: "../products-images/slide-2.png",
      title: "Slide 4 title",
      description: "This is the fourth slide.",
    },
  ],

  currentIndex: 0, // Track the current slide index
  intervalId: null, // Store the interval ID for auto-sliding

  // Function to display a slide
  showSlide(index) {
    const slideContainer = document.querySelector(".slide");
    if (slideContainer) {
      const { imageUrl, title, description } = this.slides[index];
      slideContainer.innerHTML = `
        <div class="left-raw">
          <h2>${title}</h2>
          <p>${description}</p>
          <button class="go-to-shop-btn">Go To Shop</button>
        </div>
        <div class="right-raw">
          <img src="${imageUrl}" alt="${title} image" />
        </div>
      `;
    }
  },

  // Function to start auto-sliding
  startSlider() {
    this.showSlide(this.currentIndex);
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  },

  // Function to go to the next slide
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(this.currentIndex);
  },

  // Function to go to the previous slide
  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentIndex);
  },

  // Attach event listeners after rendering
  afterRender() {
    document
      .querySelector(".slide-previous")
      ?.addEventListener("click", () => this.prevSlide());
    document
      .querySelector(".slide-next")
      ?.addEventListener("click", () => this.nextSlide());

    this.startSlider(); // Start auto-sliding after rendering
  },

  // Render the slider component
  render() {
    return `
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
      </div>
    `;
  },
};

export default slider;
