// Check if there is a saved color in localStorage
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  // Apply the saved color to the root element
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Remove "active" class from all color options and add it to the matching color
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

let backgroundrandom = true; // Default state for random background
let backgroundinterval; // Variable to store the interval ID
let backgroundLocalStorage = localStorage.getItem("background_option");
if (backgroundLocalStorage !== null) {
  console.log(backgroundLocalStorage);

  console.log(typeof backgroundLocalStorage);

  if (backgroundLocalStorage === "true") {
    backgroundrandom = true;
  } else {
    backgroundrandom = false;
  }
  document.querySelectorAll(".randomBack span").forEach((el) => {
    el.classList.remove("active");
  });
  if (backgroundLocalStorage === "true") {
    document.querySelector(".randomBack .yes").classList.add("active");
  } else {
    document.querySelector(".randomBack .no").classList.add("active");
  }
}

// Select the settings box element
let settingBox = document.querySelector(".settings-Box");

// Add an event listener to the gear icon to toggle rotation and show/hide the settings box
document.querySelector(".toggle-box .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin"); // Rotate the gear icon
  settingBox.classList.toggle("open"); // Show/hide the settings box
};

// Select the landing page element
let landingPage = document.querySelector(".Landing-page");

// Array of image filenames for the background
let images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

// Function to randomize the background
function randomize() {
  if (backgroundrandom === true) {
    // Change the background image randomly every 10 seconds
    backgroundinterval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * images.length); // Get a random index from the images array
      landingPage.style.backgroundImage = `url("imgs/${images[randomIndex]}")`; // Set the background image
      landingPage.style.transition = "0.7s"; // Add a transition effect to the background change
    }, 1000); // Change every 1 second
  }
}

// Start the random background on page load if backgroundrandom is true
if (backgroundrandom === true) {
  randomize();
}

// Handle color selection from the color list
let colorOptions = document.querySelectorAll(".colors-list li");

// Loop through each color option and add an event listener
colorOptions.forEach((li) => {
  li.addEventListener("click", function () {
    // Remove the "active" class from all options
    colorOptions.forEach((el) => el.classList.remove("active"));

    // Add the "active" class to the clicked option
    li.classList.add("active");

    // Get the color from the data attribute and set it as the main color
    let selectedColor = li.dataset.color;
    document.documentElement.style.setProperty("--main-color", selectedColor);

    // Save the selected color in localStorage
    localStorage.setItem("color-option", selectedColor);
  });
});

// Handle random background toggle
const randomBackEl = document.querySelectorAll(".randomBack span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", function () {
    // Remove the "active" class from all options
    randomBackEl.forEach((el) => el.classList.remove("active"));

    // Add the "active" class to the clicked option
    span.classList.add("active");

    // Check if the clicked span is "yes"
    if (span.textContent.trim().toLowerCase() === "yes") {
      backgroundrandom = true; // Enable random background
      randomize(); // Start the interval
      localStorage.setItem("background_option", true);
    } else {
      backgroundrandom = false; // Disable random background
      clearInterval(backgroundinterval); // Stop the interval
      localStorage.setItem("background_option", false);
    }
  });
});
randomize();
let skills = document.querySelector(".Skills");
let Allskills = document.querySelectorAll(
  ".Skills .Skill-Box .Skill-Progress span"
);

// Flag to check if the animation has already been triggered
let isAnimated = false;

window.onscroll = function () {
  // Check if the user has scrolled to the skills section
  if (window.scrollY >= skills.offsetTop - window.innerHeight / 2) {
    // Check if the animation hasn't been triggered yet
    if (!isAnimated) {
      Allskills.forEach((skill) => {
        skill.style.width = skill.dataset.progress; // Set the width from data-progress
        skill.style.transition = "width 1.5s ease"; // Add smooth transition
      });
      isAnimated = true; // Mark the animation as triggered
    }
  } else {
    // Reset the animation if the user scrolls back up
    if (isAnimated) {
      Allskills.forEach((skill) => {
        skill.style.width = "0"; // Reset the width to 0
        skill.style.transition = "none"; // Remove transition for instant reset
      });
      isAnimated = false; // Mark the animation as not triggered
    }
  }
};

// Select all image elements inside the gallery
let ourGallery = document.querySelectorAll(".gallery img");

// Loop through each image in the gallery
ourGallery.forEach((img) => {
  // Add a click event listener to each image
  img.addEventListener("click", (e) => {
    // Create a div element for the overlay (dark background)
    let overlay = document.createElement("div");

    // Add a class name to the overlay for styling
    overlay.className = "popView";

    // Append the overlay to the body of the document
    document.body.appendChild(overlay);

    // Create a div element for the popup box
    let popbox = document.createElement("div");

    // Add a class name for styling
    popbox.className = "popbox";

    // Create a close button
    let closebutton = document.createElement("span");
    closebutton.className = "close-button"; // Corrected: Use assignment, not function call
    let closemark = document.createTextNode("X");
    closebutton.appendChild(closemark);

    // Add a click event listener to the close button
    closebutton.addEventListener("click", () => {
      document.body.removeChild(popbox); // Remove the popup box
      document.body.removeChild(overlay); // Remove the overlay
    });

    // Append the close button to the popup box
    popbox.appendChild(closebutton);

    // Check if the image has an alt attribute
    if (img.alt) {
      // Create a heading for the image alt text
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);

      // Append the heading to the popup box
      popbox.appendChild(imgHeading);
    }

    // Create an image element for the popup
    let popimg = document.createElement("img");
    // Set the source of the popup image to the clicked image's source
    popimg.src = img.src;

    // Append the popup image to the popup box
    popbox.appendChild(popimg);

    // Append the popup box to the body of the document
    document.body.appendChild(popbox);
  });
});
let NavButton = document.querySelectorAll(".Nav-content .bullet");
let links = document.querySelectorAll(".links a");

function generalbutton(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
generalbutton(NavButton);
generalbutton(links);



document.querySelector(".reset-button").onclick = function () {

  // localStorage.removeItem("color-option");
  // localStorage.removeItem("background_option");
  localStorage.clear();
  window.location.reload();

};

let toggelmenu = document.querySelector(".toggle-menue")
let headlinks = document.querySelector(".links")



toggelmenu.onclick = function(e) {

  e.stopPropagation();


  this.classList.toggle("open")

  headlinks.classList.toggle("open")


}
document.addEventListener("click",(e)=>{
  if (e.target !== toggelmenu && e.target !== headlinks) {

    if (headlinks.classList.contains("open")) {

      toggelmenu.classList.toggle("open")
  
      headlinks.classList.toggle("open")
    }
  }


})
headlinks.onclick =function (e) {
  e.stopPropagation();
}