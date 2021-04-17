class product{
    constructor(p_id , p_name , p_img){
       this.id = p_id;
       this.name = p_name;
       this.img = p_img;
    }
}
var product_list = {
      my_product_List : [],
      addP : function(id,name,img){
          var obj = new product(id , name , img);
          this.my_product_List.push(obj);
      },
      delete_p: function(id){
          this.my_product_List = this.my_product_List.filter(function(obj){
              return obj.id != id;
          })
      },
 
}