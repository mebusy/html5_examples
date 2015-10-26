

String.prototype.format = function(){
	//cc.log( arguments )
    if (arguments.length == 0) return null;
    var args = arguments; //Array.prototype.slice.call(arguments, 1);
    return this.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};


//一些 js binding 中没有的 js binding
ccui.TouchEventType={}
for (k in cc.EventTouch.EventCode)
{
   ccui.TouchEventType[k.toLowerCase()] = cc.EventTouch.EventCode[k]
}


//cc.log( [3,4,5].length )
//cc.log( {a:1,b:2}.length )
//cc.log( typeof( [3,4,5] ) == "object" )