let where = document.getElementById("contenedor-cartas")

function crearCards(data, where){
  let template = ``

  for (let evento of data.events){
    if(evento.date >= data.currentDate){
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
}

where.innerHTML = template

}
crearCards(data, where)