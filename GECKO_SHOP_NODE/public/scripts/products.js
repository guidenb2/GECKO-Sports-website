fetch("http://localhost:8000/api/products/?format=json") // make a request
.then(response => response.json()) // with our response, get the json data returned
.then(data =>{
    console.log(data)
    data.forEach(element =>{
        let table = document.getElementById("product-table") // Fetch the table above
        let newRow = document.createElement("tr") // Add in a row <tr></tr>
        table.appendChild(newRow) // Add the new row to table

        let picturetd = document.createElement("td")
        let picture = document.createElement("img")
        picture.src = element['picture']
        picture.style.width = '100%'
        newRow.appendChild(picturetd)
        picturetd.appendChild(picture)

        let name = document.createElement("td") // Create <td>Inner html</td>
        name.innerHTML = element["name"]
        newRow.appendChild(name)

        let desc = document.createElement("td")
        desc.innerHTML = element["description"]
        newRow.appendChild(desc)

         let price = document.createElement("td")
        price.innerHTML = element["price"]
        newRow.appendChild(price)

        let buttoncontainer = document.createElement("td")
        let button = document.createElement("button")
        button.className = "btn btn-danger btn-sm"
        button.innerHTML = "Add to Cart 🛒"

        button.addEventListener('click', function(){
            addToBasket(element['id'])
        })

        button.style.backgroundColor = "Red"
        button.style.color = "white"
        button.style.borderColor = "DarkRed"
        button.style.borderRadius = "5px"
        button.style.fontSize = "125%"
        buttoncontainer.appendChild(button)
        newRow.appendChild(buttoncontainer)
    });
}); // log the json data

let login = document.getElementById("login-form")
login.addEventListener("submit",(event) =>{
event.preventDefault();

let user = document.getElementById("username").value
let pass = document.getElementById("password").value

fetch("http://localhost:8000/token/",
{
  method: 'POST',
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({username:user, password:pass})
}).then(response => response.json()).then(function(data){
console.log(data)
window.token = data['token']

window.location.hash = "#carouselExampleIndicators"

let login_button = document.getElementById("login_button")
login_button.remove()

let logout_button = document.getElementById("navbarText")
let nav_text2 = document.createElement("a")
nav_text2.className = "btn btn-danger"
nav_text2.href = "/"
nav_text2.role = "button"
nav_text2.innerHTML = "Logout"
logout_button.appendChild(nav_text2)

let admin_button = document.getElementById("admin-button")
admin_button.remove()

let user_nav = document.getElementById("navbarText")
let nav_text = document.createElement("a")
nav_text.className = "btn font-italic"
nav_text.style = "color: #0060E3;"
let nav_bold_text = document.createElement("strong")
nav_bold_text.innerHTML = ("Hello " + user)
nav_text.appendChild(nav_bold_text)

user_nav.appendChild(nav_text)

let login_section = document.getElementById("login")
login_section.remove()

let empty_container = document.getElementById("empty-container-below-products")
empty_container.style = "height: 10rem"
})
}, true)

function addToBasket(prodid)
{
if(window.token){
    fetch(`http://localhost:8000/addbasket/${prodid}?format=json`,{
        method: 'GET',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+window.token
        }
    }).then(function(response){
        console.log(response)
        return response.json()
    }).then(data=>console.log(data));
}
else
{
    alert("Please log in to continue")
}
}

function showBasket(){

// <div id="show-shopping-basket">
let products_table_div = document.getElementById("shopping-cart")
let products_table = document.getElementById("shopping-basket")

if(products_table == null)
{
// <table id="shopping-basket" class ="table table-striped table-bordered">
let products_table = document.createElement("table")
products_table.id = "shopping-basket"
products_table.className = "table table-striped table-bordered"

// <tr></tr>
let table_row = document.createElement("tr")
products_table.appendChild(table_row)

// <td>Name</td>
let table_data1 = document.createElement("td")
table_data1.innerHTML = "Name"
table_row.appendChild(table_data1)

// <td>Price</td>
let table_data2 = document.createElement("td")
table_data2.innerHTML = "Price"
table_row.appendChild(table_data2)

// <td>Quantity</td>
let table_data3 = document.createElement("td")
table_data3.innerHTML = "Quantity"
table_row.appendChild(table_data3)

// <td>Total</td>
let table_data4 = document.createElement("td")
table_data4.innerHTML = "Total"
table_row.appendChild(table_data4)


// <button id="checkout-button" type="submit" class="btn btn-success">Checkout</button>
let checkout_button = document.createElement("button")
checkout_button.id = "checkout-button"
checkout_button.type = "submit"
checkout_button.className = "btn btn-success"
checkout_button.innerHTML = "Checkout"

products_table_div.appendChild(products_table)
products_table_div.appendChild(checkout_button)
}
else{
  products_table.remove()
}


if(window.token){
    fetch("http://localhost:8000/cart?format=json",{
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token '+window.token
        }
    }).then(response => response.json()).then(data=>{
        data['items'].forEach(element => {
            let table = document.getElementById("shopping-basket")
            let newRow = document.createElement("tr")
            newRow.id = "current-basket"
            table.appendChild(newRow)

            let name = document.createElement("td")
            name.innerHTML = element['product']
            newRow.appendChild(name)

            let price = document.createElement("td")
            price.innerHTML = element['price']
            newRow.append(price)

            let quantity = document.createElement("td")
            quantity.innerHTML = element['quantity']
            newRow.appendChild(quantity)

            let total = document.createElement("td")
            total.innerHTML = element['quantity']*element['price']
            newRow.appendChild(total)
        })
    })
}
else{
    alert("Please log in to continue")
}
}

let showbb = document.getElementById("cart")
showbb.addEventListener("click", (event)=>{
event.preventDefault()
showBasket()
})

let checkoutbutton = document.getElementById("checkout-button")
checkoutbutton.addEventListener("click", (event)=>{
event.preventDefault()
let sp_addr = document.getElementById("shippping_addr").value
fetch("http://localhost:8000/basket/?format=json", {
    method: 'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+window.token
    },
    body:JSON.stringify( {shipping_addr:sp_addr})
}).then(function(response){
    console.log(response)
    return response.json()
}).then(function(data){
    console.log(data)
})
}, true)
