import "./slider.css";

const slider = {
  slides: [
    {
      imageUrl: "../slider-images/faster-delivery.jpeg",
      title: "Enjoy Faster Delivery",
      description:
        "We offer express delivery options to ensure your order arrives within 24 hours!",
    },
    {
      imageUrl: "../slider-images/best-deals.jpg",
      title: "Exclusive Discounts & Offers",
      description:
        "Grab the best deals with huge discounts and limited-time offers every day.",
    },
    {
      imageUrl: "../slider-images/premium-quality.jpg",
      title: "Shop Premium Quality Products",
      description:
        "We source only high-quality products to give you the best shopping experience.",
    },
    {
      imageUrl: "../slider-images/customer-support.jpeg",
      title: "24/7 Customer Support",
      description:
        "Got questions? Our dedicated support team is here to assist you anytime, anywhere.",
    },
  ],

  currentIndex: 0,
  intervalId: null,

  showSlide(index) {
    const slideContainer = document.querySelector(".slide-wrapper");
    if (!slideContainer) return;

    const { imageUrl, title, description } = this.slides[index];

    slideContainer.innerHTML = `
      <div class="slide " style="background-image: url('${imageUrl}')">
        <div class="left-raw container">
          <h2>${title}</h2>
          <p>${description}</p>
          <a class="go-to-shop-btn" href="#/shop">Go to shop</a>
        </div>
        
      </div>

    `;

    this.updateActiveDot();
  },

  startSlider() {
    this.showSlide(this.currentIndex);
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  },

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(this.currentIndex);
  },

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentIndex);
  },

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
      });
    });

    document.querySelector(".slide-previous")?.addEventListener("click", () => {
      this.prevSlide();
    });

    document.querySelector(".slide-next")?.addEventListener("click", () => {
      this.nextSlide();
    });

    this.startSlider();
  },

  updateActiveDot() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  },

  render() {
    return `
      <div class="slider-container">
        <div class="slide-wrapper"></div>
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
