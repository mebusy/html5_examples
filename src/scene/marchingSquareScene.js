


function createMSLayer() {
	var layer = cc.Layer.create(  )

	var draw_triangle = new cc.DrawNode(); 
	layer.addChild( draw_triangle );

	var draw = new cc.DrawNode();
    layer.addChild( draw );




	//cc.log( visibleSize.width, visibleSize.height )
	var MARGIN=80
	var node_pos = [  [ MARGIN , MARGIN + ( visibleSize.height - MARGIN*2 ) ] , [ MARGIN + ( visibleSize.width - MARGIN*2 ) , MARGIN + ( visibleSize.height - MARGIN*2 ) ] ,
						 [ MARGIN + ( visibleSize.width - MARGIN*2 ) , MARGIN ] ,    [ MARGIN , MARGIN ] , ] ;

	var switcherLabelY = visibleSize.height - 40 					 
	var switcherLables = []
	for ( var i=0;i< node_pos.length ; i++ ) {
		var label =  createLabel( "0" , 32 , cc.color(255,255,255) ) 
		label.setPosition( cc.p( 150+ (label.getContentSize().width+4)*i ,   switcherLabelY  ) ) ;
		layer.addChild( label );	

		switcherLables[i] = label 
	}

	var label_equal = createLabel( "=" , 32 , cc.color(255,255,255) ) 
	label_equal.setPosition( cc.p( 150+ (label_equal.getContentSize().width+4)* 4 ,   switcherLabelY  ) ) ;
	layer.addChild( label_equal );	


	var label_result = createLabel( "0" , 32 , cc.color(255,255,255) ) 
	label_result.setPosition( cc.p( 150+ (label_result.getContentSize().width+4)* 6 ,   switcherLabelY  ) ) ;
	layer.addChild( label_result );	

	var x_offset = 0
	var y_offset = -20
	var common_nodes = []

	for ( var i=0;i< node_pos.length ; i++ ) {
			var x0 = node_pos[i][0] +x_offset
			var y0 = node_pos[i][1] +y_offset
			var x1 = node_pos[(i+1)%node_pos.length][0] +x_offset
			var y1 = node_pos[(i+1)%node_pos.length][1] +y_offset

			
			var node=   createImageView ( g_resources.ui_white_cicle  ,   cc.p( (x0+x1)/2, (y0+y1)/2  )  , 24, 24   )    	
			layer.addChild( node );		

			node.isOn = false
			node.setColor( cc.color( 80,80,80) )

			common_nodes[i] = node
	}

	var control_nodes = []

	for ( var i=0;i< node_pos.length ; i++ ) {
			var x = node_pos[i][0] +x_offset
			var y = node_pos[i][1] +y_offset
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

														var result = 0
														for ( var index in control_nodes ) {
															var ctl_node  = control_nodes[index]
															if (ctl_node.isOn) {
																result += 1 << ( 3-index )
															}
														}


														switcherLables[sender.index ].setString( sender.isOn ? "1" : "0" )

														label_result.setString( result )

														//draw triangle 
														var visibleNodes = []
														for ( var index in all_nodes ) {
															var node = all_nodes[index] 
															if (node.isOn) {
																visibleNodes[ visibleNodes.length ] = node
															} 
														}
														var nVisibleNode=  visibleNodes.length
														cc.log( "visible node number: " , nVisibleNode )

														//clear
														draw_triangle.clear()

														var vertices = [ visibleNodes[0].getPosition() ,  visibleNodes[1].getPosition() ,  visibleNodes[2].getPosition()  ];
       			 										draw_triangle.drawPoly(vertices, null, 3 , cc.color( 128, 128, 128 ));
																									
													}
												)    
			controlNode.index = i
			controlNode.isOn = false
			controlNode.setColor( cc.color( 80,80,80) )

			controlNode.linkNodes= [   common_nodes[i] , common_nodes[(i-1+node_pos.length)%node_pos.length]   ]


			layer.addChild( controlNode );

			var label =  createLabel( "" + i  , 48 , cc.color( 200,0,0 ) ) 
			label.setPosition( cc.p( controlNode.getContentSize().width/2,  controlNode.getContentSize().height/2 ) )
			controlNode.addChild( label );

			control_nodes[i] = controlNode;

	}

	var all_nodes = [  ]
	for (var i=0 ; i< 4 ; i++ ) {
		all_nodes[i*2] = control_nodes[i]
		all_nodes[i*2+1] = common_nodes[i]
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
