//global array for products bject
let arr=[];
$(document).ready(function(){
    //adding products
    $("#add").click(function(){
        var psku=$("#productsku").val();
        var pquant=$("#productquantity").val();
        var pname=$("#productname").val();
        var pprice=$("#productprice").val();
        if(checkData(psku, pname, pprice, pquant))
        {
            checkDuplicacy(psku, pname, pprice, pquant)
            display();
        }
    });  

    $(".cancelerror").click(function(){
        $("#msg").hide();
    });

    $(".cancelsuccess").click(function(){
        $("#success").hide();
    });
    
    //check validity
    function checkData(psku, pname, pprice, pquant)
    {
        if(psku=="" || isNaN(psku) || psku==" " || pname=="" || pname==" " || !isNaN(pname) || pprice=="" || isNaN(pprice) || pquant=="" || isNaN(pquant))
        {
            $("#msg").show();
            return false;
        }
        else{
            return true;
        }
    }

    //checking duplicacy
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
                    $("#msg").show();
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
        $("#success").show();
        resetForm();
    }

    function display()
        {
            let result="";            
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

        $("#output").on("click", "a.edit", function(){
            var pid=$(this).data("id");
            editProduct(pid);
        });

        $("#output").on("click", "a.delete", function(){
            var text=prompt("Type yes to delete:");
            if(text.toLowerCase()==="yes"){
                $($(this).parent()).parent().remove();
                var pid=$(this).data("id");
                console.log("Del"+pid);
                deleteProduct(pid);
                $("#success").show();
            }
            
        });


        function editProduct(id){
            var obj=getProduct(id);
            var product=obj.arr;
            var index=obj.index;
            $("#productsku").val(product.sku);
            $("#productname").val(product.name);
            $("#productprice").val(product.price);
            $("#productquantity").val(product.quant);
            $("#add").css("display", "none");
            $("#update").css("display","inline-block");  
            $(".inp").on("click", "#update", function(){
                var ps=$("#productsku").val();
                var pn=$("#productname").val();
                var pp=$("#productprice").val();
                var pq=$("#productquantity").val();
                checkDuplicacyAgain(ps, pn, pp, pq, index)
                $("#success").show();         
                resetForm();                
            });                     
        }

        function getProduct(id)
        {
            for(let i=0; i<arr.length; i++)
            {                
                if(arr[i].sku==id)
                {                    
                    return {"arr": arr[i], "index": i};
                }
                
            }
        }

        function checkDuplicacyAgain(ps, pn, pp, pq, index)
        {
            for(var i=0; i<arr.length; i++)
            {
                if(arr[i].sku== ps &&  i!= index)
                {
                    $("#msg").show();
                    return;
                }            
            }
            updateProduct(ps, pn, pp, pq, index);                   
        }

        function updateProduct(ps, pn, pp, pq, index)
        {
            arr[index].sku=ps;
            arr[index].name=pn;
            arr[index].price=pp;
            arr[index].quant=pq;
            display();
        }


        function deleteProduct(id)
        {
            for(var i=0; i<arr.length; i++)
            {
                if(arr[i].sku==id)
                {
                    arr.splice(i,1);
                }
            }
        }

        function resetForm()
        {
            $("#productsku").val("");
            $("#productname").val("");
            $("#productprice").val("");
            $("#productquantity").val("");
        }

        
                
        


});

