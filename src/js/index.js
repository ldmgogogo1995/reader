
// const arr = [1,2,4,5,53,4,];
// arr.forEach (item =>{
//     console.log(item)
// })
// $('header').load('/html/header.html')
// $('footer').load('/html/footer.html')
require(['./config'], () =>{
    require(['template','url','swiper','header','footer',],(template,url,Swiper) =>{
        class Index{
            constructor (){
                this.getPlatform().then(()=>{
                    this.banner()
                    
                })
                
            }
            getPlatform(){
                return new Promise(resolve=>{
                    $.get(`${url.rapTwo}/platform`,resp =>{
                        console.log(resp)
                        if(resp.code === 200){
                            // console.log(resp.body)
                            const {list} = resp.bady
                            
                            $('#Reader-platform ul').html(template('platform-template',{list}))
                            resolve()
                        }
                    })
                })
            }
            banner(){
                console.log(123)
                var swiper = new Swiper('.swiper-container', {
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: {
                      delay: 2500,
                      disableOnInteraction: false,
                    },
                    pagination: {
                      el: '.swiper-pagination',
                      clickable: true,
                    },
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                  });
            }
        }
        new Index ()
    })
})