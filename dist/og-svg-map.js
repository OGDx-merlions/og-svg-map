'use strict';(function(){Polymer({is:'og-svg-map',behaviors:[Polymer.IronResizableBehavior],listeners:{'iron-resize':'_onIronResize'},properties:{/**
       * Component width
       */width:{type:String,value:'75vw',observer:'_adjustFilterHorizontalMargin'},/**
      * Component Height
      */height:{type:String,value:'500px',observer:'_adjustFilterVerticalMargin'},/**
       * The zoom level of the active map. Can be used to set or update
       * the zoom level of the map, or read from after the user changes the
       * map zoom level to an updated value.
       *
       * @type {Number}
       */zoom:{type:Number,value:10},/**
       * The maximum zoom level for the active map (the furthest the user can
       * zoom in). Setting it at the map level will take precedence over the
       * max zoom of all other layers, including tile layers. If you need to
       * set different zoom bounds based on the visible tile layer, set the
       * max zoom directly on your tile layer.
       *
       * @type {Number}
       */maxZoom:{type:Number},/**
      * The minimum zoom level for the active map (the furthest the user can
      * zoom out). Setting it at the map level will take precedence over the
      * min zoom of all other layers, including tile layers. If you need to
      * set different zoom bounds based on the visible tile layer, set the
      * min zoom directly on your tile layer.
       *
       * @type {Number}
       */minZoom:{type:Number},contextPaneProportion:{type:Number,value:0.35},toggleMarginTop:{type:String},toggleMarginLeft:{type:String}},attached:function attached(){this.contextPaneOpen=false},toggleContextPane:function toggleContextPane(){var currHeightNum=this.height.replace(/\D/g,'');var cpMinHeightPercentage=this.contextPaneProportion;var mapHeightPercentage=1-cpMinHeightPercentage;if(!this.contextPaneOpen){var newMapHeight=Math.ceil(currHeightNum*mapHeightPercentage);this.height=this.height.replace(currHeightNum,newMapHeight);this.contextPaneMinHeight=Math.ceil(currHeightNum*cpMinHeightPercentage);this.contextPaneOpen=true}else{this.height=this.defaultHeight;this.contextPaneMinHeight=0;this.contextPaneMaxHeight=0;this.contextPaneOpen=false}},invalidateSize:function invalidateSize(){this.$.map.invalidateSize();this._adjustFilterHorizontalMargin()},_removePressed:function _removePressed(){this.upstreamPressedCls=undefined;this.midstreamPressedCls=undefined;this.downstreamPressedCls=undefined;this.predictivePressedCls=undefined},_backup:function _backup(key){if(this[key]&&this[key].type){this['_'+key]=this[key];this[key]=undefined;document.querySelector('#'+key).redraw()}},_restore:function _restore(key){var _key='_'+key;if(this[_key]&&this[_key].type){this[key]=this[_key];this[_key]=undefined;document.querySelector('#'+key).redraw()}},_hideAll:function _hideAll(){this._removePressed();this._backup('upstream');this._backup('midstream');this._backup('downstream');this._backup('predictive')},_showAll:function _showAll(){this._removePressed();this._restore('upstream');this._restore('midstream');this._restore('downstream');this._restore('predictive')},_toggleUpstreamOnly:function _toggleUpstreamOnly(){if(!this.upstreamPressedCls){this._hideAll();this.upstreamPressedCls='pressed';this._restore('upstream')}else{this._showAll()}},_toggleMidstreamOnly:function _toggleMidstreamOnly(){if(!this.midstreamPressedCls){this._hideAll();this.midstreamPressedCls='pressed';this._restore('midstream')}else{this._showAll()}},_toggleDownstreamOnly:function _toggleDownstreamOnly(){if(!this.downstreamPressedCls){this._hideAll();this.downstreamPressedCls='pressed';this._restore('downstream')}else{this._showAll()}},_togglePredictiveOnly:function _togglePredictiveOnly(){if(!this.predictivePressedCls){this._hideAll();this.predictivePressedCls='pressed';this._restore('predictive')}else{this._showAll()}},_shouldHide:function _shouldHide(bool){return bool},_adjustFilterHorizontalMargin:function _adjustFilterHorizontalMargin(newWidth,oldWidth){},_adjustFilterVerticalMargin:function _adjustFilterVerticalMargin(newHeight,oldHeight){if(!oldHeight){this.defaultHeight=newHeight}},_compute:function _compute(contextPaneOpen){return!contextPaneOpen},_onIronResize:function _onIronResize(){}})})();
//# sourceMappingURL=og-svg-map.js.map
