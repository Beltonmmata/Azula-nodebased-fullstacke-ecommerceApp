import { hideLoading, showLoading } from "../../../controllers/loading";
import backendUrl from "../../../models/backendUrl";
import footer from "../../components/footer/footer";
import mainHeader from "../../components/main-header/mainHeader";

import "./contactUs.css";
import axios from "axios";

const contactUs = {
  render() {
    const faqs = [
      {
        question: "What sizes are available for your clothing?",
        answer:
          "We offer sizes ranging from XS to 3XL for most products. Size availability is listed on each product page.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery within Kenya typically takes 1–3 business days depending on your location. We also offer express options.",
      },
      {
        question: "Can I return or exchange an item?",
        answer:
          "Yes, you can return or exchange unused items within 7 days of delivery. Visit our Returns & Exchanges page for details.",
      },
      {
        question: "Do you deliver outside Kenya?",
        answer:
          "Currently, we only deliver within Kenya. We're working on expanding to more countries soon.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept M-PESA, Airtel Money, Visa, Mastercard, and PayPal for secure transactions.",
      },
      {
        question: "How do I track my order?",
        answer:
          "After placing your order, you’ll receive a tracking link via SMS and email to monitor delivery progress.",
      },
      {
        question: "Are your products locally made?",
        answer:
          "Yes! We partner with local designers and manufacturers to offer quality, locally made clothing.",
      },
    ];

    return `
    <header>
       ${mainHeader.render()} 
    </header>
    <main>
      <section class="container">
        <!-- Contact Section -->
        <div class="contact-container">
          <div class="section-header">
            <h2 class="section-subtitle get-in-touch-subtitle">Get in touch with us</h2>
          </div>

          <div class="content-container">
            <!-- Left Column -->
            <div class="left">
              <p>
                Got a question, need help with an order, or want to give feedback? We're here for you.
                Whether it's about sizing, delivery, returns, or styling tips—don't hesitate to reach out.
              </p>
              <p><ion-icon name="mail-outline"></ion-icon> <strong>Email us:</strong> beltonmmata@gmail.com</p>
              <p><ion-icon name="call-outline"></ion-icon> <strong>Call us:</strong> +254708152289</p>
              <p><ion-icon name="location-outline"></ion-icon> <strong>Located At:</strong> Nairobi, Kenya</p>
            </div>

            <!-- Right Column (Form) -->
            <form class="contact-form" id="contactForm">
              <input type="text" name="fullName" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="text" name="subject" placeholder="Subject" required />
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Send</button>
              <p id="contactMsg" class="contact-message"></p>
            </form>
          </div>
        </div>

        <!-- FAQs Section -->
        <div class="faqs-container">
          <div class="section-header">
            <h2 class="section-subtitle faqs-subtitle">FAQs</h2>
          </div>
          <ul class="question-answers-ul">
            ${faqs
              .map(
                (faq, index) => `
                <li>
                  <div class="question">
                    ${faq.question}
                    <button class="show-faq-answer" data-faq-answer-index="${index}">
                      <ion-icon name="chevron-down-outline"></ion-icon>
                    </button>
                  </div>
                  <div class="answer faq-answer" id="faq-answer-index-${index}">
                    ${faq.answer}
                  </div>
                </li>
              `
              )
              .join("")}
          </ul>
        </div>
      </section>
      <main>
      <footer>
      ${footer.render()}
   </footer>
    `;
  },

  afterRender() {
    mainHeader.afterRender();
    // FAQ Toggle
    document.querySelectorAll(".show-faq-answer").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.currentTarget.dataset.faqAnswerIndex;
        const answer = document.getElementById(`faq-answer-index-${index}`);
        const icon = button.querySelector("ion-icon");

        answer.classList.toggle("answer-active");
        icon.name = answer.classList.contains("answer-active")
          ? "chevron-up-outline"
          : "chevron-down-outline";
      });
    });

    // Contact Form Submit
    const form = document.getElementById("contactForm");
    const messageBox = document.getElementById("contactMsg");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        showLoading();
        messageBox.textContent = "";
        messageBox.className = "contact-message";

        const res = await axios.post(`${backendUrl}/contact`, data);
        hideLoading();

        if (res.data.success) {
          messageBox.textContent = res.data.message;
          messageBox.classList.add("success");
          form.reset();
        } else {
          messageBox.textContent = res.data.message || "Something went wrong.";
          messageBox.classList.add("error");
        }
      } catch (err) {
        hideLoading();
        messageBox.textContent = "Something went wrong. Please try again.";
        messageBox.classList.add("error");
      }

      setTimeout(() => {
        messageBox.textContent = "";
        messageBox.className = "contact-message";
      }, 20000);
    });
  },
};

export default contactUs;
