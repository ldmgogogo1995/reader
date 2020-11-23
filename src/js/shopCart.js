require(['./config'],()=>{
    require(['template','header','footer'],(template,header)=>{
        class Cart {
            constructor (){
                this.render()
                this.allPick()
                this.remove()
                this.checkRemove()
            }
            render (){
                //从localStorage里面取出数据渲染页面
                let cart = localStorage.getItem('cart')
                if(cart){
                    cart = JSON.parse(cart)
                   
                    if(cart.length===0){
                        console.log(cart)
                        $('.cart-pic').css({'display':'block'})
                        $('.order-pay').css({'display':'none'})
                    }else{
                        $('#table-group').html(template('cart-template',{cart}))
                        this.calcTotalPrice()
                        this.checksChange()
                        this.numChange()
                    }
                    
                    
                }else{
                    //显示购物车为空的操作
                    $('.cart-pic').css({'display':'block'})
                    $('.order-pay').css({'display':'none'})
                }
            }
            calcTotalPrice(){
                this.totalPrice = 0
                this.totalNumber = 0
                let $checks = $('#order-pay .checkbox')
                
                //遍历jquery对象
                $checks.each((index,check)=>{
                    //用each遍历出来的check是原生对象
                    //用$转原生直接括号不➕引号
                    if($(check).prop('checked')){
                        //通过check找到当前li的小计的html（）
                        //并且累加给this.totalPrice
                        this.totalPrice += Number($(check).parents('.sell-box').find('.total').html())
                        this.totalNumber += Number($(check).parents('.sell-box').find('.input-num').val())

                    }
                    $('#allPrice').html((this.totalPrice).toFixed(2))
                    $('.ins').html(this.totalNumber)
                })
            }
            checksChange(){
                let $checks = $('#order-pay .checkbox')
                $checks.on('change',()=>{
                    
                    this.calcTotalPrice()
                })
                $('#allPick').on('change',()=>{
                    this.calcTotalPrice()
                })
            }
            numChange(){
                $('.sell-box').on('click', e=>{
                    var num
                    var price
                    if(e.target.className === 'mius'){
                        //减法
                        //首先取到这条LI的ID值，通过id来获取loc里面的数据，并进行修改
                        const id = $(e.target).parents('.sell-box').attr('data-id')
                        // console.log(id)
                        let cart = JSON.parse(localStorage.getItem('cart'))
                        cart = cart.map(item =>{
                            if(item.id === id) {
                                item.num--
                                if(item.num<=1){
                                    item.num=1
                                }
                                num = item.num
                                price = (item.price * item.num).toFixed(2)                                
                                
                            }
                            return item
                            
                        })
                        localStorage.setItem('cart', JSON.stringify(cart))
                        $(e.target).parents('.sell-box').find('.input-num').val(num)
                        $(e.target).parents('.sell-box').find('.total').html(price)
                        this.calcTotalPrice()
                        header.getCartNum()
                        
                    }else if(e.target.className === 'puls'){
                        
                        //加法
                        //首先取到这条LI的ID值，通过id来获取loc里面的数据，并进行修改
                        const id = $(e.target).parents('.sell-box').attr('data-id')
                        // console.log(id)
                        let cart = JSON.parse(localStorage.getItem('cart'))
                        cart = cart.map(item =>{
                            if(item.id === id) {
                                item.num++
                                num = item.num
                                price = (item.price * item.num).toFixed(2)
                            }
                            return item
                        })
                         //把页面的显示做一个修改
                        localStorage.setItem('cart', JSON.stringify(cart))
                        $(e.target).parents('.sell-box').find('.input-num').val(num)
                        $(e.target).parents('.sell-box').find('.total').html(price)
                        this.calcTotalPrice()
                        header.getCartNum()
                    }
                   
                    
                })
            }
            allPick(){
                //自己的不完善的逻辑
                // $('#allPick').on('click',()=>{
                //     let $checks = $('#order-pay .checkbox')
                //         if($('#allPick').prop('checked')){
                //             $checks.prop('checked',true)
                //             // console.log(1)
                //         }else{
                //             $checks.prop('checked',false)   
                //             // console.log(2)
                //         }
                        
                //         this.calcTotalPrice()
                // })
                //网上copy逻辑
                $(function() {
                    var allInput = $("#allPick");
                    allInput.click(function () {
                        if (this.checked == true) {
                            $(".checkbox").prop('checked', true);
                            $("label").addClass("checked");
                        } else {
                            $(".checkbox").prop('checked', false);
                            $("label").removeClass("checked");
                        }
                    });
                    $(".checkbox").click(function () {
                        $(this).parent().toggleClass("checked");
                        var s = $(".checkbox").length;
                        var a = $(".checkbox:checked").length;
                        if (s == a) {
                            allInput.prop('checked', true);
                            allInput.parent().addClass("checked");
                        } else {
                            allInput.prop('checked', false);
                            allInput.parent().removeClass("checked");
                        }
                    });
                });   
            }
            remove(){
                $('.sell-box').on('click',e=>{
                    if(e.target.className === 'del-btn'){
                        const id = $(e.target).parents('.sell-box').attr('data-id')
                        let cart = JSON.parse(localStorage.getItem('cart'))
                        if(confirm('确定删除吗？')){
                       
                        
                        cart = cart.filter(item=>{
                            if(item.id !== id){
                                return item
                            }
                        })
                        
                        if(cart.length===0){
                            $('.cart-pic').css({'display':'block'})
                            $('.order-pay').css({'display':'none'})
                        }
                        $(e.target).parents('.sell-box').remove()
                        }
                        console.log(cart)
                        console.log(id)
                        localStorage.setItem('cart', JSON.stringify(cart))
                            this.calcTotalPrice()
                            header.getCartNum()
                    }
                })
                
                // console.log(cart)
            }
            checkRemove(){
                $('#delcheck').on('click',()=>{
                    let cart = JSON.parse(localStorage.getItem('cart'))
                    $('.checkbox').each((index,item)=>{
                        if($(item).prop('checked')){
                            
                            // console.log(id)
                          let id = $(item).parents('.sell-box').attr('data-id')
                          cart = cart.filter(item=>{
                            if(item.id !== id){
                                return item
                            }
                          })
                          if(cart.length===0){
                            $('.cart-pic').css({'display':'block'})
                            $('.order-pay').css({'display':'none'})
                        }  
                        $(item).parents('.sell-box').remove()   
                        }
                       
                    })

                    localStorage.setItem('cart', JSON.stringify(cart))
                            this.calcTotalPrice()
                            header.getCartNum()
                })
            }
            
        }
        new Cart()
    })
})