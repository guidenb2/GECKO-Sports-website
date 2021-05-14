fetch("http://localhost:8000/api/products/?format=json") // make a request
.then(response => response.json()) // with our response, get the json data returned
.then(data =>{
    let card_deck = document.getElementById("index_deck")

    // =========================== CARD 1 ============================
    let card_div = document.createElement("div")
    card_div.className = "card border"
    card_div.style = "align-items: center;"
    card_deck.appendChild(card_div)

    let image = document.createElement("img")
    image.className = "card-img-top"
    image.src = data[0]["picture"]
    image.style = "height: 20rem; object-fit: cover"
    card_div.appendChild(image)

    let body_div = document.createElement("div")
    body_div.className = "card-body"
    body_div.style = "text-align: center"
    card_div.appendChild(body_div)

    let text = document.createElement("p")
    text.innerHTML = data[0]['name']
    body_div.appendChild(text)

    let text2 = document.createElement("p")
    text2.innerHTML = data[0]['price']
    body_div.appendChild(text2)
    // ==========================================================

    // =========================== CARD 2 ============================
    let card_div2 = document.createElement("div")
    card_div2.className = "card border"
    card_div2.style = "width: 25%;"
    card_deck.appendChild(card_div2)

    let image2 = document.createElement("img")
    image2.className = "card-img-top"
    image2.src = data[4]["picture"]
    image2.style = "height: 20rem; object-fit: cover"
    card_div2.appendChild(image2)

    let body_div2 = document.createElement("div")
    body_div2.className = "card-body"
    body_div2.style = "text-align: center"
    card_div2.appendChild(body_div2)

    let text3 = document.createElement("p")
    text3.innerHTML = data[4]['name']
    body_div2.appendChild(text3)

    let text4 = document.createElement("p")
    text4.innerHTML = data[4]['price']
    body_div2.appendChild(text4)
    // =================================================================


    // =========================== CARD 3 ============================
    let card_div3 = document.createElement("div")
    card_div3.className = "card border"
    card_deck.appendChild(card_div3)

    let image3 = document.createElement("img")
    image3.className = "card-img-top"
    image3.src = data[5]["picture"]
    image3.style = "height: 20rem; object-fit: cover"
    card_div3.appendChild(image3)

    let body_div3 = document.createElement("div")
    body_div3.className = "card-body"
    body_div3.style = "text-align: center"
    card_div3.appendChild(body_div3)

    let text5 = document.createElement("p")
    text5.innerHTML = data[5]['name']
    body_div3.appendChild(text5)

    let text6 = document.createElement("p")
    text6.innerHTML = data[5]['price']
    body_div3.appendChild(text6)
    // =================================================================
  })
