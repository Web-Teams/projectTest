
function removeButfelAlert() {
    const alertBox = document.getElementById('butefelAlert');
    if (alertBox) {
        var butefelAlert = document.getElementById("butefelAlert")
        butefelAlert.classList.add("displayNone")
    }
}
document.getElementById("addCartBtnForSearch").addEventListener("click", checkBeforAddData)
function checkBeforAddData(event) {
    var btnWithData = event.currentTarget
    var dataId = btnWithData.getAttribute("data-id")
    var dataImg = btnWithData.getAttribute("data-Img")
    var dataTitle = btnWithData.getAttribute("data-Title")
    var dataDescription = btnWithData.getAttribute("data-Description")
    var dataPrice = btnWithData.getAttribute("data-Price")
    if (dataId !== null) {
        if (dataImg !== null) {
            if (dataTitle !== null) {
                if (dataDescription !== null) {
                    if (dataPrice !== null) {
                        addItemsTolocalStorge(
                            dataId,
                            dataImg,
                            dataTitle,
                            dataPrice,
                            dataDescription
                        )
                    }
                }
            }
        }
    }
}

var cart = document.getElementById("cart1")

function toggleCart() {


    getCartData()
    getDataOfCartCheckout()
    calculatedTotalPrice()

    cart.classList.toggle("visiblity")

}

function removecart() {

    cart.classList.remove("visiblity")

}


function addItemsTolocalStorge(Iditem, imageItem, nameItem, priceItem, descriptionItem) {
    if (checkIsUserLogin() == false) {
        var butefelAlert = document.getElementById("butefelAlert")
         var butefelAlertPTag = document.querySelector("#butefelAlert > p")
        var butefelAlertText = "You must login to add food to cart"
        butefelAlertPTag.innerText = butefelAlertText
        butefelAlert.classList.remove("displayNone")
        return
    }
    if (localStorage.getItem("Data_Of_Cart") === null) {
        var listDataOfCart = []

    }

    else {

        var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"))

    }

    var item_AmountAndIndex = getAmountNumber(Iditem)
    var objOfData =
    {
        "item_Id": Iditem,
        "item_Image": imageItem,

        "item_Name": nameItem,
        "item_Amount": item_AmountAndIndex.Amount,

        "item_Price": priceItem,

        "item_description": descriptionItem

    }
    console.log(item_AmountAndIndex, "tets Index")
    if (item_AmountAndIndex.Amount == 1) {
        listDataOfCart.push(objOfData)
    } else {
        listDataOfCart[item_AmountAndIndex.indexOfObjOfData] = objOfData;
    }

    localStorage.setItem("Data_Of_Cart", JSON.stringify(listDataOfCart))
    console.log(listDataOfCart)

    getCartData()
    getDataOfCartCheckout()
    calculatedTotalPrice()

}
function checkIsUserLogin() {
    var flagCurrentUser = JSON.parse(localStorage.getItem("FlagCurrentUser"))
    if (flagCurrentUser) {
        return true
    }
    return false
}
function addCardItems(num) {

    if (checkIsUserLogin() == false) {
        var butefelAlert = document.getElementById("butefelAlert")
        butefelAlert.classList.remove("displayNone")
        return
    }
    var mainElement = document.getElementsByClassName("menuItemsDetails")[num]

    var itemId = mainElement.getAttribute("data-idOfItem")
    var imageitem = mainElement.getElementsByClassName("itemImage")[0].src
    var nameitem = mainElement.getElementsByTagName("h2")[0].innerText
    var priceitem = mainElement.getElementsByTagName("p")[0].innerText
    priceitem = priceitem.split(" ")[0]
    var descriptionitem = mainElement.getElementsByClassName("description")[0].innerText


    addItemsTolocalStorge(itemId, imageitem, nameitem, priceitem, descriptionitem)
    // localStorage.setItem("item_Image", image)

    // localStorage.setItem("item_Name", name)

    // localStorage.setItem("item_Price", price)

    // localStorage.setItem("item_description", description)




    //     // console.log(price)
    //     // console.log(price.split(" "))
    //     // console.log(price.split(" ")[0])
    //  console.log(localStorage.getItem("item_Image"))
    //     console.log(localStorage.getItem("item_Name"))
    //     console.log(localStorage.getItem("item_Price"))
    // console.log(localStorage.getItem("item_description"))










}

