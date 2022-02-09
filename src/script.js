
let arr=[];

$(document).ready(function(){
    $("#add").click(function(){
        var psku=$("#productsku").val();
        var pquant=$("#productquantity").val();
        var pname=$("#productname").val();
        var pprice=$("#productprice").val();
        //console.log(pid+" "+pname+" "+pprice );

        if(checkData(psku, pname, pprice, pquant))
        {
            checkDuplicacy(psku, pname, pprice, pquant);
            display();
            //console.log("Hello");
        }
    });

    function checkData(psku, pname, pprice, pquant)
    {
        if(psku=="" || isNaN(psku) || psku==" " || pname=="" || pname==" " || !isNaN(pname) || pprice=="" || isNaN(pprice) || pquant=="" || isNaN(pquant))
        {
            $("#msg").fadeIn(2000).fadeOut(2000);
            return false;
        }
        else{
            //console.log("Hello2");
            return true;
        }
    }

    function checkDuplicacy(psku, pname, pprice, pquant){
        if(arr.length ===0 )
        {
           insertData(psku, pname, pprice, pquant);
           return;
        }
        else{
            for(var i=0; i<arr.length; i++)
            {
                if(arr[i].sku== psku)
                {
                    $("#msg").text("Duplicate SKU").fadeIn(2000).fadeOut(2000);
                    return;
                }            
            }
            insertData(psku, pname, pprice, pquant);           
        }
    }

    function insertData(psku, pname, pprice, pquant)
     {
        arr.push({
            "sku": psku,
            "name": pname,
            "price": pprice,
            "quant": pquant
        });
        $("#success").text("Product Added Successfully ").css("display", "block").fadeIn(2000).fadeOut(2000);
         //console.log(arr);
            
    }

    function display()
        {
            let result="";            
            if(arr.length ===0 )
            {
             $("#output").html("<p>No values</p>");
            }
            else{                
                for(let i=0; i<arr.length; i++)
                {
                    result +=`<tr data-prod="${arr[i].sku}">
                    <td>${arr[i].sku}</td>
                    <td>${arr[i].name}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].quant}</td>
                    <td><a class="edit" data-id="${arr[i].sku}" href="#">EDIT</a></td>
                    <td><a class="delete" data-id="${arr[i].sku}" href="#">DELETE</a></td>
                    </tr>`;
                }
                $("#output").html(`<table>
                <tr>
                    <th>Product SKU</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Quantity</th>
                    <th></th>
                    <th></th>
                </tr>
                ${result}
                </table>`);
            }
            //console.log(arr);
        }

        $("#output").on("click", "a.edit", function(){
            var pid=$(this).data("id");
            editProduct(pid);
        });

        $("#output").on("click", "a.delete", function(){
            $($(this).parent()).parent().remove();
            var pid=$(this).data("id");
            console.log("Del"+pid);
            deleteProduct(pid);
            $("#success").css("display", "block").text("Product Deleted").fadeIn(2000).fadeOut(2000);
        });


        function editProduct(id){
            var product=getProduct(id);
            $("#productsku").val(product.sku);
            $("#productname").val(product.name);
            $("#productprice").val(product.price);
            $("#productquantity").val(product.quant);
            $("#add").css("display", "none");
            $("#update").css("display","inline-block");
            $(".inp").on("click", "#update", function(){
                //console.log(id)
                var ps=$("#productsku").val();
                var pn=$("#productname").val();
                var pp=$("#productprice").val();
                var pq=$("#productquantity").val();
                checkDuplicacy(ps, pn, pp, pq);
                updateProduct(ps, pn, pp, pq);
            });
        }

        function getProduct(id)
        {
            for(let i=0; i<arr.length; i++)
            {
                
                if(arr[i].sku==id)
                {
                    console.log("get"+Object.keys(arr[i])+"val: "+Object.values(arr[i]));
                    return arr[i];
                }
                
            }
        }

        function updateProduct(product)
        {
            
            product.sku=$("#productsku").val();
            product.name=$("#productname").val();
            product.price=$("#productprice").val();
            product.quant=$("#productquantity").val();
    
            display();
        }


        function deleteProduct(id)
        {
            for(var i=0; i<arr.length; i++)
            {
                if(arr[i].sku==id)
                {
                    arr.splice(i,1);
                    //console.log("Removed"+ arr[i].splice(i,1));
                }
                //console.log(arr[i].sku);
            }
            //console.log(arr[i]);
        }
                
        


});

