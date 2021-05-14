let admin_button = document.getElementById("admin-button")
admin_button.addEventListener("click", function()
{
  let user = prompt("Username:");
  let pass = prompt("Password:");
  let is_admin = "hello"

  fetch("http://localhost:8000/api/users/")
  .then(response => response.json()) // with our response, get the json data returned
  .then(data =>{
      for(var i = 0; i < data.length; i++)
      {
        if(data[i]["username"] === user)
        {
          is_admin = data[i]["is_admin"]
        }
      }
    })


  if(is_admin)
  {
      fetch("http://localhost:8000/token/",
      {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({username:user, password:pass})
      }).then(response => response.json()).then(function(data){
        console.log(data)
        window.token = data['token']



        // ================ Reviews Section =====================
        let reviewHeader = document.getElementById("ReviewHeader")
        reviewHeader.remove()

        let custSatisfaction = document.getElementById("customerSatisfaction")
        custSatisfaction.remove()

        let reviews = document.getElementById("review-row")
        reviews.remove()
        // ========================================================

        // ================ Products Section =====================
        let products = document.getElementById("Products")
        products.remove()

        let products_table = document.getElementById("product-table")
        products_table.remove()
        // ========================================================

        // ================ Products Section =====================
        let contact = document.getElementById("contact-us")
        contact.remove()

        let contactHeader = document.getElementById("getInTouchHeader")
        contactHeader.remove()
        // ========================================================

        let login = document.getElementById("login")
        login.remove()

        // ================ Navbar Section =====================
        let nav_contact = document.getElementById("nav-contact")
        nav_contact.remove()

        let nav_prod = document.getElementById("nav-products")
        nav_prod.remove()

        let nav_reviews = document.getElementById("nav-reviews")
        nav_reviews.remove()
        // ========================================================

        let nav = document.getElementById("navbar-list")
        let orders = document.createElement("li")
        orders.className = "nav-item"

        let orders_text = document.createElement("a")
        orders_text.className = "nav-link"
        orders_text.id = "nav-orders"
        orders_text.style = "color: blue;"
        orders_text.href = "#orders"


        let orders_bold = document.createElement("strong")
        orders_bold.innerHTML = "Orders"
        orders_text.appendChild(orders_bold)
        nav.appendChild(orders_text)

        let loginbtn = document.getElementById("login_button")
        loginbtn.remove()

        let cart = document.getElementById("cart")
        cart.remove()

        let adminbtn = document.getElementById("admin-button")
        adminbtn.remove()

        let navbar = document.getElementById("navbarText")
        let navbar_btn = document.createElement("a")
        navbar_btn.className = "btn btn-danger"
        navbar_btn.id = "admin-logout"
        navbar_btn.href = ""
        navbar_btn.role = "button"
        navbar_btn.style = "margin-left: .5rem; margin-right: .5rem"
        navbar_btn.innerHTML = "Logout"
        navbar.appendChild(navbar_btn)


        let orders_table_div = document.getElementById("orders-table-div")
        let orders_table = document.getElementById("orders")
          let orders_title = document.createElement("h3")
          orders_title.style = "text-align: center"
          orders_title.innerHTML = "Orders <img src=\"http://localhost:3000/images/orders.svg\" style=\"width: 8%; margin-bottom: 0.5rem;\" alt=\"shopping bag icon\">"
          orders_table_div.appendChild(orders_title)

        if(orders_table == null)
        {
        // <table id="orders" class ="table table-striped table-bordered">
        let orders_table = document.createElement("table")
        orders_table.id = "orders"
        orders_table.className = "table table-striped table-bordered"

        // <tr></tr>
        let table_row = document.createElement("tr")
        orders_table.appendChild(table_row)

        // <td>Name</td>
        let table_data1 = document.createElement("td")
        table_data1.innerHTML = "<strong>User</strong>"
        table_row.appendChild(table_data1)

        // <td>Price</td>
        let table_data2 = document.createElement("td")
        table_data2.innerHTML = "<strong>Shipping Address</strong>"
        table_row.appendChild(table_data2)

        // <td>Quantity</td>
        let table_data3 = document.createElement("td")
        table_data3.innerHTML = "<strong>Date Ordered</strong>"
        table_row.appendChild(table_data3)

        orders_table_div.appendChild(orders_table)
        }

        fetch("http://localhost:8000/api/orders/?format=json") // make a request
        .then(response => response.json()) // with our response, get the json data returned
        .then(data =>{
            data.forEach(element =>{
                let table = document.getElementById("orders") // Fetch the table above
                let newRow = document.createElement("tr") // Add in a row <tr></tr>
                table.appendChild(newRow) // Add the new row to table

                let user = document.createElement("td")
                fetch(element["user_id"]).then(response => response.json()).then(data => user.innerHTML = data["username"])
                user.innerHTML = element["user_id"]
                newRow.appendChild(user)

                let shipping_addr = document.createElement("td") // Create <td>Inner html</td>
                shipping_addr.innerHTML = element["shipping_addr"]
                newRow.appendChild(shipping_addr)

                let date_created = document.createElement("td")
                date_created.innerHTML = element["date_created"]
                newRow.appendChild(date_created)


            });
        }); // log the json data

  }, true)
  }
  else {
    alert("Oops!! Unauthorized Access")
    window.location.reload()
  }

})
