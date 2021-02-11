customers = getCustomers()
addbtn = document.querySelector('#addbBtn')
showAllBtn = document.querySelector('#showAllBtn')
showBtn=document.querySelector('#showBtn')//showCustomerWindow
sea=document.querySelector('#searchI') //searchInput
submitForm=document.querySelector('#addForm')
submitBtn=document.querySelector('#submitBtn')

let editFlag=false
let gindex
function getCustomers(){
    return(JSON.parse(localStorage.getItem('customers')) || [])
}
const saveCustomers = function(){
    localStorage.setItem('customers', JSON.stringify(customers))
}
const freeLocal=function(){
  localStorage.clear()
}
const createElement = function (elementName,parent,classes=[],txt) //create table cell
 {
     element = document.createElement(`${elementName}`)
     if(classes.length!=0) classes.forEach(cla => { element.classList.add(`${cla}`)} )
     if(txt!='')element.textContent = txt
     parent.appendChild(element)
     return element
 }


const addCustomer = function(customer){
    customers.push(customer)
    saveCustomers()
}

const showHide = function(btnName,sectionId,txt1, txt2) {
    document.querySelectorAll('section').forEach((section, index)=>{
        if(index!=0) section.classList.add('d-none')
        if (section.id=="addCustomer") console.log("uiii",section.classList)
    })

    if(btnName.innerText == txt1 ){
        btnName.textContent=txt2
        document.querySelector(`#${sectionId}`).classList.remove('d-none');

    }else{
        btnName.textContent=txt1
    }

}
addbtn.addEventListener('click', function(){
    editFlag=false
    showHide(addbtn, 'addCustomer', 'Add Customer','Hide Customer')
})
showAllBtn.addEventListener('click',function(e){
    showHide(showAllBtn, 'allCustomers', 'show All Customer','Hide customers')
    viewCustomers(customers,'tabAllBod',1)
    console.log("jj")
})
showBtn.addEventListener('click',function(e){
    showHide(showBtn, 'singleCustomer', 'show Customer','Hide customer')

})
function deleteElement(arr,index,tbNum)
{
  var tbody
  if (tbNum==1)
  {
  arr.splice(index,1)
  tbody="tabAllBod"
   }
  else {
    tbody="searchBod"
    customers.splice (customers.findIndex(customer => customer.accNum == arr[index].accNum),1);
    arr.splice (index,1)
  }

  saveCustomers()
  viewCustomers(arr,tbody,tbNum)
}

function editElement(index)
{
  editFlag=true
  gindex=index
  showHide(addbtn, 'addCustomer', 'Add Customer','Edit Customer') //openform

  submitForm.elements.cName.value=customers[gindex].cName
  submitForm.elements.balance.value=customers[gindex].balance
  submitBtn.value="Edit Customer"
  // console.log("this Submit",submitBtn.value)
}
const viewCustomers = function (arr,tbID,num)
  {
    var r=0;
    editFlag=false
    // console.log("IviewCustomers",editFlag)
    document.getElementById(tbID).innerHTML=""
    arr.forEach((customer,index)=>{
    tr=createElement('tr',document.getElementById(tbID),[],'')
    td1=createElement('td',tr,[],customer.accNum)
    td2=createElement('td',tr,[],customer.cName)
    td3=createElement('td',tr,[],customer.balance)
    td4=createElement('td',tr,[],'')
    delBtn=createElement('td',td4,['btn','btn-danger','mx-2'],'Delete')
    delBtn.addEventListener('click', (e)=>{
      deleteElement(arr,index,num)
    })
    editBtn=createElement('td',td4,['btn','btn-success','mx-2'],'Edit')
    editBtn.addEventListener('click', (e)=>{
      editElement(index,num)

    })}
  )

}





sea.addEventListener('search',function(e){
  let f=false;
  searchRes=[]
  let x = document.getElementById("searchI");
 customers.forEach( customer => {
  if (x.value==customer.cName){
  f=true;}
})

  if (f) {
    searchRes=customers.filter(customer =>{
    {
      return customer.cName.toString().includes(x.value)
  }}
)}
viewCustomers(searchRes,'searchBod',2)
x.value=""
})




submitForm.addEventListener('submit',function submitInputForm (e)
{
  if (editFlag==false){
   console.log("I am here",editFlag)
      e.preventDefault()
      const ele = this.elements

      let user = {
          accNum : Date.now(),
          cName: ele.cName.value,
          balance: ele.balance.value
      }

      addCustomer(user)
      this.reset()
      showHide(addbtn,'addCustomer', 'Hide Customer','Add Customer') //fix addButton Issue
}

else {
  e.preventDefault() // eventedit handeled
  console.log("e.target  ",e.target ) // e target is the form itself which has addForm id
  customers[gindex].cName=this.elements.cName.value
  customers[gindex].balance=this.elements.balance.value
  this.reset()
  showHide(addbtn,'addCustomer', 'Edit Customer','Add Customer');
  submitBtn.value="Add Customer"
  document.querySelector("#addCustomer").classList.add('d-none')
  }
  saveCustomers()
})