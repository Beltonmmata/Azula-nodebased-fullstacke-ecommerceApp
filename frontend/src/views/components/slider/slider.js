import "./slider.css";

const slider = {
  // Array of slides
  slides: [
    {
      imageUrl: "../slider-images/faster-delivery.png",
      title: "Enjoy Faster Delivery",
      description:
        "We offer express delivery options to ensure your order arrives within 24 hours!",
    },
    {
      imageUrl: "../slider-images/best-deals.png",
      title: "Exclusive Discounts & Offers",
      description:
        "Grab the best deals with huge discounts and limited-time offers every day.",
    },
    {
      imageUrl: "../slider-images/premium-quality.png",
      title: "Shop Premium Quality Products",
      description:
        "We source only high-quality products to give you the best shopping experience.",
    },
    {
      imageUrl: "../slider-images/customer-support.png",
      title: "24/7 Customer Support",
      description:
        "Got questions? Our dedicated support team is here to assist you anytime, anywhere.",
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
           <a class="go-to-shop-btn" href="#/shop">Go to shop</a>
          
        </div>
        <div class="right-raw">
          <img src="${imageUrl}" alt="${title} image" />
        </div>
      `;
    }
    this.updateActiveDot();
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
    const dotsContainer = document.querySelector(".slider-dots");
    dotsContainer.innerHTML = this.slides
      .map((_, index) => `<span class="dot" data-index="${index}"></span>`)
      .join("");

    this.updateActiveDot();

    document.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        this.currentIndex = parseInt(e.target.dataset.index);
        this.showSlide(this.currentIndex);
        this.updateActiveDot();
      });
    });

    document.querySelector(".slide-previous")?.addEventListener("click", () => {
      this.prevSlide();
      this.updateActiveDot();
    });

    document.querySelector(".slide-next")?.addEventListener("click", () => {
      this.nextSlide();
      this.updateActiveDot();
    });

    this.startSlider();
  },

  updateActiveDot() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  },

  // Render the slider component
  render() {
    return `
      
        <div class="slider-container">
          <div class="slide"></div>
          <div class="slider-dots"></div>
          <div class="slide-previous">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </div>
          <div class="slide-next">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
      
    `;
  },
};

export default slider;
