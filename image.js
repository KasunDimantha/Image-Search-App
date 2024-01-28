const accesskey = "2O3YrdbQ6nakbdfvrEgoaxaa2OOqlWggqkdj7WP0gV4";

const formElement = document.querySelector("form");
const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");
const searchReasult = document.querySelector(".search_results");
const showMoreButton = document.getElementById("show_more_button");

let inputData = "";
let page = 1;

async function searchImage(){

    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url); 
    const data = await response.json();

    if (page === 1){
        searchReasult.innerHTML = "";
    }
    const results = data.results;

    results.map((result) => {

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search_result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchReasult.appendChild(imageWrapper);

    });

    page++;

    if(page > 1){
        showMoreButton.style.display = "block";
    }
    console.log(results);

}

formElement.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImage();
})

showMoreButton.addEventListener("click", () => {
    searchImage();
})