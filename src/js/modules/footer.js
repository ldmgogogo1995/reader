define(['jquery'], () =>{
    class Footer {
        constructor(){
            this.load()
        }
        load(){
            $('footer').load('/html/modules/footer.html')
        }
    }
    return new Footer()
})