// function checkFoundItem() {

// }
function deletItemFromCart(idOfItem) {

    var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"));
    for (var i = 0; i < listDataOfCart.length; i++) {
        var oneObjOfData = listDataOfCart[i]
        if (oneObjOfData["item_Id"] == idOfItem) {
            listDataOfCart.splice(i, 1);
            localStorage.setItem("Data_Of_Cart", JSON.stringify(listDataOfCart))
        }
    }
}
function getAmountNumber(idOfitem, minusFlag = false) {
    if (localStorage.getItem("Data_Of_Cart") === null) {
        var amountWithIndexNaN = {
            Amount: 1,
            indexOfObjOfData: NaN
        }
        return amountWithIndexNaN;
    }

    else {

        var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"));
        for (var i = 0; i < listDataOfCart.length; i++) {
            var oneObjOfData = listDataOfCart[i]
            if (oneObjOfData["item_Id"] == idOfitem) {
                var oldAmount = parseInt(oneObjOfData["item_Amount"])
                if (minusFlag) {
                    var newAmount = oldAmount - 1;
                    if (newAmount == 0) {
                        newAmount = 1;
                    }
                    var amountWithIndex = {
                        Amount: newAmount,
                        indexOfObjOfData: i
                    }

                } else {
                    var newAmount = oldAmount + 1;
                    var amountWithIndex = {
                        Amount: newAmount,
                        indexOfObjOfData: i
                    }
                }

                return amountWithIndex;
            }
        }

        var amountWithIndexNaN = {
            Amount: 1,
            indexOfObjOfData: NaN
        }
        return amountWithIndexNaN;

    }

}

