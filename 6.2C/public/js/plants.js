// public/js/plants.js

const escapeHtml = (str) => {
  if (str === null || str === undefined) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const addCards = (items) => {
  $("#card-section").empty();

  items.forEach((p) => {
    const petSafeText = p.petSafe ? "Yes" : "No";
    const img = p.imagePath ? escapeHtml(p.imagePath) : "images/placeholder.jpg";

    const card =
      `<div class="col s12 m4">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${img}" />
          </div>

          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              ${escapeHtml(p.commonName)}
              <i class="material-icons right">more_vert</i>
            </span>
            <p class="grey-text">${escapeHtml(p.scientificName)}</p>
            <p>Sun: ${escapeHtml(p.sunlight)}</p>
            <p>Water: ${escapeHtml(p.watering)}</p>
          </div>

          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              ${escapeHtml(p.commonName)}
              <i class="material-icons right">close</i>
            </span>
            <p><b>Pet safe:</b> ${petSafeText}</p>
            <p>${escapeHtml(p.careNotes)}</p>
          </div>
        </div>
      </div>`;

    $("#card-section").append(card);
  });
};

const getPlants = () => {
  $.get("/api/plants", (response) => {
    if (response.statusCode === 200) {
      addCards(response.data);
    } else {
      console.error("GET /api/plants unexpected response:", response);
    }
  }).fail((err) => {
    console.error("GET /api/plants failed:", err);
  });
};

const submitForm = (event) => {
  event.preventDefault();

  const payload = {
    commonName: $("#commonName").val(),
    scientificName: $("#scientificName").val(),
    sunlight: $("#sunlight").val(),
    watering: $("#watering").val(),
    imagePath: $("#imagePath").val(),
    petSafe: $("#petSafe").is(":checked"),
    careNotes: $("#careNotes").val(),
  };

  $.post("/api/plants", payload, (response) => {
    if (response.statusCode === 201) {
      // refresh list so new card appears immediately
      getPlants();

      // reset + close
      $("#plantForm")[0].reset();
      M.updateTextFields(); // Materialize label fix
      const modalElem = document.getElementById("plantModal");
      const modalInstance = M.Modal.getInstance(modalElem);
      modalInstance.close();
    } else {
      console.error("POST /api/plants unexpected response:", response);
    }
  }).fail((err) => {
    console.error("POST /api/plants failed:", err);
  });
};

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".modal").modal();

  // Submit via form submit (button type=submit triggers this too)
  $("#plantForm").on("submit", submitForm);

  // initial load
  getPlants();
});
