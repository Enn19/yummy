/* close and open nav*/
let sideWidth=$("#nav-tab").innerWidth();
$("#nav-header").animate({left:-sideWidth},1000)
$(".side-nav-menu .nav-header i").click(function () {
    if ($("#nav-header").css('left')=='0px'&& $(".links li").css('top')=='0px') {
        $("#nav-header").animate({left:-sideWidth},1000)
        $(".links li").animate({top:"300px"},1000)
        $('#icon').removeClass("fa-x")
        $('#icon').addClass("fa-align-justify")
    } else {
        $("#nav-header").animate({left:'0px'},1000)
        $(".links li").animate({top:"0px"},1000)
        $('#icon').removeClass("fa-align-justify")
        $('#icon').addClass("fa-x")
    }
})
/*api*/

/////////home page////////////////////////////


function displayData(data) {
  let desgin = "";
  for (let i = 0; i < data.length; i++) {
    desgin += `
      <div class="col-md-3">
        <div onclick="getMeals(${i})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${res.meals[i].strMealThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${res.meals[i].strMeal}</h3>
          </div>
        </div>
      </div>`;
  }
  document.getElementById("Data").innerHTML = desgin;
}

function getMeals(i) {
  
    let desgin = `
      <div class="col-md-4">
        <img class="w-100 rounded-3" src="${res.meals[i].strMealThumb}" alt="">
        <h2>${res.meals[i].strMeal}</h2>
      </div>
      <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${res.meals[i].strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${res.meals[i].strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${res.meals[i].strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-info m-2 p-1">1 cup  Lentils</li><li class="alert alert-info m-2 p-1">1 large Onion</li><li class="alert alert-info m-2 p-1">1 large Carrots</li><li class="alert alert-info m-2 p-1">1 tbs Tomato Puree</li><li class="alert alert-info m-2 p-1">2 tsp Cumin</li><li class="alert alert-info m-2 p-1">1 tsp  Paprika</li><li class="alert alert-info m-2 p-1">1/2 tsp Mint</li><li class="alert alert-info m-2 p-1">1/2 tsp Thyme</li><li class="alert alert-info m-2 p-1">1/4 tsp Black Pepper</li><li class="alert alert-info m-2 p-1">1/4 tsp Red Pepper Flakes</li><li class="alert alert-info m-2 p-1">4 cups  Vegetable Stock</li><li class="alert alert-info m-2 p-1">1 cup  Water</li><li class="alert alert-info m-2 p-1">Pinch Sea Salt</li>
        </ul>
        <h3>Tags :</h3>
        <a target="_blank" href="${res.meals[i].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${res.meals[i].strYoutube}" class="btn btn-danger">Youtube</a>
      </div>`;
    document.getElementById("Data").innerHTML = desgin;
}

function getIngredients(i) {
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (res.meals[i][`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${res.meals[i][`strIngredient${i}`]}</li>`;
    }
  }
  return ingredients;
}

    /////////////////////////catgoryyy///////////////////////////////////
let cat = []; 

async function foodd() {
  
    let apiCat = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    apiCat = await apiCat.json();
    cat = apiCat.categories; // Assign the categories directly to the cat array
    getCategories();
 
}

