// getting request
var categoryTypeReq = new XMLHttpRequest()


function activeDeactive(elem) {
    if (elem) {
        document.getElementsByClassName("menuButton-active")[0].classList.remove("menuButton-active")
        elem.classList.add("menuButton-active")
    }

}
function changeRequestDesert(elem) {

    activeDeactive(elem)

    //    document.getElementsByClassName("menuButton")[3].classList.add("menuButton-active")

    //    document.getElementsByClassName("menuButton")[0].classList.remove("menuButton-active")
    //    document.getElementsByClassName("menuButton")[1].classList.remove("menuButton-active")
    //    document.getElementsByClassName("menuButton")[2].classList.remove("menuButton-active")


    counter = 0
    getdotsToDelete()
    // document.createElement("img").setAttribute("src", "")

    // buildPageWithData("https://api.jsonbin.io/v3/b/6779a342acd3cb34a8c42963")
    buildPageWithData("Data\\Desserts.json")
}

function changeRequestBeverages(elem) {
    activeDeactive(elem)

    // document.getElementsByClassName("menuButton")[2].classList.add("menuButton-active")

    // document.getElementsByClassName("menuButton")[0].classList.remove("menuButton-active")
    //    document.getElementsByClassName("menuButton")[1].classList.remove("menuButton-active")
    //    document.getElementsByClassName("menuButton")[3].classList.remove("menuButton-active")

    counter = 0
    getdotsToDelete()
    buildPageWithData("Data\\Beverages.json")

    // buildPageWithData("https://api.jsonbin.io/v3/b/6779a318ad19ca34f8e5a827")
}

function changeRequestApetizers(elem) {
    activeDeactive(elem)

    // document.getElementsByClassName("menuButton")[1].classList.add("menuButton-active")

    // document.getElementsByClassName("menuButton")[0].classList.remove("menuButton-active")
    //    document.getElementsByClassName("menuButton")[2].classList.remove("menuButton-active")
    //    document.getElementsByClassName("menuButton")[3].classList.remove("menuButton-active")

    counter = 0
    getdotsToDelete()
    buildPageWithData("Data\\Appetizers.json")

    // buildPageWithData("https://api.jsonbin.io/v3/b/6779a32facd3cb34a8c4295e")
}

function changeRequestMainCourse(elem) {
    // document.getElementsByClassName("menuButton")[0].classList.add("menuButton-active")

    // document.getElementsByClassName("menuButton")[1].classList.remove("menuButton-active")
    //    document.getElementsByClassName("menuButton")[2].classList.remove("menuButton-active")
    //    document.getElementsByClassName("menuButton")[3].classList.remove("menuButton-active")
    activeDeactive(elem)

    counter = 0
    getdotsToDelete()
    buildPageWithData("Data\\Main_Courses.json")

    // buildPageWithData("https://api.jsonbin.io/v3/b/6779a2fbacd3cb34a8c42950")
}


changeRequestMainCourse()





