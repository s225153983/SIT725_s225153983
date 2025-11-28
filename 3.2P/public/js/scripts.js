// Create cards from a list of plant objects
const addCards = (items) => {
  items.forEach((item) => {
    const itemToAppend =
      '<div class="col s12 m4 center-align">' +
      '<div class="card medium">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
      '<img class="activator" src="' + item.image + '">' +
      "</div>" +
      '<div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">more_vert</i></span>' +
      "<p><a href='#'>" +
      item.link +
      "</a></p>" +
      "</div>" +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      item.description +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>";

    $("#card-section").append(itemToAppend);
  });
};

// Call backend GET endpoint
const loadPlants = () => {
  fetch("/api/plants")
    .then((res) => res.json())
    .then((data) => {
      addCards(data);
    })
    .catch((err) => console.error("Error loading plants:", err));
};

// Handle modal form submit (console log only)
const submitForm = () => {
  const plantData = {
    name: $("#plant_name").val(),
    light: $("#plant_light").val(),
    care: $("#plant_care").val(),
  };
  console.log("Plant form submitted:", plantData);
};

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".modal").modal();

  $("#formSubmit").click(() => {
    submitForm();
  });

  // Load cards dynamically
  loadPlants();
});
