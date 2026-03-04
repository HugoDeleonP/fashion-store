// API

const url = "https://api.escuelajs.co/api/v1/";


async function request3ProductsNewer() {

    const productsNewer = `${url}products?offset=0&limit=3`;

    const dataResponse = await fetch(productsNewer);
    const responseJson = await dataResponse.json();

    return responseJson;
}

async function requestAllProducts(){
    const productsNewer = `${url}products`;

    const dataResponse = await fetch(productsNewer);
    return await dataResponse.json();

}

async function requestProductById(id){
    const productsNewer = `${url}products/${id}`;

    const dataResponse = await fetch(productsNewer);
    return await dataResponse.json();

}

async function requestAllCategories(){
    const categories = `${url}categories?offset=10&limit=5`;

    const dataResponse = await fetch(categories);
    return await dataResponse.json();
}

async function detailUrl(){
    const parameters = new URLSearchParams(window.location.search)
    const id = parameters.get("id")

    return id;

}

// DOM

const grid_container = document.querySelector(".grid-container");
const card = document.querySelector(".card");
const category_filter = document.querySelector("#category-filter");
const button_detail = document.querySelector(".btn-primary");

async function manipulationOutstanding(products) {

    try {
    
        console.log(grid_container);
        grid_container.innerHTML = ""
    
        products.forEach(product => {
            createCard(product)
        });
    } catch (error) {
        console.error(error)
    }

}

function createCard(product) {

    const createArticle = document.createElement("article");
    createArticle.classList.add("card");

    createArticle.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${product.images[0]}" alt="${product.title}" class="card-img">
          </div>
          <div class="card-content">
            <span class="card-category">${product.category.name}</span>
            <h3 class="card-title">${product.title}</h3>
            <div class="card-footer">
              <span class="card-price">R$ ${product.price}</span>
              <a href="./detail.html" class="btn-primary btn-small">Ver Detalhes</a>
            </div>
          </div>
    `;

    grid_container.appendChild(createArticle);

}

function renderingCategories(categories){

    categories.forEach( category =>{
        createCategory(category)
    })


}

function createCategory(category){
    const createOption = document.createElement("option")
    createOption.innerHTML = `
    <option value="${category.name}">${category.name}</option>
     `
    category_filter.appendChild(createOption);
}

function renderingDetail(product){
    const product_detail = document.querySelector("#product-detail")

    product_detail.innerHTML = `
    <img src="${product.images[0]}" alt="${product.title}" class="detail-img">
    
    <div class="detail-info">
      <span class="card-category" style="font-size:1rem; margin-bottom:1rem; display:block;">${product.category.name}</span>
      <h1>${product.title}</h1>
      <div class="detail-price">R$ 0,00</div>
      <p class="detail-description">As informações do produto estão sendo carregadas através da API. Por favor, aguarde alguns instantes.</p>
      <button class="btn-primary" disabled>Adicionar ao Carrinho</button>
    </div>
    `


}

// Events

async function filterCategories(products){
    category_filter.addEventListener( "change", async (event) =>{
        const productsCategory = products.filter( product => product.category.name === event.target.value)

        grid_container.innerHTML = ""
        productsCategory.forEach( product => {
            createCard(product)
        })

        if(event.target.value === ""){
            manipulationOutstanding(await requestAllProducts())
        }

    })
}

async function redirectDetailProduct(){

    
}

async function main(){

    const urlDomain = window.location.href;

    if(urlDomain.includes('index.html')){
        manipulationOutstanding(await request3ProductsNewer());
    }
    else if(urlDomain.includes('menu.html')){
        renderingCategories(await requestAllCategories())
        manipulationOutstanding(await requestAllProducts())
        filterCategories(await requestAllProducts())
    }
    else if(urlDomain.includes('detail.html')){
        const id = detailUrl();
        requestProductById(id);

    }

    
}

main()