function getCategories() {
  try {
    var cartona = "";
    for (let i = 0; i < cat.length; i++) { 
      cartona += `
        <div class="col-md-3">
          <div onclick="getCategoryMeals('${cat[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="img-fluid" src="${cat[i].strCategoryThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${cat[i].strCategory}</h3>
              <p>${cat[i].strCategoryDescription}</p>
            </div>
          </div>
        </div>`;
    }
    document.getElementById("Data").innerHTML = cartona;
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("cat").addEventListener("click", () => {
  document.querySelector('#searchContainer').classList.add('d-none')
  foodd();
});

async function f(ingredient) {
  try {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let data = await response.json();
    let meals = data.meals;
    getCategoryMeals(meals);
  } catch (error) {
    console.error(error);
  }
}

function getCategoryMeals(meals) {
  try {
    var design = "";
    for (let i = 0; i < meals.length; i++) {
      design += `
        <div class="col-md-3">
          <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${meals[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
    }
    document.getElementById("Data").innerHTML = design;
  } catch (error) {
    console.error(error);
  }
}
  /////////////////areaaa////////////////

let Area = [];

async function area() {
  try {
    let apiArea = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let areaData = await apiArea.json();
    Area = areaData.meals;
    console.log("area", Area);
    getArea(Area);
  } catch (error) {
    console.log("Error:", error);
  }
}


function getArea(data) {
    var makan = "";
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        makan += `
          <div class="col-md-3">
            <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
              <i class="fa-solid fa-house-laptop fa-4x "></i>
              <h3>${data[i].strArea}</h3>
            </div>
          </div>`;
      }
    } else {
      makan = "<p>No area data available</p>";
    }
    document.getElementById("Data").innerHTML = makan;
  }

document.getElementById("area").addEventListener("click", () => {
  area();
  document.querySelector('#searchContainer').classList.add('d-none')
});

let r = [];

async function showArea() {
  try {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=qCanadian");
    console.log(response);
    let data = await response.json();
    r.push(data.meals);
    console.log("rea", r);
    getAreaMeals(r);
  } catch (error) {
    console.log("Error:", error);
  }
}

function getAreaMeals(data) {
  var desgin = "";
  if (data && data.length > 0) {
    for (let i = 0; i < data[0].length; i++) {
      desgin += `
        <div class="col-md-3">
          <div onclick="getMealDetails('${data[0][i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${data[0][i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${data[0][i].strMeal}</h3>
            </div>
          </div>
        </div>`;
    }
  } else {
    desgin = "<p>No meal data available</p>";
  }
  document.getElementById("Data").innerHTML = desgin;
}
  
/////////////ingradint//////////////////////////////

let ingra = [];

async function mokonat() {
  try {
    let apiIngra = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let ingraData = await apiIngra.json();
    ingra.push(ingraData.meals);
    console.log("ingra", ingra);
    getIngredients(ingra[0]); 
  } catch (error) {
    console.log("Error:", error);
  }
}

function getIngredients(data) {
  var makan = "";
  if (data && data.length > 0) {
    for (let i = 0; i < 20; i++) {
      makan += `
        <div class="col-md-3">
          <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="rounded-2 overflow-hidden text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${data[i].strIngredient}</h3>
            <p>${data[i].strDescription.substring(0, 120)}</p>
          </div>
        </div>`;
    }
  } else {
    makan = "<p>No ingredient data available</p>";
  }
  document.getElementById("Data").innerHTML = makan;
}

document.getElementById("ingra").addEventListener("click", () => {
  document.querySelector('#searchContainer').classList.add('d-none')
  mokonat();
});


let n = [];

async function showType() {
  try {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef");
    console.log(response);
    let data = await response.json();
    n = data.meals;
    console.log("type", n);
    getIngredientsMeals();
  } catch (error) {
    console.log("Error:", error);
  }
}
function getIngredientsMeals() {
  var desgin = "";
  if (n && n.length > 0) {
    for (let i = 0; i < n.length; i++) {
      desgin += `
        <div class="col-md-3">
          <div onclick="getMealDetails('${n[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${n[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${n[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
    }
  } else {
    desgin = "<p>No meal data available</p>";
  }
  document.getElementById("Data").innerHTML = desgin;
}

////////////////////search////////////////////
 
let res;
async function getRandomMeal(search = "") {
 
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    res = await res.json();
    console.log(res.meals);
    displayData(res.meals);
  
}
getRandomMeal()
function getSearch() {
      var cartona = "";
    for (let i = 0; i < cat.length; i++) { 
      cartona += `
        <div class="col-md-3">
          <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="img-fluid" src="${cat[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${cat[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
    }
    document.getElementById("data").innerHTML = cartona;
  }

document.getElementById("cat").addEventListener("click", () => {
  document.querySelector('#searchContainer').classList.add('d-none')
  foodd();
});

document.getElementById('searchh').addEventListener("click",()=>{
  document.querySelector('#searchContainer').classList.remove('d-none')
  document.querySelector("#Data").innerHTML=""
})


///////////////////////contact us/////////////////////////////////////////
// Function to validate the input fields
function inputsValidation() {
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  const ageInput = document.getElementById("ageInput");
  const passwordInput = document.getElementById("passwordInput");
  const repasswordInput = document.getElementById("repasswordInput");
  const submitBtn = document.getElementById("submitBtn");

  // Validate name (no special characters or numbers)
  const nameRegex = /^[A-Za-z\s]+$/;
  const isNameValid = nameRegex.test(nameInput.value);
  toggleAlert("nameAlert", !isNameValid);

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(emailInput.value);
  toggleAlert("emailAlert", !isEmailValid);

  // Validate phone number
  const phoneRegex = /^\d{10}$/;
  const isPhoneValid = phoneRegex.test(phoneInput.value);
  toggleAlert("phoneAlert", !isPhoneValid);

  // Validate age
  const isAgeValid = Number.isInteger(Number(ageInput.value)) && Number(ageInput.value) > 0;
  toggleAlert("ageAlert", !isAgeValid);

  // Validate password (minimum eight characters, at least one letter, and one number)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const isPasswordValid = passwordRegex.test(passwordInput.value);
  toggleAlert("passwordAlert", !isPasswordValid);

  // Validate repassword (must match password)
  const isRepasswordValid = passwordInput.value === repasswordInput.value;
  toggleAlert("repasswordAlert", !isRepasswordValid);

  // Enable or disable submit button based on input validity
  if (submitBtn) {
    submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid);
  }
}

function showContacts() {
  let show = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container w-75 text-center">
        <div class="row g-4">
          <div class="col-md-6">
            <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
              Special characters and numbers not allowed
            </div>
          </div>
          <div class="col-md-6">
            <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
              Email not valid *exemple@yyy.zzz
            </div>
          </div>
          <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Phone Number
            </div>
          </div>
          <div class="col-md-6">
            <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid age
            </div>
          </div>
          <div class="col-md-6">
            <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
          </div>
          <div class="col-md-6">
            <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid repassword 
            </div>
          </div>
        </div>
        <button idsubmitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
      </div>
    </div>`;
  document.getElementById("Data").innerHTML = show;

  document.getElementById("contact").addEventListener("click", () => {
    showContacts();
  });
}

// Helper function to toggle alert visibility
function toggleAlert(alertId, show) {
  const alertElement = document.getElementById(alertId);
  if (show) {
    alertElement.classList.remove("d-none");
  } else {
    alertElement.classList.add("d-none");
  }
}

 ////////loading screeeen////////
 $(document).ready(function(){
  $(".loadingScreen").fadeOut(1000)
})