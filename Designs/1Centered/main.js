/**
 * Document imports
 */
const results = document.getElementById("results")
const cathegorys = document.getElementById("cathegorys")
const cathegory = document.querySelectorAll('.cathegory');
const categoryIcon = document.querySelectorAll('.categoryIcon')

/**
 * General Variables
 */
let currentNavBarStatus = 0 //0=expandet 1=small


//NavBar Expantion
function checkIfResultsExist(){
    if(results.innerHTML.trim().length === 0){
        currentNavBarStatus = 0
    }else{
        currentNavBarStatus = 1
    }
    updateNavBarStatus()
}

function updateNavBarStatus(){
    if (currentNavBarStatus === 1){
        console.log("small");
        categoryIcon.forEach(element => {
            element.style.transform = "scale(0.8)"
        })
        cathegory.forEach(element => {
            element.style.width = "70px"
            element.style.height = "40px"
        })
        cathegorys.style.gap = "2px"
        cathegorys.style.gridTemplateColumns = "repeat(4, 80px)"
    }else{

        console.log("small");
        categoryIcon.forEach(element => {
            element.style.transform = "scale(3)"
        })
        cathegory.forEach(element => {
            element.style.width = "200px"
            element.style.height = "200px"
        })
        cathegorys.style.gap = "30px"
        cathegorys.style.gridTemplateColumns = "repeat(4, 200px)"
    }
}

function generateEntries(){
    let string = ""
    for(let i = 0;i<10;i++){
        string+="<div class='resultBox'>data</div>"
    }
    results.innerHTML = string
    checkIfResultsExist()
}