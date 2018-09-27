'use strict';(function(){Polymer({is:'og-svg-map',behaviors:[Polymer.IronResizableBehavior],listeners:{'iron-resize':'_onIronResize'},properties:{/**
       * Component width
       * 
       * @type {String}
       */width:{type:String,value:'75vw'},/**
      * Component Height
      * 
      * @type {String}
      */height:{type:String,value:'500px',observer:'_adjustFilterVerticalMargin'},/**
       * Proportion of contextual pane to the whole window
       * Must be less than 1.
       * @type {Number}
       */contextPaneProportion:{type:Number,value:0.35},isUpstreamVisible:{type:Boolean,value:true},isMidstreamVisible:{type:Boolean,value:true},isDownstreamVisible:{type:Boolean,value:true},isPredictiveVisible:{type:Boolean,value:true}},attached:function attached(){var _this=this;this.contextPaneOpen=false;var d3=Px.d3;this.svg=d3.select('#map svg');this.zoomControl=d3.zoom().scaleExtent([1,5]).on('zoom',function(){_this.svg.attr('transform',d3.event.transform)});this.mapZoomArea=this.svg.attr('fill','none').attr('pointer-events','all').attr('width','100%').attr('height','100%').style('cursor','grab').call(this.zoomControl);this._addContextualListeners()},toggleContextPane:function toggleContextPane(){var currHeightNum=this.height.replace(/\D/g,'');var cpMinHeightPercentage=this.contextPaneProportion;var mapHeightPercentage=1-cpMinHeightPercentage;if(!this.contextPaneOpen){var newMapHeight=Math.ceil(currHeightNum*mapHeightPercentage);this.height=this.height.replace(currHeightNum,newMapHeight);this.contextPaneMinHeight=Math.ceil(currHeightNum*cpMinHeightPercentage);this.contextPaneOpen=true}else{this.height=this.defaultHeight;this.contextPaneMinHeight=0;this.contextPaneMaxHeight=0;this.contextPaneOpen=false}},closeContextPane:function closeContextPane(){if(this.contextPaneOpen){this.toggleContextPane()}},invalidateSize:function invalidateSize(){this.$.map.invalidateSize()},_showAll:function _showAll(selector){this.querySelectorAll(selector).forEach(function(elt){elt.style.display='block'})},_hideAll:function _hideAll(selector){this.querySelectorAll(selector).forEach(function(elt){elt.style.display='none'})},_toggleGroup:function _toggleGroup(_stateName,_selector,_pressedCls){if(this[_stateName]){this._hideAll(_selector);this[_pressedCls]='pressed'}else{this._showAll(_selector);this[_pressedCls]=undefined}this[_stateName]=!this[_stateName]},_toggleUpstream:function _toggleUpstream(){this._toggleGroup('isUpstreamVisible','.upstream','upstreamPressedCls')},_toggleMidstream:function _toggleMidstream(){this._toggleGroup('isMidstreamVisible','.midstream','midstreamPressedCls')},_toggleDownstream:function _toggleDownstream(){this._toggleGroup('isDownstreamVisible','.downstream','downstreamPressedCls')},_togglePredictive:function _togglePredictive(){this._toggleGroup('isPredictiveVisible','.predictive','predictivePressedCls')},_compute:function _compute(contextPaneOpen){return!contextPaneOpen},_adjustFilterVerticalMargin:function _adjustFilterVerticalMargin(newHeight,oldHeight){if(!oldHeight){this.defaultHeight=newHeight}},_onIronResize:function _onIronResize(){},_zoomIn:function _zoomIn(){this.zoomControl.scaleBy(this.mapZoomArea.transition().duration(500),1.3)},_zoomOut:function _zoomOut(){this.zoomControl.scaleBy(this.mapZoomArea.transition().duration(500),1/1.3)},_addContextualListeners:function _addContextualListeners(){var _this2=this;this.querySelectorAll('.contextual').forEach(function(elt){_this2.listen(elt,'tap','_openContextPane')})},_gotoDefaultLocation:function _gotoDefaultLocation(){this.mapZoomArea.transition().duration(750).call(this.zoomControl.transform,Px.d3.zoomIdentity)},/**
    * Fires event when a class named `contextual` is tapped
    *
    *   * {Object} event - Contains the event details
    *   * {Element} contextFragment - Target on which the tap event occured
    *   * {Array} classList - Classes on the tapped element
    *
    * @event contextual-tapped
    */_openContextPane:function _openContextPane(event){if(!this.contextPaneOpen){this.toggleContextPane()}this.fire('contextual-tapped',{event:event,contextFragment:event.currentTarget,classList:event.currentTarget.classList})}})})();
//# sourceMappingURL=og-svg-map.js.map
