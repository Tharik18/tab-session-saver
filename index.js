let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
// let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
// console.log(leadsFromLocalStorage)
/*using truthy or falsy to make it store in localstorage ex:myleads has some values means it is
truthy if not its falsy it will return null*/

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})
/*we are creating renderleads function to get user input and push int myLeads Array and
appear them in inputEl*/

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
         // ulEl.textContent += myLeads[i]+" " replace with innertext to make li tag instead of doing it in html file
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
        // we make the myLeads into link using anchor <a></a>tag
       /* we have to use template tag to make it to html page a like for readable 
       listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"*/
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
        // we can add listitems like this (or) ulEl.innerHTML+= "<li>" + myLeads[i]+listitems + "</li>"
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    // myLeads.push("123")
    // inputEl.value puropose of this to get the value from the user and push the to myleads array 
    myLeads.push(inputEl.value)
    // console.log(myLeads)
    inputEl.value = ""
    /*storing myleads to localStorage but its array local storage wont accept it only string
     so converting array to string  we using JSON.stringify to make them as string */
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    //using getitem to verify it works 
    // console.log( localStorage.getItem("myLeads") )
})