
function createLoginLayer() {
	var layer = cc.LayerColor.create( cc.color( 0xf,0x1d,0x36,255) )

	var layer_cx = origin.x + visibleSize.width/2 
	var layer_cy = origin.y + visibleSize.height/2

	var bLogin = true

	//对话框==================================
	var dialog = create9SliceImageView ( g_resources._9slice_darkblue_bg_png  , cc.size( 520 , 440 ) , 
		cc.p(layer_cx ,layer_cy) ) 

	dialog.setLayoutComponentEnabled(true)
	layer.addChild( dialog )
	//对话框 创建完毕===========================

	var dialog_cx = dialog.getContentSize().width/2

	//dialog title 创建===================================
    var label_title = createLabel( getText("text_acc_login") ,  FONT_SIZE_TITLE  )
    label_title.setPosition( cc.p( dialog_cx , dialog.getContentSize().height -  label_title.getContentSize().height )  )
    dialog.addChild(label_title)
	//dialog title 创建完毕===================================

	//text editor 创建===================================
	var size = cc.size( 360, 80 )

	var editor_bg = create9SliceImageView(g_resources._9slice_deepblue_textfield_png ,cc.size( size.width ,size.height*2 ) , 
		cc.p(dialog.getContentSize().width/2  ,  label_title.getPositionY() - label_title.getContentSize().height - size.height )  )
	dialog.addChild( editor_bg )
	//editor_bg 创建完毕===================================

	//编辑器提示
	var editor_holdstr = [ getText("text_hint_input_user_name") , getText("text_hint_input_password") ]
	//两个编辑器
	var edits = []

	
	for(var i=0;i<2;i++){
		var y = editor_bg.getPositionY() + size.height/2 - size.height*i
	    var edit =  createEditBox( size, cc.p( dialog_cx,y), 
	    		FONT_SIZE ,  editor_holdstr[i] , null,null  )
		dialog.addChild( edit )

		edits[i] = edit
	}
	//两个编辑器 结束============================

	//分割线
	var dividing = createImageView ( g_resources.ui_dividing_line_png  , size.width-16, 
		cc.p( dialog_cx, editor_bg.getPositionY() - 2 ) )   
	dialog.addChild( dividing )
	//分割线 结束============================

	//错误提示
	var label_err=createLabel( "错误提示" , FONT_SIZE_SMALL, cc.color(255,0,0)  )
	label_err.setPosition( dialog_cx , editor_bg.getPositionY()- editor_bg.getContentSize().height/2 - label_err.getContentSize().height)
	dialog.addChild(label_err)
	label_err.setVisible(false)
	//错误提示 结束============================

	//登录／注册 按钮
	var button = createButton( getText("text_login") , 
		 cc.size( 160,60 ) , cc.p( dialog_cx ,  60 ) ,
		function(sender,eventType) { 
			//事件
			var usr_name = edits[0].getString()
			var password = edits[1].getString()

			var re_user_name =  /^[a-zA-Z]\w{2,15}$/
			var re_password =  /^\w{3,16}$/

			if ( !re_user_name.test( usr_name ) ) {
				label_err.setVisible( true )
				label_err.setString( getText( "ILLEGAL_USER_NAME") )
			} else if ( !re_password.test( password ) ) {
				label_err.setVisible( true )
				label_err.setString( getText( "ILLEGAL_PASSWORD") )
			} else {
				label_err.setVisible( false )

				var action = bLogin ? "login" : "reg"
				var args = { usr: usr_name, pwd: password }
				
				sendRequest( action, args , function ( response ) {
					if ( response.res>0 && response.msg ) {
						label_err.setVisible( true )
						label_err.setString( response.msg )
					}
				} ,  label_err )
			}

		}  )
	dialog.addChild( button )
	//登录／注册 按钮 结束============================

	//切换按钮
	var button_switch = createLabel( getText("text_free_register"), FONT_SIZE_SMALL, cc.color(252,213,70),
		//事件
		function(sender,eventType) { 
			bLogin = !bLogin
			label_title.setString( bLogin? getText("text_acc_login") : getText("text_acc_register") )
			button.label.setString( bLogin? getText("text_login") : getText("text_register") )
			button_switch.setString( bLogin? getText("text_free_register") : getText("text_have_acc") )
		}
	 )
	button_switch.setPosition( cc.p( button_switch.getContentSize().width/2+button_switch.getContentSize().height/2,
		button_switch.getContentSize().height) )
	dialog.addChild( button_switch )
	//切换按钮 结束============================
	return layer

}



var loginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = createLoginLayer()
        this.addChild(layer);
    }
});