if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

var totalAmount = "0,00"

function ready() {
const productRemove = document.getElementsByClassName("product-remove")
for (var i = 0; i < productRemove.length; i++) {
    productRemove[i].addEventListener("click", removeProduct)
    }

    const quantityInput = document.getElementsByClassName("product-qtd")
    for (var i = 0; i < quantityInput.length; i++) {
        quantityInput[i].addEventListener("change", checkIfInputIsNull)
    }

    /*
    const addToCartButtons = document.getElementsByClassName("carrinho")
    for (var i = 0; i < addToCartButtons.length; i++) {
       addToCartButtons[i].addEventListener("click", addProductToCart)
   }
    console.log(addToCartButtons)
   */

    const buttonFinalizar = document.getElementsByClassName("button-finalizar")[0]
    buttonFinalizar.addEventListener("click", makePurchase)
}

function makePurchase() {
    if (totalAmount == "0,00") {
        alert("Não há nenhum produto em seu carrinho ainda!")
    } else {
        alert(
        `
        Obrigado pela sua compra!
        Valor total do seu pedido: R$${totalAmount}
        Volte sempre!!
        `
        )
    }

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}

function checkIfInputIsNull(event) {
    if (event.target.value == "0") {
        event.target.parentElement.parentElement.remove()
    }
    
    updateTotal()
}

function addProductToCart(event) {
    const button = event.target
    const productInfo = button.parentElement.parentElement
    const prodcutImage = productInfo.getElementsByClassName("produto")[0].src
    const productTitle = productInfo.getElementsByClassName(".product-card h2")[0].innerText
    const productPrice = productInfo.getElementsByClassName("preco")[0].innerText

    const nameProduct = document.getElementsByClassName("product-cart-title")
    for (var i = 0; i < nameProduct.length; i++) {
        if (nameProduct[i].innerText == productTitle){
        nameProduct[i].parentElement.parentElement.getElementsByClassName("product-qtd")[0].value++
        return
        }
        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("product-cart")

    newCartProduct.innerHTML = 
    `
                <td class="product-identification">
                        <img class="product-cart-image" src="${prodcutImage}" alt="${productTitle}">
                        <strong class="product-cart-title">${productTitle}</strong>
                    </td>
                    <td>
                        <span class="cart-price">${productPrice}</span>
                    </td>
                    <td>
                        <input class="product-qtd" type="number" value="1" min="0">
                        <button class="product-remove" type="button">Remover</button>
                </td>
    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)

    updateTotal()

    newCartProduct.getElementsByClassName("product-qtd")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("product-remove")[0].addEventListener("click", removeProduct)


function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal() {
totalAmount = 0
const cartProduct = document.getElementsByClassName("cart-product")
for (var i = 0; i < cartProduct.length; i++) {
    //console.log(cartProduct[i])
    const productPrice = cartProduct[i].getElementsByClassName("cart-price")[0].innerText.replace("R$", "").replace(",", ".")
    const productQuantity = cartProduct[i].getElementsByClassName("product-qtd")[0].value

    totalAmount += productPrice * productQuantity
}

totalAmount = totalAmount.toFixed(2)
totalAmount = totalAmount.replace(".", ",")
document.querySelector(".cart-total span").innerText = "R$" + totalAmount
}
