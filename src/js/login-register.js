require(['./config'],()=>{
    require(['header','footer','cookie'],()=>{
        class Login{
            constructor(){
                this.login()
                this.loginSucceed()
            }
            login(){
                console.log(123)
                var docElem = window.document.documentElement, didScroll, scrollPosition;

				// trick to prevent scrolling when opening/closing button
				function noScrollFn() {
					window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
				}

				function noScroll() {
					window.removeEventListener( 'scroll', scrollHandler );
					window.addEventListener( 'scroll', noScrollFn );
				}

				function scrollFn() {
					window.addEventListener( 'scroll', scrollHandler );
				}

				function canScroll() {
					window.removeEventListener( 'scroll', noScrollFn );
					scrollFn();
				}

				function scrollHandler() {
					if( !didScroll ) {
						didScroll = true;
						setTimeout( function() { scrollPage(); }, 60 );
					}
				};

				function scrollPage() {
					scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
					didScroll = false;
				};

				scrollFn();

				[].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {
					new UIMorphingButton( bttn, {
						closeEl : '.icon-close',
						onBeforeOpen : function() {
							// don't allow to scroll
							noScroll();
						},
						onAfterOpen : function() {
							// can scroll again
							canScroll();
						},
						onBeforeClose : function() {
							// don't allow to scroll
							noScroll();
						},
						onAfterClose : function() {
							// can scroll again
							canScroll();
						}
					} );
				} );

				// for demo purposes only
				[].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) { 
					bttn.addEventListener( 'click', function( ev ) { ev.preventDefault(); } );
				} );                
            }
            loginSucceed(){
                //存 cookie
                $('#login-btn').on('click',()=>{
                    let username = $('#username').val()
                    let password = $('#password').val()
                    // console.log(username,password)
                    let userinfo = {
                        username,
                        password
                    }
                    userinfo = JSON.stringify(userinfo)
                    console.log(userinfo)
                    if($('#sevenFree').prop('checked')){
                        $.cookie('login',userinfo,{expires : 7, path:'/'})
                    }else{
                        $.cookie('login',userinfo,{ path:'/'}) 
                    }
                    window.location.href = '/index.html'
                    
                    
                })
            }

        }
        new Login ()
    })
})