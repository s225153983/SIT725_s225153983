// public/js/plants.js

// Renders plant cards on the page
const addCards = (items) => {
  $("#card-section").empty();

  items.forEach((item) => {
    const card =
      '<div class="col s12 m4 center-align">' +
      '<div class="card medium">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
      `<img class="activator" src="${item.image || 'images/placeholder.jpg'}">` +
      "</div>" +
      '<div class="card-content">' +
      `<span class="card-title activator grey-text text-darken-4">${item.title}` +
      '<i class="material-icons right">more_vert</i></span>' +
      `<p><a href="#">${item.link || ''}</a></p>` +
      "</div>" +
      '<div class="card-reveal">' +
      `<span class="card-title grey-text text-darken-4">${item.title}` +
      '<i class="material-icons right">close</i></span>' +
      `<p>${item.description || ''}</p>` +
      "</div>" +
      "</div>" +
      "</div>";

    $("#card-section").append(card);
  });
};

// GET plants from the server
const getPlants = () => {
  $.get("/api/plants", (response) => {
    if (response.statusCode === 200) {
      addCards(response.data);
    } else {
      console.error("Error loading plants:", response);
    }
  }).fail((err) => {
    console.error("AJAX GET error:", err);
  });
};

// POST a new plant from the form
const submitForm = (event) => {
  if (event) event.preventDefault(); // stop page refresh

  const plantData = {
    title: $("#plant_name").val(),
    image: $("#plant_image").val(),
    link: $("#plant_link").val(),
    description: $("#plant_desc").val(),
  };

  $.post("/api/plants", plantData, (response) => {
    if (response.statusCode === 201) {
      // reload cards
      getPlants();
      // reset form
      $("#plantForm")[0].reset();
      // close modal
      const modalElem = document.getElementById("plantModal");
      const modalInstance = M.Modal.getInstance(modalElem);
      modalInstance.close();
    } else {
      console.error("Error from server:", response);
    }
  }).fail((err) => {
    console.error("AJAX POST error:", err);
  });
};

$(document).ready(function () {
  // Initialise Materialize components
  $(".materialboxed").materialbox();
  $(".modal").modal();

  // Wire up form submission
  $("#plantForm").on("submit", submitForm);
  $("#formSubmit").on("click", submitForm);

  // Initial load of cards
  getPlants();
});