function builedCart(imageSrc, nameText, priceText, item_Id, amountNumber) {
    //     <div class="cartItemsContainer">
    //     <div class="cartItem" data-id="25">
    //       <img class="myitemImage" src="./home imgs/Burger_With_Neon.jpg" alt="">
    //       <p class="itemName">Burger Name</p>

    //       <div class="plusAndMinus">
    //         <i class="fa-solid fa-plus"></i>
    //         <p class="amount"> 1 </p>
    //         <i class="fa-solid fa-minus"></i>
    //       </div>
    //       <p class="itemPrice">500 $</p>
    //       <button class="deleteItem"><i class="fa-solid fa-xmark"></i></button>
    //     </div>
    //   </div>

    var cartDiv = document.getElementById("cartBody")


    var cartItemsContainer = document.createElement("div")
    cartItemsContainer.setAttribute("class", "cartItemsContainer")

    var cartItem = document.createElement("div")
    cartItem.setAttribute("class", "cartItem")
    cartItem.setAttribute("data-idOfItem", item_Id)


    // var itemDiv = document.createElement("div")

    // itemDiv.setAttribute("class", "firstItem")



    var itemImage = document.createElement("img")

    itemImage.setAttribute("class", "myitemImage")

    itemImage.setAttribute("src", imageSrc)

    itemImage.setAttribute("alt", "Falied to Load Image")




    var itemName = document.createElement("p")

    itemName.setAttribute("class", "itemName")

    var textNodeBurgerName = document.createTextNode(nameText)

    itemName.appendChild(textNodeBurgerName)



    //       <div class="plusAndMinus">
    //         <i class="fa-solid fa-plus"></i>
    //         <p class="amount"> 1 </p>
    //         <i class="fa-solid fa-minus"></i>
    //       </div>
    //       <p class="itemPrice">500 $</p>
    //       <button class="deleteItem"><i class="fa-solid fa-xmark"></i></button>
    //     </div>
    //   </div>
    var plusAndMinus = document.createElement("div")
    plusAndMinus.setAttribute("class", "plusAndMinus")


    var plusButton = document.createElement("i")
    plusButton.setAttribute("class", "fa-solid fa-plus")
    plusAndMinus.appendChild(plusButton)
    plusButton.addEventListener("click", function (event) {
        dataId = event.currentTarget.parentElement.parentElement.getAttribute("data-idOfItem")
        var amountWithIndex = getAmountNumber(dataId)
        var amountNumber = amountWithIndex.Amount
        var indexOfObjOfData = amountWithIndex.indexOfObjOfData
        var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"))
        listDataOfCart[indexOfObjOfData]["item_Amount"] = amountNumber
        localStorage.setItem("Data_Of_Cart", JSON.stringify(listDataOfCart))
        getCartData()
        getDataOfCartCheckout()
    })

    var amount = document.createElement("p")
    amount.setAttribute("class", "amount")
    var textNodeAmount = document.createTextNode(amountNumber)
    amount.appendChild(textNodeAmount)
    plusAndMinus.appendChild(amount)

    var minusButton = document.createElement("i")
    minusButton.setAttribute("class", "fa-solid fa-minus")
    plusAndMinus.appendChild(minusButton)
    minusButton.addEventListener("click", function (event) {
        dataId = event.currentTarget.parentElement.parentElement.getAttribute("data-idOfItem")
        var amountWithIndex = getAmountNumber(dataId, true)
        var amountNumber = amountWithIndex.Amount
        var indexOfObjOfData = amountWithIndex.indexOfObjOfData
        var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"))
        listDataOfCart[indexOfObjOfData]["item_Amount"] = amountNumber
        localStorage.setItem("Data_Of_Cart", JSON.stringify(listDataOfCart))
        getCartData()
        getDataOfCartCheckout()
    })

    var itemPrice = document.createElement("p")
    itemPrice.setAttribute("class", "itemPrice")
    var calculatedPrice = priceText * amountNumber
    var textNodeItemPrice = document.createTextNode(calculatedPrice + " $")
    itemPrice.appendChild(textNodeItemPrice)

    var deleteItem = document.createElement("button")
    deleteItem.setAttribute("class", "deleteItem")

    deleteItem.addEventListener("click", function (event) {
        dataId = event.currentTarget.parentElement.getAttribute("data-idOfItem")
        deletItemFromCart(dataId)
        getCartData()
        getDataOfCartCheckout()
    })

    var deleteItemIcon = document.createElement("i")
    deleteItemIcon.setAttribute("class", "fa-solid fa-xmark")
    deleteItem.appendChild(deleteItemIcon)


    var horizentalLine = document.createElement("hr")


    cartDiv.appendChild(cartItemsContainer)

    cartItemsContainer.appendChild(cartItem)

    cartItem.appendChild(itemImage)

    cartItem.appendChild(itemName)
    cartItem.appendChild(plusAndMinus)
    cartItem.appendChild(itemPrice)

    cartItem.appendChild(deleteItem)


    cartDiv.appendChild(horizentalLine)


}


function getCartData() {
    deletCard()
    var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"))
    if (listDataOfCart !== null) {

        for (i = 0; i < listDataOfCart.length; i++) {

            var itemImage = listDataOfCart[i]["item_Image"]

            var itemName = listDataOfCart[i]["item_Name"]

            var itemPrice = listDataOfCart[i]["item_Price"]

            var itemId = listDataOfCart[i]["item_Id"]

            var amountNumber = listDataOfCart[i]["item_Amount"]

            builedCart(itemImage, itemName, itemPrice, itemId, amountNumber)
        }

    }
}


function deletCard() {

    var cartDiv = document.getElementById("cartBody")

    while (cartDiv.hasChildNodes()) {
        cartDiv.removeChild(cartDiv.lastChild)

    }


}
