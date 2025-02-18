import "./ratingComponent.css";

const ratingComponent = {
  render(averageRating, count) {
    if (!count) {
      return `<div></div>`;
    }

    const getStarIcon = (rating, threshold) => {
      return rating >= threshold
        ? "star"
        : rating >= threshold - 0.5
        ? "star-half-outline"
        : "star-outline";
    };

    // Generate stars dynamically
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      starsHTML += `<ion-icon name="${getStarIcon(
        averageRating,
        i
      )}"></ion-icon>`;
    }

    return `
     <div class="stars flex-center-container">
       ${starsHTML}
     </div>
     (
     <div class="no-of-stars">${averageRating}</div>
     /
     <div class="no-of-ratting">${count} Rating</div>
     )
    `;
  },
};

export default ratingComponent;
