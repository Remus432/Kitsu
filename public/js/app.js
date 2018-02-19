let randomNumbs = [Math.floor(Math.random() * 10000), Math.floor(Math.random() * 10000), Math.floor(Math.random() * 10000), Math.floor(Math.random() * 10000)];
console.log(randomNumbs);

// Loop over array 
randomNumbs.forEach(randId => {
    getRequest(randId);
    
})

// Get request
function getRequest(randId) {
    axios.get(`https://kitsu.io/api/edge/anime?filter[id]=${randId}`)
        .then(data => {
            console.log(data);
            // Init output var
            let output = ``;
            // Template data
            output += `
                <div id="${data.data.data[0].id}" class="anime">
                    <div class="img-container">
                        <h4>${data.data.data[0].attributes.canonicalTitle}</h4>
                        <div class="overlay"></div>
                        <img src="${data.data.data[0].attributes.posterImage.medium} /"
                    </div>
                </div>
            `

            // Output data to UI
            document.querySelector("header .grid").innerHTML += output;
            // Add event listener
            addClick();

        })
        .catch(err => {
            console.log(err);
        })
}

function addClick() {
    // Get all divs
    const animes = document.querySelectorAll("header .grid > div.anime");
    // Add Event Listeners
    animes.forEach( anime => addEventListener("click", showAnime));
}

// Show Anime
function showAnime(e) {
    // Store in LS
    localStorage.setItem("animeID", e.target.parentElement.id);
    if(e.target.parentElement.className === "anime") {
        alert("dasd");
    }
    

    // Change location
    //location.href = "anime.html";
}

// API Endpoint
const urlEnd = "https://kitsu.io/api/edge";

// UI Elements
const search = document.querySelector("input");
const searchBtn = document.querySelector("i").parentElement;

// Event Listeners
search.addEventListener("keydown", searchAPI);
searchBtn.addEventListener("click", clickSearch)


// GET Request
function searchAPI(e) {
    // Check if search input is not empty and ENTER Key is pressed
    if(e.keyCode === 13 && e.target.value !== "") {
        console.log(e.target.value);
        axios.get(`${urlEnd}/anime?filter[text]=${e.target.value}`)
        .then(data => {
            console.log(data);
            // Set local storage
            localStorage.setItem("animeName", e.target.value);
            // Change page
            location.href = "animes.html"
        })
        .catch(err => {
            console.log(err);
        })
    }  
}


function clickSearch() {
    // Check if search input is not empty and ENTER Key is pressed
    if(search.value !== "") {
        console.log(search.value);
        axios.get(`${urlEnd}/anime?filter[text]=${search.value}`)
        .then(data => {
            console.log(data);
            // Set local storage
            localStorage.setItem("animeName", search.value);
            // Change page
            location.href = "animes.html"
        })
        .catch(err => {
            console.log(err);
        })
    }  
}