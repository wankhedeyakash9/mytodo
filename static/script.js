        $("#add-todo").submit(function(e){
            e.preventDefault()
                        
            $.ajax({
                type:'post',
                url:"/", 
                data:{item:$("#add-todo input").val()},
                success: function(data){location.reload()}
            })
        })
        $("li").click(function(){
            $.ajax({
                type:'delete',
                url:"/"+ $(this).text().replace(/ /g,"-"), 
                success: function(data){location.reload()}
            })
        })
