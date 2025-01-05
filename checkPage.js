function getDataOfCartCheckout() {
    deletCartCheckout()
    var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"))
    if (listDataOfCart !== null && typeof listDataOfCart == "object") {
        for (i = 0; i < listDataOfCart.length; i++) {
            var itemImage = listDataOfCart[i]["item_Image"]
            var itemName = listDataOfCart[i]["item_Name"]
            var itemPrice = listDataOfCart[i]["item_Price"]
            var itemId = listDataOfCart[i]["item_Id"]
            var amountNumber = listDataOfCart[i]["item_Amount"]
            buildOrderItems(itemId, itemImage, itemName, itemPrice, amountNumber)
        }
    }
}
var applyPromoCodeButton = document.getElementById("applyPromocode")
if (applyPromoCodeButton !== null) {
    applyPromoCodeButton.addEventListener("click", function (event) {
        applyPromoCode()
    })
}
var applyPromoCodeButton = document.getElementById("checkButton")
if (applyPromoCodeButton !== null) {
    applyPromoCodeButton.addEventListener("click", function (event) {
        checkOutOrder()
    })
}
function checkFristTime(user_Id) {
    dataArryusers = JSON.parse(localStorage.getItem("usersArray"));
    for (var i = 0; i < dataArryusers.length; i++) {
        if (dataArryusers[i].id == user_Id) {
            return dataArryusers[i].fristTime
        }
    }
}
function checkOutOrder() {
    if (checkIsUserLogin() == false) {
        var butefelAlert = document.getElementById("butefelAlert")
        butefelAlert.classList.remove("displayNone")
        var butefelAlertPTag = document.querySelector("#butefelAlert > p")
        var butefelAlertText = "You must login to add food to cart"
        butefelAlertPTag.innerText = butefelAlertText

        return
    }
    var user_Id = JSON.parse(localStorage.getItem("currentUser")).id
    // console.log(checkFristTime(user_Id), " test copoAche")
    // console.log(checkUserApplyPromoCode(), " test copoAche")
    if (checkFristTime(user_Id) && !checkUserApplyPromoCode()) {
        var butefelAlert = document.getElementById("butefelAlert")
        var butefelAlertPTag = document.querySelector("#butefelAlert > p")
        var butefelAlertText = "Frist time Take this Promo Code (●'◡'●) \n ajK#12Y"
        butefelAlertPTag.innerText = butefelAlertText
        butefelAlert.classList.remove("displayNone")
        return
    }

    var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"))
    var today = Date()
    var dataOForder = {
        "user_Id": user_Id,
        "orderDate": today,
        "orderItems": listDataOfCart
    }

    console.log(dataOForder)
    var userLogin = JSON.parse(localStorage.getItem("currentUser"));
    var userId = userLogin.id;
    dataArryusers = JSON.parse(localStorage.getItem("usersArray"));
    for (var i = 0; i < dataArryusers.length; i++) {
        if (dataArryusers[i].id == userId) {
            // console.log(dataArryusers[i])
            // console.log(dataArryusers[i].history)
            if (dataArryusers[i].fristTime) {
                dataArryusers[i].fristTime = false
            }
            dataArryusers[i].history.push(dataOForder);
            // console.log(dataArryusers[i].history)
            dataArryusers[i].cart = [];
            localStorage.setItem("usersArray", JSON.stringify(dataArryusers));
             localStorage.setItem("currentUser", JSON.stringify(dataArryusers[i]))
        }
    }

    var butefelAlert = document.getElementById("butefelAlert")
    var butefelAlertPTag = butefelAlert.getElementsByTagName('p')
    var butefelAlertPTag = document.querySelector("#butefelAlert > p")
    var butefelAlertText = "Thank for You (●'◡'●)"
    butefelAlertPTag.innerText = butefelAlertText
    butefelAlert.classList.remove("displayNone")
    localStorage.removeItem("Data_Of_Cart");
    localStorage.removeItem("userApplyPromoCode");
    getCartData()
    getDataOfCartCheckout()
    calculatedTotalPrice()

    // window.location.href = 'menu.html'

}
getDataOfCartCheckout()
function deletCartCheckout() {

    var cartDiv = document.getElementById("checkOutInfoBody")
    if (cartDiv === null) {
        return
    }
    while (cartDiv.hasChildNodes()) {
        cartDiv.removeChild(cartDiv.lastChild)

    }


}
function buildOrderItems(id, imgSrc, nameOfOrder, price, quantity) {
    var checkOutInfoBody = document.getElementById("checkOutInfoBody");
    console.log(checkOutInfoBody)
    if (checkOutInfoBody === null) {
        return
    }
    var orderItem = document.createElement("div");
    orderItem.setAttribute("id", "orderItem");
    orderItem.setAttribute("data-id", id);
    orderItem.setAttribute("data-nameOfOrder", nameOfOrder);
    orderItem.setAttribute("data-price", price);
    orderItem.setAttribute("data-quantity", quantity);
    orderItem.setAttribute("data-imageSrc", imgSrc);
    orderItem.setAttribute("data-totalPrice", quantity * price);
    var orderItemContainer = document.createElement("div");
    orderItemContainer.setAttribute("id", "orderItemContainer");
    var orderItemImage = document.createElement("img");
    orderItemImage.setAttribute("id", "orderItemImage");
    orderItemImage.setAttribute("src", imgSrc);
    orderItemImage.setAttribute("width", "20%");
    var orderItemName = document.createElement("div");
    orderItemName.setAttribute("id", "orderItemName");
    var orderItemNameSpan = document.createElement("span");
    orderItemName.appendChild(orderItemNameSpan);
    var orderItemNameSpanText = document.createTextNode(nameOfOrder);
    orderItemNameSpan.appendChild(orderItemNameSpanText);
    if (nameOfOrder.length > 27) {
        orderItemNameSpan.setAttribute("class", "LongText");
        orderItemNameSpan.addEventListener("mouseover", function () {
            orderItemNameSpan.setAttribute("style", `
                transform: translateX(-100%);
                overflow: visible;
                white-space: nowrap;
                text-overflow: unset;
                cursor: default;
                display: inline-block;
                `);
        })
        orderItemNameSpan.addEventListener("mouseout", function () {
            orderItemNameSpan.setAttribute("style", `
                transition:transform 0s linear 0s;
                transform: translateX(0%);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: default;
                `);
            setTimeout(() => {
                orderItemNameSpan.removeAttribute("style");
            }, 500);
        })
    } else {
        orderItemNameSpan.setAttribute("class", "ShortText");
    }
    var orderItemPrice = document.createElement("div");
    orderItemPrice.setAttribute("id", "orderItemPrice");
    var orderItemPriceText = document.createTextNode("$" + price);
    orderItemPrice.appendChild(orderItemPriceText);
    var orderItemQuantity = document.createElement("div");
    orderItemQuantity.setAttribute("id", "orderItemQuantity");
    var orderItemQuantityText = document.createTextNode(quantity);
    orderItemQuantity.appendChild(orderItemQuantityText);
    var controlItemQuantity = document.createElement("div");
    controlItemQuantity.setAttribute("id", "controlItemQuantity");
    var controlItemQuantityPlus = document.createElement("i");
    controlItemQuantityPlus.setAttribute("class", "fa-solid fa-plus");
    controlItemQuantityPlus.addEventListener("click", function (event) {
        getTotalPrice(event, false)

    })
    controlItemQuantity.appendChild(controlItemQuantityPlus);
    var controlItemQuantityMinus = document.createElement("i");
    controlItemQuantityMinus.setAttribute("class", "fa-solid fa-minus");
    controlItemQuantityMinus.addEventListener("click", function (event) {
        getTotalPrice(event, true)
    })
    controlItemQuantity.appendChild(controlItemQuantityMinus);
    var orderPriceTotal = document.createElement("div");
    orderPriceTotal.setAttribute("id", "orderPriceTotal");
    var calculateTotalPrice = quantity * price;
    var orderPriceTotalText = document.createTextNode("$" + calculateTotalPrice);
    orderPriceTotal.appendChild(orderPriceTotalText);
    var orderItemDelete = document.createElement("div");
    orderItemDelete.setAttribute("id", "orderItemDelete");
    var orderItemDeleteIcon = document.createElement("i");
    orderItemDeleteIcon.setAttribute("class", "fa-solid fa-trash-can");
    orderItemDeleteIcon.addEventListener("click", function (event) {
        deleteItemOfckeckout(event)
    })
    orderItemDelete.appendChild(orderItemDeleteIcon);
    orderItem.appendChild(orderItemContainer);
    orderItemContainer.appendChild(orderItemImage);
    orderItemContainer.appendChild(orderItemName);
    orderItemContainer.appendChild(orderItemPrice);
    orderItemContainer.appendChild(orderItemQuantity);
    orderItemContainer.appendChild(controlItemQuantity);
    orderItemContainer.appendChild(orderPriceTotal);
    orderItemContainer.appendChild(orderItemDelete);
    checkOutInfoBody.appendChild(orderItem);
}
function deleteItemOfckeckout(event) {
    dataId = event.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id")
    deletItemFromCart(dataId)
    getCartData()
    getDataOfCartCheckout()
    calculatedTotalPrice()
}
function getTotalPrice(event, minusOrPlus = false) {
    dataId = event.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id")
    var amountWithIndex = getAmountNumber(dataId, minusOrPlus)
    var amountNumber = amountWithIndex.Amount
    var indexOfObjOfData = amountWithIndex.indexOfObjOfData
    var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"))
    listDataOfCart[indexOfObjOfData]["item_Amount"] = amountNumber
    localStorage.setItem("Data_Of_Cart", JSON.stringify(listDataOfCart))
    getCartData()
    getDataOfCartCheckout()
    calculatedTotalPrice()
}
function calculatedTotalPrice() {
    var checkOutInfoBody = document.getElementById("checkOutInfoBody");
    console.log(checkOutInfoBody)
    if (checkOutInfoBody === null) {
        return
    }
    var totalPriceDiv = document.querySelector("#totalPrice")
    var listDataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"))
    var totalPrice = 0
    var totalQuantity = 0
    var discuntPercentage = 0

    if (listDataOfCart == null || typeof listDataOfCart != "object") {
        listDataOfCart = []

    }
    for (i = 0; i < listDataOfCart.length; i++) {
        var oneObjOfData = listDataOfCart[i]
        var calculateTotalPrice = oneObjOfData["item_Amount"] * oneObjOfData["item_Price"]
        totalPrice += calculateTotalPrice
        totalQuantity += oneObjOfData["item_Amount"]

    }
    console.log(checkUserApplyPromoCode())
    if (checkUserApplyPromoCode()) {

        var userApplyPromoCode = JSON.parse(localStorage.getItem("userApplyPromoCode"))
        discuntPercentage = userApplyPromoCode.promoCodePercentageApply
        console.log(userApplyPromoCode)

        var promocodeResultDiv = document.getElementById("promocodeResult").getElementsByTagName("span")[0]
        var promocodeResultDivText = (userApplyPromoCode.promoCodeApply)
        promocodeResultDiv.innerText = (promocodeResultDivText)
        // promocodeResultDiv.classList.remove("displayNone")

        var discuntPercentageDiv = document.getElementById("discountPercentage")
        discuntPercentageDiv.classList.remove("displayNone")
        var discuntPercentageText = ("-" + discuntPercentage + "%")
        discuntPercentageDiv.innerText = (discuntPercentageText)
        var totalPriceAfterDiscunt = totalPrice - (totalPrice * discuntPercentage / 100)
        var totalPriceRound = Math.round(totalPrice * 100) / 100
        var totalPriceAfterDiscuntRound = Math.round(totalPriceAfterDiscunt * 100) / 100
        var totalPriceRoundText = ("$" + totalPriceRound)
        var totalPriceDivBeforeDiscount = document.getElementById("priceBeforeDiscount")
        totalPriceDivBeforeDiscount.classList.remove("displayNone")
        totalPriceDivBeforeDiscount.innerText = (totalPriceRoundText)
        var totalPriceAfterDiscuntRoundText = ("$" + totalPriceAfterDiscuntRound)
        totalPriceDiv.innerText = (totalPriceAfterDiscuntRoundText)
    } else {
        var promocodeResultDiv = document.getElementById("promocodeResult").getElementsByTagName("span")[0]
        var promocodeResultDivText = "No Promocode Applied"
        promocodeResultDiv.innerText = (promocodeResultDivText)
        var totalPriceRound = Math.round(totalPrice * 100) / 100
        var totalPriceRoundText = ("$" + totalPriceRound)
        totalPriceDiv.innerText = (totalPriceRoundText)
        var discuntPercentageDiv = document.getElementById("discountPercentage")
        var discuntPercentageText = ("0%")
        discuntPercentageDiv.innerText = (discuntPercentageText)
        var totalPriceDivBeforeDiscount = document.getElementById("priceBeforeDiscount")
        var totalPriceDivBeforeDiscountText = ("$" + 0)
        totalPriceDivBeforeDiscount.innerText = (totalPriceDivBeforeDiscountText)

        // totalPriceDivBeforeDiscount.classList.add("displayNone")
        // discuntPercentageDiv.classList.add("displayNone")

        totalPriceDivBeforeDiscount.classList.remove("displayNone")
        discuntPercentageDiv.classList.remove("displayNone")
    }

}
function checkUserApplyPromoCode() {
    var userApplyPromoCode = JSON.parse(localStorage.getItem("userApplyPromoCode"))
    if (userApplyPromoCode !== null) {
        return true
    }
    return false
}
calculatedTotalPrice()
setPromoCodeToLocalStorage("ajK#12Y", 10)
function setPromoCodeToLocalStorage(promoCode, promoCodePercentage) {
    if (localStorage.getItem("PromoCodeList") === null) {
        var PromoCodeList = []
        var objOfPromoCode = {
            "promoCode": promoCode,
            "promoCodePercentage": promoCodePercentage
        }
        PromoCodeList.push(objOfPromoCode)
        localStorage.setItem("PromoCodeList", JSON.stringify(PromoCodeList))
    }
    else {

        var PromoCodeList = JSON.parse(localStorage.getItem("PromoCodeList"))
        for (i = 0; i < PromoCodeList.length; i++) {
            if (PromoCodeList[i]["promoCode"] == promoCode) {
                // PromoCodeList.splice(i, 1)
                // localStorage.setItem("PromoCodeList", JSON.stringify(PromoCodeList))
                return
            }

        }
        var objOfPromoCode = {
            "promoCode": promoCode,
            "promoCodePercentage": promoCodePercentage
        }
        PromoCodeList.push(objOfPromoCode)
        localStorage.setItem("PromoCodeList", JSON.stringify(PromoCodeList))

    }

}
function checkPromoCode(promoCodeUserInput) {
    var PromoCodeList = JSON.parse(localStorage.getItem("PromoCodeList"))
    for (i = 0; i < PromoCodeList.length; i++) {
        if (PromoCodeList[i]["promoCode"] == promoCodeUserInput) {
            return [true, PromoCodeList[i]["promoCodePercentage"]]
        }
    }
    return [false, 0]
}
function applyPromoCode() {
    console.log("applyPromoCode")
    var promoCodeUserInput = document.getElementById("promocodeInput").value
    console.log(checkPromoCode(promoCodeUserInput))

    if (checkPromoCode(promoCodeUserInput)[0]) {
        setpromoCodeUserInputLocalStorage(promoCodeUserInput, 10)
        calculatedTotalPrice()
    }
}
function setpromoCodeUserInputLocalStorage(promoCode, promoCodePercentage) {
    var userApplyPromoCode = {
        "promoCodeApply": promoCode,
        "promoCodePercentageApply": promoCodePercentage
    }
    localStorage.setItem("userApplyPromoCode", JSON.stringify(userApplyPromoCode))
}
// buildOrderItems(1, "home imgs/Burger_With_Neon.jpg", "Order Name", 10, 5)
// buildOrderItems(1, "home imgs/Burger_With_Neon.jpg", "Burger With Neon and Cheese", 8, 2)
// buildOrderItems(1, "home imgs/Burger_With_Neon.jpg", "Burger With Neon and Cheese", 8, 2)
// buildOrderItems(1, "home imgs/Burger_With_Neon.jpg", "Sandwich", 5, 3)
// buildOrderItems(1, "home imgs/Burger_With_Neon.jpg", "Pizza", 6, 4)
// buildOrderItems(1, "home imgs/Burger_With_Neon.jpg", "Order NameOrder NameOrder NameOrameOrder NameOrameOrder NameOrameOrder NameOrder NameOrder NameOr6QnWfncndO8der NameOrder Name", 8, 2)
