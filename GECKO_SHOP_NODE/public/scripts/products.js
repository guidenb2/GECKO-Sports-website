fetch("http://localhost:8000/api/products/?format=json") // make a request
.then(response => response.json()) // with our response, get the json data returned
.then(data =>{
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
window.token = data['token']

window.location.hash = "#carousel"

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

products_table_div.appendChild(products_table)
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
checkout()
checkoutClick()
})


function checkout()
{
  let checkout_btn = document.getElementById("checkout-button")
  let products_table_div = document.getElementById("shopping-cart")

  if(checkout_btn == null)
  {
    // <button id="checkout-button" type="submit" class="btn btn-success">Checkout</button>
    let checkout_button = document.createElement("button")
    checkout_button.id = "checkout-button"
    checkout_button.type = "submit"
    checkout_button.className = "btn btn-success"
    checkout_button.innerHTML = "Checkout"

    products_table_div.appendChild(checkout_button)
  }
  else {
  checkout_btn.remove()
  }
}

function checkoutClick() {
  let checkoutbutton = document.getElementById("checkout-button")
  let products_table_div = document.getElementById("shopping-cart")


  checkoutbutton.addEventListener("click", (event)=>{
  event.preventDefault()

  let checkform = document.getElementById("checkout-form")

  if(checkform == null)
  {

    // <form id="checkout-form" method="POST", action=".">
    let form = document.createElement("form")
    form.id = "checkout-form"
    form.method = "POST"
    form.action = "."
    products_table_div.appendChild(form)

    // ================ CUSTOMER NAME ==========================
    // <label>Full Name:</label>
    let cust_name = document.createElement("label")
    cust_name.innerHTML = "Full Name: "
    form.appendChild(cust_name)

    // <input type="text" placeholder="Full Name" id="customer_name">
    let cust_form_in = document.createElement("input")
    cust_form_in.type = "text"
    cust_form_in.placeholder = "Full Name"
    cust_form_in.id = "customer_name"
    form.appendChild(cust_form_in)
    // =========================================================

    let br2 = document.createElement("br")
    form.appendChild(br2)

    // ================ SHIPPING ADDRESS ==========================
    // <label for="shipping_addr">Shipping Address:</label>
    let form_label = document.createElement("label")
    form_label.for = "shipping_addr"
    form_label.innerHTML = "Shipping Address: "
    form.appendChild(form_label)

    // <input type="text" name="shippping_addr" placeholder="Shipping address" id="shippping_addr">
    let form_input = document.createElement("input")
    form_input.type = "text"
    form_input.name = "shippping_addr"
    form_input.placeholder = "Shipping address"
    form_input.id = "shippping_addr_input"
    form.appendChild(form_input)
    // =========================================================

    let br3 = document.createElement("br")
    form.appendChild(br3)

    // ================ PHONE NUMBERS ==========================
    // <label>Phone Number:</label>
    let cust_ph = document.createElement("label")
    cust_ph.innerHTML = "Phone Number: "
    form.appendChild(cust_ph)

    // <input type="text" placeholder="Phone Number" id="customer_phone">
    let cust_form_in2 = document.createElement("input")
    cust_form_in2.type = "text"
    cust_form_in2.placeholder = "Phone Number"
    cust_form_in2.id = "customer_phone"
    form.appendChild(cust_form_in2)
    // =========================================================

}
else {
  let result = confirm("Do you wish to complete you order?")
  let sp_addr = document.getElementById("shippping_addr_input")

  if (result != null)
  {
    let sp_addr = document.getElementById("shippping_addr_input").value

    console.log(sp_addr)
    fetch("http://localhost:8000/basket/?format=json",
    {
        method: 'POST',
        headers:
        {
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

    alert("Thank you for your order!! Your order will be finalised soon!!")
  }
}

})
}
