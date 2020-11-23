require(['./config'], () => {
    require(['url', 'template', 'header', 'footer', 'exzoom','fly'], (url, template,header) => {
        class Detail {
            constructor() {
                // this.mag()
                this.getDetail().then(() => {
                    this.mag()
                    this.addTOCart()
                })
            }
            mag() {
                //放大镜
                $("#exzoom").exzoom({
                    autoPlay: false,
                });//方法调用，务必在加载完后执行
            }

            getDetail() {
                //获取地址栏ID
                const id = location.search.slice(4)
                return new Promise(resolve => {
                    $.get(`${url.rapTwo}/Detail`, { id }, resp => {

                        // console.log(resp)
                        if (resp.code === 200) {
                            let { detail } = resp.body
                            this.detail = { ...detail, id }
                            $('#detail-main').html(template('detail-template', { detail }))
                            resolve()
                        }
                    })
                })

            }
            addTOCart() {
                
                $('.minus').on('click',()=>{
                  let number =  $('.num').html()
                  number--
                  if(number<=1){
                      number = 1
                  }
                  $('.num').html(number)
                })
                $('.add').on('click',()=>{
                  let number =  $('.num').html()
                  number++
                  
                  $('.num').html(number)
                })
                $('#addCart').on('click', (e) => {
                    // console.log(this.detail)
                    //先取出购物车数据，再新增当前这一条，再重新存进去，覆盖原来的数据
                    let cart = localStorage.getItem('cart')
                    //先判断cart是否有数据，如果没有数据，代表第一次加购物车
                    if (cart) {
                        cart = JSON.parse(cart)
                        //判断当前数据是否已经加入购物车
                        const isExist = cart.some(item => {
                            return item.id === this.detail.id
                        })
                        if(isExist){
                            //把这条商品的num加一
                            //修改数组里某一个元素，使用map
                            cart = cart.map(item =>{
                                if (item.id === this.detail.id){
                                    let number =  Number($('.num').html())
                                    console.log(typeof(number))
                                    item.num+=number
                                }
                                return item
                            })
                        }else{
                            let number =  Number($('.num').html())
                            //商品不存在
                            cart.push({...this.detail,num:number})
                        }
                        console.log(cart)
                        localStorage.setItem('cart', JSON.stringify(cart))
                    } else {
                        let number =  Number($('.num').html())
                        //第一次存购物车，为了避免后期修改复杂，存在一个只有当前这一个元素的数组里面
                        localStorage.setItem('cart', JSON.stringify([{ ...this.detail, num:number }]))
                    }
                    //抛物线效果
                    $(`<img src='${this.detail.imgs[0]}'style='width:30px;height:30px;boder-radius:50%;z-index:99999'>`).fly({
                        start:{
                            left: e.pageX,
                            top:  e.pageY
                          },
                          end:{
                            left: $('.icon-cart').offset().left,
                            top: $('.icon-cart').offset().top,
                            width: 0,
                            height: 0
                          },
                        //   autoPlay: false, //是否直接运动,默认true
                          speed: 1.1, //越大越快，默认1.2
                        //   vertex_Rtop：100, //运动轨迹最高点top值，默认20
                          onEnd: function(){
                            //   删除dom
                              this.destroy()
                              header.getCartNum()
                          } //结束回调
                    })

                })
            }

        }
        new Detail
    })
})