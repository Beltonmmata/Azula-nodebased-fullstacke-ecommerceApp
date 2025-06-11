import "./contactUs.css";

const contactUs = {
  render() {
    const faqs = [
      {
        question: "What's included in the subscription?",
        answer:
          "With a subscription, you'll get unlimited access to all current and future courses, allowing you to learn at your own pace—as long as your subscription is active.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel anytime through your account settings. You'll still have access to the courses until the end of your billing cycle.",
      },
      {
        question: "Is there a money-back guarantee?",
        answer:
          "Yes, we offer a 30-day money-back guarantee on all subscriptions. If you're not satisfied, you can request a full refund.",
      },
      {
        question:
          "What's the difference between subscribing and buying a course?",
        answer:
          "With a subscription, you get access to all courses as long as it's active. Buying a course gives you lifetime access to that specific course without recurring payments.",
      },
      {
        question: "Do I receive certificates for completed courses?",
        answer:
          "Yes, you'll receive a certificate of completion for each course you finish, perfect for showcasing your new skills.",
      },
      {
        question: "How often are new courses added?",
        answer:
          "New courses are added regularly to keep up with industry trends. Subscribers get instant access to all new content as it's released.",
      },
      {
        question: "Is this suitable for beginners?",
        answer:
          "Yes! Whether you're just starting out or looking to deepen your knowledge, the courses are designed to guide you every step of the way.",
      },
    ];

    return `
     <section class="container">
        <!-- FAQs starts-->

        <div class="faqs-container">
          <div class="section-header">
            <h2 class="section-subtitle">FAQs</h2>
          </div>
          <div class="question-answers">
            <ul class="question-answers-ul">
            ${faqs
              .map((faq, index) => {
                return `
                 <li>
                <div class="question">
                  ${faq.question}
                  <button class="show-faq-answer" data-faq-answer-index-${index}>D</button>
                </div>
                <div class="answer" data-faq-answer-index-${index} >
                 ${faq.answer}
                </div>
              </li>
                `;
              })
              .join(" ")}
             
            </ul>
          </div>
        </div>

        <!-- FAQs end -->
        <!-- contact-section starts -->

        <div class="contact-container">
          <div class="section-header">
            <h2 class="section-subtitle">get intouch with us</h2>
          </div>

          <div class="content-container">
            <!-- Left Side (Contact Details) -->
            <div class="left">
              <p>
                <ion-icon name="globe-outline"></ion-icon>

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut,
                repellendus, amet iste similique hic eius doloribus vero
                aspernatur totam expedita tempora eligendi ex nemo veniam esse
                omnis a accusantium asperiores?
              </p>
              <p>
                <ion-icon name="mail-outline"></ion-icon>
                <strong>Email:</strong>
                beltonmmata@gmail.com
              </p>
              <p>
                <ion-icon name="call-outline"></ion-icon>
                <strong>Phone:</strong> +1234567890
              </p>
              <p>
                <ion-icon name="location-outline"></ion-icon>
                <strong>Location:</strong> Nairobi, Kenya
              </p>
            </div>

            <!-- Right Side (Form) -->
            <form class="contact-form">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Subject" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        <!-- contact-section ends -->
      </section>
    
    `;
  },
  afterRender() {
    document.querySelectorAll(".show-faq-answer").forEach((button) => {
      button.addEventListener("click", () => {});
    });
  },
};
export default contactUs;
