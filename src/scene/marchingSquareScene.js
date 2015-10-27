


function createMSLayer() {
	var layer = cc.Layer.create(  )

	var draw = new cc.DrawNode();
    layer.addChild( draw );




	//cc.log( visibleSize.width, visibleSize.height )
	var MARGIN=80
	var node_pos = [  [ MARGIN , MARGIN + ( visibleSize.height - MARGIN*2 ) ] , [ MARGIN + ( visibleSize.width - MARGIN*2 ) , MARGIN + ( visibleSize.height - MARGIN*2 ) ] ,
						 [ MARGIN + ( visibleSize.width - MARGIN*2 ) , MARGIN ] ,    [ MARGIN , MARGIN ] , ] ;

	var common_nodes = []

	for ( var i=0;i< node_pos.length ; i++ ) {
			var x0 = node_pos[i][0]
			var y0 = node_pos[i][1]
			var x1 = node_pos[(i+1)%node_pos.length][0]
			var y1 = node_pos[(i+1)%node_pos.length][1]

			
			var node=   createImageView ( g_resources.ui_white_cicle  ,   cc.p( (x0+x1)/2, (y0+y1)/2  )  , 24, 24   )    	
			layer.addChild( node );		

			node.isOn = false
			node.setColor( cc.color( 80,80,80) )

			common_nodes[i] = node
	}

	for ( var i=0;i< node_pos.length ; i++ ) {
			var x = node_pos[i][0]
			var y = node_pos[i][1]
			draw.drawSegment(cc.p( 0 , y), cc.p( visibleSize.width , y  ), 1,  cc.color(64, 64, 64, 255));
			draw.drawSegment(cc.p( x , 0), cc.p( x , visibleSize.height ), 1,  cc.color(64, 64, 64, 255));

			
			var controlNode=   createImageView ( g_resources.ui_white_cicle  ,   cc.p(x,y)  , 48, 48 , function(sender,eventType) { 
														cc.log( sender.index )
														sender.isOn = !sender.isOn  
														sender.setColor( sender.isOn ? cc.color( 255,255,255) : cc.color( 80,80,80) )

														for ( var index in sender.linkNodes ) {
															var link_node = sender.linkNodes[index]
															link_node.isOn  = !link_node.isOn  
															link_node.setColor( link_node.isOn ? cc.color( 255,255,255) : cc.color( 80,80,80) )

														}
													}
												)    
			controlNode.index = i
			controlNode.isOn = false
			controlNode.setColor( cc.color( 80,80,80) )

			controlNode.linkNodes= [   common_nodes[i] , common_nodes[(i-1+node_pos.length)%node_pos.length]   ]


			layer.addChild( controlNode );

	}
 

	return layer

}


var marchingSquareScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = createMSLayer()
        this.addChild(layer);
    }
});