function getdotsToDelete() {

    //   deletedDots=  document.getElementsByClassName("dot")
    // for( i=0;i<deletedDots.length;i++){
    //     deletedDots[i].remove()
    // }


    const list = document.getElementById("dotMenuBag");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

var counter = 0
var listOfCategoryTypeItems;

function buildPageWithData(urlRequest) {
    categoryTypeReq.open("get", urlRequest,)
    //sending request
    categoryTypeReq.send()
    //onreadychange



    categoryTypeReq.onreadystatechange = function () {

        if (categoryTypeReq.readyState === 4 && categoryTypeReq.status == 200) {

            //convert the json file
            JSON.parse(categoryTypeReq.responseText)

            listOfCategoryTypeItems = JSON.parse(categoryTypeReq.responseText)["record"];


            console.log(categoryTypeReq.readyState, "test ")


            moveWith()
            nextTo()

        }

        // console.log(JSON.parse(categoryTypeReq.responseText)
        //  ["record"] [0] ["title"])
    }
}

function nextTo() {
    if (counter > listOfCategoryTypeItems.length - 1) {
        return
    }

    for (var i = 0; i < 4; i++) {

        // listOfCategoryTypeItems[counter]["title"]
        if (counter > listOfCategoryTypeItems.length - 1) {
            document.querySelectorAll(".menuItemsDetails")[i].setAttribute("style", "display:none;")
            // document.querySelectorAll(".menuItemsDetails")[2].setAttribute("style", "display:none;")
            // document.querySelectorAll(".menuItemsDetails")[3].setAttribute("style", "display:none;")

            counter++;

        } else {
            document.querySelectorAll(".menuItemsDetails")[i].setAttribute("style", "display:inline-block;")
            document.querySelectorAll(".menuItemsDetails")[i].setAttribute("data-idOfItem", listOfCategoryTypeItems[counter]["id"])

            document.querySelectorAll(".menuItemsDetails h2")[i].innerText = listOfCategoryTypeItems[counter]["title"]

            document.querySelectorAll(".description")[i].innerText = listOfCategoryTypeItems[counter]["description"]

            document.querySelectorAll(".menuItemsDetails p")[i].innerText = listOfCategoryTypeItems[counter]["price"] + " $"

            document.querySelectorAll(".menuItemsDetails img")[i].src = listOfCategoryTypeItems[counter]["image"]
            counter++;
        }
    }


    var dotLoop = Math.ceil(listOfCategoryTypeItems.length / 4)

    for (i = 1; i <= dotLoop; i++) {
        if (counter / 4 == i) {
            document.getElementById("dot" + i).classList.add("actve")
        } else {
            document.getElementById("dot" + i).classList.remove("actve")
        }

    }
    //  document.querySelector("div.dot").classList.add("actve")

    // if (counter == 4) {
    //     var activeDot = document.getElementById("dot1")
    //     var activeDotpre = document.getElementById("dot2")
    //     activeDot.classList.add("actve")
    //     // activeDotpre.classList.remove("actve")




    // }

    // else if (counter === 8) {
    //     activeDot = document.getElementById("dot2")     
    //     activeDot.classList.add("actve")
    //     document.querySelector("div #dot1").classList.remove("actve")

    // }

    // else if (counter === 12) {
    //     activeDot = document.getElementById("dot3")
    //     activeDot.classList.add("actve")
    //     document.querySelector("div #dot2").classList.remove("actve")


    // }

    // else if (counter === 16) {
    //     activeDot = document.getElementById("dot4")
    //     activeDot.classList.add("actve")
    //     document.querySelector("div #dot3").classList.remove("actve")

    // }

    // else if (counter === 20) {
    //     activeDot = document.getElementById("dot5")
    //     activeDot.classList.add("actve")
    //     document.querySelector("div #dot4").classList.remove("actve")

    // }

}

// watingData()
// function watingData() {
//     if (listOfCategoryTypeItems == undefined) {

//         console.log("watingYourData......")

//         setTimeout(watingData, 500)
//     }
//     else {

//         moveWith()
//         nextTo()
//         console.log(listOfCategoryTypeItems)

//     }
// }

console.log(listOfCategoryTypeItems)


function backTo() {
    if (counter < 8) {
        return
    }
    counter -= 8
    nextTo()


    // if (counter==20 ){
    //     var activeDot= document.getElementById("dot5")
    //         activeDot.classList.add("actve") 
    //         // document.querySelector("div #dot4").classList.remove("actve")



    //     }

    //     else if (counter===16){
    //          activeDot= document.getElementById("dot4")
    //             activeDot.classList.add("actve")
    //             document.querySelector("div #dot5").classList.remove("actve")

    //       }

    //   else if (counter===12){
    //      activeDot= document.getElementById("dot3")
    //         activeDot.classList.add("actve")
    //         document.querySelector("div #dot4").classList.remove("actve")


    //   }

    //   else if (counter===8){
    //      activeDot= document.getElementById("dot2")
    //         activeDot.classList.add("actve")
    //         document.querySelector("div #dot3").classList.remove("actve")

    //   }

    //   else if (counter===4){
    //      activeDot= document.getElementById("dot1")
    //         activeDot.classList.add("actve")
    //         document.querySelector("div #dot2").classList.remove("actve")

    //   }



    // نقص 8 وزود 4 ف نفس الوقت 
}

var dotContainer = document.getElementById("dotMenuBag")


function moveWith() {


    var dotLoop = Math.ceil(listOfCategoryTypeItems.length / 4)
    console.log(dotLoop, " dotLoop")

    for (i = 1; i <= dotLoop; i++) {

        var createdDiv = document.createElement("div")

        createdDiv.setAttribute("class", "dot")

        createdDiv.setAttribute("id", "dot" + [i])

        dotContainer.appendChild(createdDiv)


    }
    //     
    //   activeDot.classlist.add("actve")

}








