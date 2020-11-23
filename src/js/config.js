require.config({
    baseUrl:'/',
    paths: {
        'jquery':'libs/jquery/jquery-3.4.1.min',
        'header':'js/modules/header',
        'footer':'js/modules/footer',
        'template':'libs/art-template/template-web',
        'url':'js/modules/url',
        'exzoom':'libs/jquery-plugins/jquery-fdj/jquery.exzoom',
        'fly':'libs/jquery-plugins/jquery-cartfly/jquery.fly.min',
        'cookie':'libs/jquery-plugins/jquery-cookie/jquery.cookie',
        'swiper':'libs/jquery-plugins/swiper/swiper.min',
        // 'logresone':'libs/jquery-plugins/js-login-register/classie',
        // 'logrestwo':'libs/jquery-plugins/js-login-register/modernizr.custom',
        // 'logresthree':'libs/jquery-plugins/js-login-register/uiMorphingButton_fixed'
    },
    shim: {
        'exzoom':{
            deps:['jquery']
        },
        'fly':{
            deps:['jquery']
        },
        'cookie':{
            deps:['jquery']
        },
        // 'logresone':{
        //     deps:['logrestwo']
        // },
        // 'logresthree':{
        //     deps:['logresn']
        // },

    }
})