window.addEventListener('load',intiEvents);
function intiEvents(){
  document.getElementById("saveList").addEventListener("click", Save_list);;
  document.querySelector("#Search").addEventListener("keyup", searchProduct);
  loadProduct();
  loadStorage();
}
function loadProduct(){
  var ul = document.querySelector("#product_list");
  ul.innerHTML="";
  product_stock.forEach(function(obj){
      var li = document.createElement('li');
      var img_div = document.createElement('div');
      var div = document.createElement('div');
      var img = document.createElement('img');
      var h3 = document.createElement('h3');
      var Addbtn = document.createElement('button');
      var Morebtn = document.createElement('button');
      var bottom = document.createElement('div');
      div.className='img_box';
      Addbtn.addEventListener("click",addProduct);
      Addbtn.className = 'btn btn-primary';
      Addbtn.innerHTML = 'Add to cart';
      Morebtn.className = ' btn-danger';
      Morebtn.innerHTML = "See More";
      // Morebtn.innerHTML = '<i class="fas fa-eye">';
      Morebtn.innerHTML= 'See More';
      img.src = obj.product_img;
      h3.innerHTML = obj.product_name;
      Addbtn.setAttribute('title',obj.product_id);
      img_div.className = 'img_div';
      img_div.appendChild(img);
      bottom.appendChild(Addbtn);
      bottom.appendChild(Morebtn);
      bottom.className = "bottom";
      div.appendChild(img_div);
      li.appendChild(div);
      li.appendChild(h3);
      li.appendChild(bottom);

      ul.appendChild(li);
      
    });
}

function showProductlist(){
  //  console.log("function called");

  var ul = document.querySelector("#added_product");
  ul.innerHTML = "";
  product_list.my_product_List.forEach(function(obj){
    var li = document.createElement('li');
    var div = document.createElement('div');
    div.className = 'img_div';
    // img tag
    var img = document.createElement('img');
    img.src = obj.img;
    //  h2 tag
    var h2 = document.createElement('h2');
    h2.innerHTML = obj.name;
    // delete button
    var dlt_btn = document.createElement('button');
    dlt_btn.innerHTML = '<i class = "fas fa-trash">';
    dlt_btn.className = "btn btn-secondary";
    dlt_btn.addEventListener("click",deleteProduct);
    dlt_btn.setAttribute("title",obj.id);
    //  buying button
    var buy = document.createElement('button');
    buy.className = 'btn btn-danger';
    buy.innerHTML = 'Buy';
   
    div.appendChild(img);
    li.appendChild(div);
    li.appendChild(h2);
    li.appendChild(buy);
    li.appendChild(dlt_btn);
    
    ul.appendChild(li);

  });
}

var currObj;
function addProduct(){
  // console.log("add btn  called");
  // var currentbtn_id = this.title;
  for(var i = 0; i < product_stock.length; i++){
    var obj;
      if(this.title == product_stock[i].product_id){
         var newObj = product_stock[i];
         var ispresent = 'false';
         for(var i = 0; i < product_list.my_product_List.length; i++ ){
           if(this.title == product_list.my_product_List[i].id){
                ispresent = 'true';
                break;
           }
         }
         if(ispresent=='false'){
            product_list.addP( newObj.product_id , newObj.product_name , newObj.product_img );
            showProductlist();
         }else{
           alert("This product is already in your cart.......")
         }
         break;
      }
  }

  

}

function deleteProduct(){
  // console.log(this.title)
  product_list.delete_p(this.title);
  showProductlist();
}


// ---------load locl storge--------------
function Save_list(){
  console.log("savebtn function called")
   if(window.localStorage){
       var data = JSON.stringify(product_list.my_product_List);
       localStorage.setItem('data',data);
       alert("Saved");
   }else{
     alert("your does't support local storage")
   }
}

function loadStorage(){
  if(window.localStorage){
       if(localStorage.data){
           var data = localStorage.getItem('data');
           product_list.my_product_List = JSON.parse(data);
           showProductlist();
       }
  }else{
    alert("Your browser does't support local storage");
  }
}

function searchProduct() {
  console.log("searching called")
  var toSearch = event.srcElement.value;
   if(toSearch.length > 0 ){
    product_stock = product_stock.filter(function(obj) {
      return obj.product_name.toLowerCase().includes(toSearch.toLowerCase());
      
    });
    console.log(product_stock);
    
    loadProduct();
   }
  // console.log(toSearch.length)
  // if(toSearch.length==0){
  //   loadProduct();
  // }

}