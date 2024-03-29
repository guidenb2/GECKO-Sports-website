fetch("http://localhost:8000/api/reviews/?format=json") // make a request
.then(response => response.json()) // with our response, get the json data returned
.then(data =>{
    data.forEach(element =>{
        let row = document.getElementById("review-row")

        // <div class="col-lg-4 d-flex align-items-stretch">
        let column = document.createElement("div")
        column.className = "col-lg-4 d-flex align-items-stretch"
        row.appendChild(column)

        // <div class="card bg-dark border-light text-white flex-fill" style="width: 14rem; height: 28.9rem; margin-top: 20px; margin-bottom: 10px; margin-left: 10px">
        let card = document.createElement("div")
        card.className = "card bg-dark border-light text-white flex-fill rounded"
        card.style = "width: 14rem; height: 32rem; margin-top: 20px; margin-bottom: 10px; margin-left: 10px"
        column.appendChild(card)

        // <img src=element['customer_pic'] class="card-img-top" style="height: 20rem; object-fit: cover" alt=element['customer_name']>
        let picture = document.createElement("img")
        picture.src = element["customer_pic"]
        picture.class = "card-img-top"
        picture.alt = element['customer_name']
        picture.style = "height: 20rem; object-fit: cover; text-align: centre"
        card.appendChild(picture)

        // <div class="card-body">
        let card_body = document.createElement("div")
        card_body.className = "card-body"
        card.appendChild(card_body)

        // <p class="card-text" style="text-align: center"><strong>element['customer_name']</strong><br><i>element['role']</i></p>
        let card_text1 = document.createElement("p")
        card_text1.className = "card-text"
        card_text1.style = "text-align: center"
        card_body.appendChild(card_text1)

        let bold_text = document.createElement("strong")
        bold_text.innerHTML = element["customer_name"]
        card_text1.appendChild(bold_text)

        card_text1.innerHTML += ("<br>" + element['role'])


        // <p class="card-text" style="text-align: center">element['review']</p>
        let card_text3 = document.createElement("p")
        card_text3.className = "card-text"
        card_text3.style = "text-align: center"
        card_text3.innerHTML = element['review']
        card_body.appendChild(card_text3)
    })
});
