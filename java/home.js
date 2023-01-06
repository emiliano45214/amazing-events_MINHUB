let espacioCards = document.getElementById("contenedor-cartas")

function crearCards(data, where){
  let template = ``

  for (let evento of data.events){
    template += `
    <div class="card" style="width: 18rem;">
      <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
                <div class="card-body">
                  <h5 class="card-title">${evento.name}</h5>
                  <p class="card-text">${evento.description}</p>
                  <div class="precio">
                    <p>
                        price $${evento.price}
                    </p>
                    <a href="./details.html" class="btn btn-primary">see more</a>
                  </div>
                </div>
              </div>`
}
console.log(template) 
where.innerHTML = template

}
crearCards(data, espacioCards)
// buscador, chackboxes



//Funcion para filtrar categorias

let homejs = document.getElementById("contenedor-cartas")
const search = document.getElementById('search1')
const check = document.getElementById("checkbox3")

function craftCards(lista){
    let imagenes = ""
    for (let walk of lista){
      
        let template =  
            `
            <div class="card" style="width: 16rem;">
            <img src="${walk.image}" class="card-img-top" alt="${walk.name}">
                <div class="card-body">
                <h5 class="card-title">${walk.name}</h5>
                <p class="card-text"></p>
                <p class="card-text">category of our event: ${walk.category}</p>
                <p class="card-text">where you will find the event: ${walk.place}</p>
                
                <a href="./details.html?id=${walk._id}" class="btn btn-primary">View More</a>
            </div>
            </div> `
imagenes =  imagenes + template
    
    }
    return imagenes
}

renderTemplate (craftCards(data.events), homejs)

//Funcion para filtrar categorias

const sinRepetir = []
const categorias = data.events.map(events => events.category)

categorias.forEach(categorias => {
    if (!sinRepetir.includes (categorias)){
        sinRepetir.push (categorias)}
    })
    
//Creacion de los botones checkbox
    function generarCheckbox (categorias){
        let template = ""
        categorias.forEach(categoria =>{
            template += `<div class="form-check d-flex">   
            <label class="form-check-label">${categoria}
            <input class="form-check-input" type="checkbox" value="${categoria}">
            </label>
            </div>`
        })
        return template
    }
    check.innerHTML = generarCheckbox(sinRepetir)
    //inner para pasar checks a pantaia
   
    //funcion para el filtro de los check
    function checkFilter (touchs, categoriesList){
        let values = [];
        for (let touch of touchs){
            if (touch.checked)
            values.push(touch.value.toLowerCase())
        }
        let filters = categoriesList.filter(food => values.includes(food.category.toLowerCase()))
        if (values.length === 0){
            return categoriesList
        }
        else{
            return filters
        }
    }
    check.addEventListener('change', filtroCruzado)
    
//funcion para el filtro del search
search.addEventListener( 'input', filtroCruzado)

function searchFood(inputFind, categoriesList){
    const filterFood = categoriesList.filter(food => {
        return food.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterFood
}
// funcion del filtro cruzado
function filtroCruzado(){
  let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFood (search, data.events)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h3 class="alert">THERES NO COICIDENCES WITH YOUR SEARCH</h3>`
        renderTemplate(alert, homejs)
    }
    else {
        renderTemplate(craftCards(filterPerCheack), homejs)
    }
}
//funcion del rendertemplate
function renderTemplate(template, ubicacion){
    ubicacion.innerHTML = template
}

filtroCruzado()
