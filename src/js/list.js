require(['./config'],()=>{
    require(['template','url','header','footer'],(template,url)=>{
        class List{
            constructor(){
                this.search()
                this.getSearchList()
            }
            search(){
                $('#keyWord').on('keyup',function(){
                    var keyword = this.value
                   var str=""
                    $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${keyword}&cb=?`, function (resp) {
                        console.log(resp.s)
                        
                        resp.s.forEach((item)=>{
                            str += `<li>${item}</li>` 
                        })
                        $('#ts').html(str)
                        // if(keyword=''){
                        //     $('#ts').css({'disply':'none'})
                        // }
                      })                   
                })
            }
            getSearchList(){
                $.get(`${url.rapTwo}/search`,resp=>{
                    console.log(resp)
                    if(resp.code === 200){
                        const {list} = resp.body
                        $('#row').html(template('list',{list}))
                    }
                })
            }
        }
        new List
    })
})