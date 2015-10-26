
var g_resources = {        
        _9slice_deepblue_textfield_png : "res/UI/9slice_deepblue_textfield.png" ,
        _9slice_darkblue_bg_png : "res/UI/9slice_darkblue_bg.png" ,
        _9slice_button_png   : "res/UI/9slice_button.png",
        ui_empty_png   : "res/UI/ui_empty.png",
        ui_dividing_line_png : "res/UI/ui_dividing_line.png",
    };
    

var all_preload_res = []

for (k in g_resources)
{
   all_preload_res.push( g_resources[k] )
}

cc.log(all_preload_res)


//游戏文本=====================================================================
var g_texts = {
	text_login : [ "login" , "登录" ] ,
    text_register : [ "register" , "注册" ] ,
    text_acc_login : [ "Acc. Login" , "账号登录" ] ,
    text_acc_register : [ "Acc. Register" , "账号注册" ] ,
    text_free_register : [ "Free Register" , "免费注册" ] ,
    text_have_acc : [ "Had Account" , "已有账号" ] ,


	text_hint_input_user_name : [ "input 3-16 user name" , "输入3-16位用户名" ] ,
	text_hint_input_password : [ "input 3-16 password", "输入3-16位密码" ] ,

    ILLEGAL_USER_NAME   : [ "illegal user name" , "用户名不合法"  ] , 
    ILLEGAL_PASSWORD    : [ "illegal password" , "密码不合法"  ] , 
    network_error : [ "networt error" , "网络异常" ] ,
}


function getText ( ID_TEXT ) {
	return g_texts[ID_TEXT][1]
}

//用户数据=======================================================================
var user_data = {}

function initUserData () {
    cc.log( "initUserData" )
    user_data = {}
}

function mergeUserData ( src_data , dist_dic ) {
    if (!dist_dic) {
        dist_dic = user_data
    }

    var type
    for ( key in src_data  ) {
        type = typeof( src_data[key] )
        //数字，字符串，或数组, 直接拷贝
        if( type != "object" || src_data[key].length ) {
            dist_dic[key] = src_data[key]
        } else {

            if (!dist_dic[key]) {
                dist_dic[key] = {}
            }
            mergeUserData ( src_data[key] , dist_dic[key] ) 
        }
    }
 }



