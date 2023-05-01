const ramenMenu = document.querySelector("#ramen-menu");

document.addEventListener("DOMContentLoaded", () => {
  displayAllRamens();
  populateForm();
});

function displayAllRamens() {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then(getRamenItems);
}

function getRamenItems(arr) {
  arr.forEach((ramen) => {
    getRamenImage(ramen);
  });
}

function getRamenImage(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.dataset.id = ramen.id;
  ramenMenu.append(img);

  img.addEventListener("click", function (e) {
    getRamen(e.target.dataset.id);
  });
}

function getRamen(ramenId) {
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then((response) => response.json())
    .then((ramen) => {
      ramenDetails(ramen);
    });
}

function ramenDetails(ramen) {
  const img = document.querySelector(".detail-image");
  const h2 = document.querySelector(".name");
  const h3 = document.querySelector(".restaurant");
  const rating = document.querySelector("#rating-display");
  rating.textContent = ramen.rating;
  const comment = document.querySelector("#comment-display");
  comment.textContent = ramen.comment;
  img.src = ramen.image;
  img.alt = ramen.name;
  h2.textContent = ramen.name;
  h3.textContent = ramen.restaurant;
  const ramenForm = document.querySelector("#new-ramen");
  ramenForm.dataset.id = ramen.id;
}

function populateForm() {
  const ramenForm = document.querySelector("#new-ramen");
  ramenForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newRating = document.querySelector("#rating").value;
    const newComment = document.querySelector("#comment").value;

    const newRamen = {
      id: parseInt(ramenForm.dataset.id),
      rating: newRating,
      comment: newComment,
    };

    updateRamen(newRamen);
    e.target.reset();
  });
}

function updateRamen(newRamen) {
  fetch(`http://localhost:3000/ramens/${newRamen.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamen),
  })
    .then((response) => response.json())
    .then((newRamen) => {
      const rating = document.querySelector("#new-rating");
      const comment = document.querySelector("#new-comment");
      ratingInput.textContent = newRamen.value;
      commentInput.textContent = newRamen.value;
    });
}
