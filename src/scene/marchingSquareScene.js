
function createLoginLayer() {
	var layer = cc.Layer.create(  )

	return layer

}



var loginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = createLoginLayer()
        this.addChild(layer);
    }
});