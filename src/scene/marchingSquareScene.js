


function createMSLayer() {
	var layer = cc.Layer.create(  )


	cc.log( "createMSLayer" )
	return layer

}


var marchingSquareScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = createMSLayer()
        this.addChild(layer);
    }
});
