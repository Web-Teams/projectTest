
function displaySearch() {
    document.getElementById("searchContainer").classList.toggle("visibleSearch")
    searchRequest()
}

var searchReq = new XMLHttpRequest()
var listOfSearch;

function searchRequest() {

    searchReq.open("get", "Data\\MenuAll.json")
    searchReq.send()

    searchReq.onreadystatechange = function () {

        if (searchReq.readyState === 4 && searchReq.status == 200) {

            //convert the json file
            JSON.parse(searchReq.responseText)

            listOfSearch = JSON.parse(searchReq.responseText)["record"];


            console.log(searchReq.readyState, "test ")

            createSearchOutput(listOfSearch)

        }


    }

}


function createSearchOutput(listOfAyHaga) {

    for (i = 0; i < listOfAyHaga.length; i++) {
        // define the created element
        var firstElementParent = document.getElementById("containCreatedElementsSearch")
        var createFirstParent = document.createElement("div")
        createFirstParent.setAttribute("class", "searchContentContainer")

        // change style to pointer
        createFirstParent.setAttribute("style", " cursor: pointer;")

        // create data- attribute
        createFirstParent.setAttribute("data-id", listOfAyHaga[i].id)
        createFirstParent.setAttribute("data-Img", listOfAyHaga[i].image)
        createFirstParent.setAttribute("data-Title", listOfAyHaga[i].title)
        createFirstParent.setAttribute("data-Description", listOfAyHaga[i].description)
        createFirstParent.setAttribute("data-Price", listOfAyHaga[i].price)

        //add event listener

        createFirstParent.addEventListener("click", function (event) {

            var popUpGrandContainer = document.getElementsByClassName("searchPopUpGrandContainer")
            [0]

            // close the popUp
            popUpGrandContainer.classList.toggle("visibleSearch")

            //pop up img
            var popUpImg = popUpGrandContainer.getElementsByClassName("searchPopUpImg")[0]

            //   console.log(listOfAyHaga[i])
            var elememtPop = event.currentTarget

            console.log(elememtPop)
            console.log(elememtPop.getAttribute("data-Img"))


            popUpImg.setAttribute("src", elememtPop.getAttribute("data-Img"))

            //   console.log(i)

            //pop up title
            var popUpTitle = popUpGrandContainer.getElementsByClassName("searchPopUpTitle")[0]
            popUpTitle.innerHTML = elememtPop.getAttribute("data-Title")

            //pop up description
            var popUpDescription = popUpGrandContainer.getElementsByClassName("searchPopUpDescription")[0]
            popUpDescription.innerHTML = elememtPop.getAttribute("data-Description")

            //pop up price
            var popUpPrice = popUpGrandContainer.getElementsByClassName("searchPopUpPrice")[0]
            popUpPrice.innerHTML = elememtPop.getAttribute("data-Price")

            var addToCartBtn = document.getElementById("addCartBtnForSearch")
            // console.log(addToCartBtn, " here 1")
            addToCartBtn.setAttribute("data-id", elememtPop.getAttribute("data-id"))
            addToCartBtn.setAttribute("data-Img", elememtPop.getAttribute("data-Img"))
            addToCartBtn.setAttribute("data-Title", elememtPop.getAttribute("data-Title"))
            addToCartBtn.setAttribute("data-Description", elememtPop.getAttribute("data-Description"))
            addToCartBtn.setAttribute("data-Price", elememtPop.getAttribute("data-Price"))




        })


        firstElementParent.appendChild(createFirstParent)

        var parentWithImg = document.createElement("div")
        parentWithImg.setAttribute("class", "searchDescriptionWImg")

        createFirstParent.appendChild(parentWithImg)

        var searchImg = document.createElement("img")

        searchImg.setAttribute("class", "searchImg")
        searchImg.setAttribute("src", listOfAyHaga[i].image)

        parentWithImg.appendChild(searchImg)

        var parentOfTitlePrice = document.createElement("div")
        parentOfTitlePrice.setAttribute("class", "searchTitlePriceContainer")

        parentWithImg.appendChild(parentOfTitlePrice)


        var sectionSearch = document.createElement("section")
        sectionSearch.setAttribute("class", "searchTitle")
        sectionSearch.innerText = listOfAyHaga[i].title

        parentOfTitlePrice.appendChild(sectionSearch)

        var searchPrice = document.createElement("p")
        searchPrice.setAttribute("class", "searchPrice")

        searchPrice.innerText = listOfAyHaga[i].price + " $"

        parentOfTitlePrice.appendChild(searchPrice)

    }

}

function closePopUp() {

    document.getElementsByClassName("searchPopUpGrandContainer")
    [0].classList.add("visibleSearch")

}

function searchInputWords(txt) {

    var arrayOfSelectedSearch = [];

    for (i = 0; i < listOfSearch.length; i++) {

        var listOfSearchOfI = listOfSearch[i]

        var searchLoopTitle = listOfSearchOfI.title.toLowerCase()

        var selectValue = document.getElementById("selectCategoryId").value

        if (selectValue == "All") {

            if (searchLoopTitle.includes(txt.toLowerCase())) {

                arrayOfSelectedSearch.push(listOfSearchOfI)

            }
        }

        else {

            if (searchLoopTitle.includes(txt.toLowerCase()) && listOfSearchOfI.category == selectValue) {
                arrayOfSelectedSearch.push(listOfSearchOfI)


            }
        }

    }




    deleteCreatedElements()
    createSearchOutput(arrayOfSelectedSearch)


}





function deleteCreatedElements() {
    var list = document.getElementById("containCreatedElementsSearch");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

