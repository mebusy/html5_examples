
var FONT_SIZE = 32
var FONT_SIZE_SMALL = 26
var FONT_SIZE_TITLE = 48

var FONT_NAME = "Helvetica-Bold"
var FONT_NAME_4_EDITOR = "Helvetica"


/*
size.控件大小
pos.控件位置
fontsize：内容文字的大小
holdstr：hold文字的内容
flag：文本内容显示格式 比如 显示为密码
mode：文本内容输入格式 比如 邮件 

//*/
function createEditBox( size ,pos,fontsize,holdstr,flag,mode ) {
    
    var size = cc.size( size.width , size.height )
    var fontcolor = cc.color(255,255,255)

    var fontname = FONT_NAME_4_EDITOR
    var edit = cc.EditBox.create(size , cc.Scale9Sprite.create( g_resources.ui_empty_png ) )
    edit.setPosition(pos)
    edit.setFont(fontname,fontsize)
    edit.setPlaceholderFont(fontname,fontsize)
    edit.setFontColor(fontcolor)
    edit.setPlaceHolder(holdstr)
    
    if (flag){ 
        edit.setInputFlag(flag)
    }

    edit.setInputMode(cc.EDITBOX_INPUT_MODE_EMAILADDR)

    if (mode) { 
        edit.setInputMode(mode)
    }

    edit.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE)

    return edit
}

function createButton( text , size , pos , func_callBack ) {
    var button = ccui.Button.create()
    button.setTouchEnabled(true)
    button.setScale9Enabled(true)
    button.loadTextures( g_resources._9slice_button_png , g_resources._9slice_button_png , "")
    button.setSize( size )
    
    //button.setTitleFontSize(FONT_SIZE)
    //button.setTitleText(text)
    
    button.setPosition( pos )   

    button.setPressedActionEnabled(true)

    if (func_callBack) {  
        button.addTouchEventListener( function(sender,eventType) { 
            if (eventType == ccui.TouchEventType.ended){
                func_callBack( sender , eventType ) 
            }
        } )
    }

    button.label = createLabel( text , size.height/2 )
    button.label.setPosition( cc.p( size.width/2 , size.height/2 ) )
    button.addChild( button.label )
  
    return button
}

function create9SliceImageView ( filename  , size , pos ) {
    var imageView = ccui.ImageView.create()
    imageView.setAnchorPoint(cc.p(0.5,0.5))
    imageView.setScale9Enabled(true)
    imageView.loadTexture( filename )
    imageView.setSize( size )
    imageView.setPosition( pos )

    return imageView
}

function createImageView ( filename  ,  pos ,  lengthX , lengthY , func_callBack ) {
    var imageView = ccui.ImageView.create()
    imageView.setAnchorPoint(cc.p(0.5,0.5))
    imageView.loadTexture( filename )
    //imageView.setSize( length / imageView.getContentSize().width )
    //imageView.setSize(cc.size(length, 4))

    if ( lengthX ) {
        imageView.setScaleX(lengthX/imageView.getContentSize().width)
    }
    if ( lengthY ) {
        imageView.setScaleY(lengthY/imageView.getContentSize().height)
    }    
    imageView.setPosition( pos )

    if (func_callBack) {  
        imageView.setTouchEnabled(true)
        imageView.addTouchEventListener( function(sender,eventType) { 
            if (eventType == ccui.TouchEventType.ended){
                func_callBack( sender , eventType ) 
            }
        } )
    }


    return imageView
}

function createLabel( text , font_size , color  , func_callBack)  {
    var label = ccui.Text.create()
    label.setString( text )
    label.setFontName( FONT_NAME )
    label.setFontSize( font_size )  
    label.setColor( color ? color : cc.color(255, 255, 255) )
    label.enableOutline(cc.color(0, 0, 0), 3.0);
    

    if (func_callBack) {  
        label.setTouchEnabled(true)
        label.addTouchEventListener( function(sender,eventType) { 
            if (eventType == ccui.TouchEventType.ended){
                func_callBack( sender , eventType ) 
            }
        } )
    }    

    return label
}


function sendRequest( action, args , func_callBack , label_err ) {
    //send request
    var xhr = cc.loader.getXMLHttpRequest();
    // 5 seconds for timeout
    xhr.timeout = 5000;

    var uri = "http://{0}:{1}/doae?act={2}".format( HOST , PORT , action) 
    for ( _key in args ) {
        uri = uri + "&{0}={1}".format( _key, args[_key] )
    }

    cc.log("request uri:" , uri  )
    xhr.open("GET",  uri , true);
    //xhr.setRequestHeader("Accept-Encoding","gzip,deflate");

    xhr.onreadystatechange = function () {  
        //cc.log( xhr.readyState , xhr.status ) 
        if (xhr.readyState == 4 ) {
            if (xhr.status == 200 ) {  //&& xhr.status <= 207
                //var httpStatus = xhr.statusText;  
                var response = xhr.responseText ;

                cc.log( response )

                if (label_err ) {
                    label_err.setVisible(false)
                }
                
                if (func_callBack) {
                    var dic = JSON.parse( response )

                    //无论请求是否成功，登录协议都会清空用数据
                    if ( dic.act == "login" ) {
                        initUserData()
                    }

                    cc.log( "mergeUserData" )
                    mergeUserData( dic.data )
                    func_callBack( dic )

                    cc.log( user_data )
                }
                //JSON.stringify()

            } else {
                if (label_err ) {
                    label_err.setVisible(true)
                    label_err.setString( getText( "network_error" ) )
                }
            }
        } 
    };  


    xhr.send();    
}

