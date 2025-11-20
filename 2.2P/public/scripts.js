function changeText() {
  var textsArray = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"];
  var number = getRandomNumberBetween(0, textsArray.length - 1);
  console.log("Index: ", number);
  document.getElementById("heading").innerHTML = textsArray[number];
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// NEW: call the /add endpoint on the server
function addNumbers() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  if (num1 === "" || num2 === "") {
    alert("Please enter both numbers");
    return;
  }

  fetch(`/add?num1=${num1}&num2=${num2}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        document.getElementById("result").innerText = data.error;
      } else {
        document.getElementById("result").innerText = data.result;
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("result").innerText = "Error calling server";
    });
}
