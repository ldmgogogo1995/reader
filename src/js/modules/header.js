define(['jquery','cookie'], () =>{
    class Header {
        constructor(){
            this.load().then(()=>{
                this.setColor()
                this.getCartNum()
                this.isCookie()
                this.logout()
            })
        }
        load(){
            return new Promise(resolve =>{
                $('header').load('/html/modules/header.html',resolve)
            })
        }
        setColor(){
            $('#nav').on('click',e=>{
               if(e.target.className==='nav-a'){
                   $(e.target).addClass('ac').parent().siblings().children().removeClass('ac')
                // console.log($(e.target).children())
                   $(e.target).parent().addClass('ac').siblings().removeClass('ac')
               }
                
            })
        }
        getCartNum(){
            let cart = localStorage.getItem('cart')
            let num = 0
            if(cart){
                cart = JSON.parse(cart)
                num = cart.reduce((res,shop)=>{
                    res += shop.num
                    return res
                },0)
            }
            $('#header-cart-num').html(num)
        }
        isCookie(){
        //取cookie
            console.log(34)
            let userinfo = $.cookie('login')
            if(userinfo){
                //有信息表示已登录
                userinfo = JSON.parse($.cookie('login'))
                $('.login-register').css({'display':'none'})
                $('.unlogin-register').css({'display':'block'})
                $('#user').html(userinfo.username)
            }
            
        }
        logout(){
            //点击退出，删除cookie
            $('#logout').on('click',()=>{
                if(confirm('确定退出吗？')){
                    $.removeCookie('login',{ path: '/' })
                    $('.login-register').css({'display':'block'})
                $('.unlogin-register').css({'display':'none'})
                }
            })
        }
    }
    return new Header()
})