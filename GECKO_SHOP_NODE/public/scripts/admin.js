let admin_button = document.getElementById("admin-button")
admin_button.addEventListener("click", function(){
  let user = prompt("Username:");
  let pass = prompt("Password:");

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

}, true)
})





/**
  if (result != null)
  {
    let sp_addr = document.getElementById("shippping_addr_input")

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
**/
