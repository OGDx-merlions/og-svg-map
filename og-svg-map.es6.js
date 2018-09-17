(function() {
  Polymer({

    is: 'og-svg-map', 

    behaviors: [Polymer.IronResizableBehavior],

    listeners: {
      'iron-resize': '_onIronResize'
    },

    properties: {
      /**
       * Component width
       * 
       * @type {String}
       */
      width: {
        type: String,
        value: '75vw'
      },
      /**
      * Component Height
      * 
      * @type {String}
      */
      height: {
        type: String,
        value: '500px',
        observer: '_adjustFilterVerticalMargin'
      },
      /**
       * Proportion of contextual pane to the whole window
       * Must be less than 1.
       * @type {Number}
       */
      contextPaneProportion: {
        type: Number,
        value: 0.35
      },
      isUpstreamVisible: {
        type: Boolean,
        value: true
      },
      isMidstreamVisible: {
        type: Boolean,
        value: true
      },
      isDownstreamVisible: {
        type: Boolean,
        value: true
      },
      isPredictiveVisible: {
        type: Boolean,
        value: true
      }
    },

    attached() {
      this.contextPaneOpen = false;
      const d3 = Px.d3;
      this.svg  = d3.select("#map svg");
      this.zoomControl = d3.zoom()
        .scaleExtent([1, 5])
        .on("zoom", () => {
          this.svg.attr("transform", d3.event.transform);
      });
      this.mapZoomArea = this.svg
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("cursor", "grab")
        .call(this.zoomControl);
      this._addContextualListeners();
    },

    toggleContextPane() {
      const currHeightNum = this.height.replace(/\D/g, '');
      const cpMinHeightPercentage = this.contextPaneProportion;
      const mapHeightPercentage = (1 - cpMinHeightPercentage);
      if(!this.contextPaneOpen) {
        const newMapHeight = Math.ceil(currHeightNum * mapHeightPercentage);
        this.height = this.height.replace(currHeightNum, newMapHeight);
        this.contextPaneMinHeight = Math.ceil(currHeightNum * cpMinHeightPercentage);
        this.contextPaneOpen = true;
      } else {
        this.height = this.defaultHeight;
        this.contextPaneMinHeight = 0;
        this.contextPaneMaxHeight = 0;
        this.contextPaneOpen = false;
      }
    },

    closeContextPane() {
      if(this.contextPaneOpen) {
        this.toggleContextPane();
      }
    },

    invalidateSize() {
      this.$.map.invalidateSize();
    },
    _showAll(selector) {
      this.querySelectorAll(selector).forEach((elt) => {
        elt.style.display = 'block';
      });
    },
    _hideAll(selector) {
      this.querySelectorAll(selector).forEach((elt) => {
        elt.style.display = 'none';
      });
    },
    _toggleGroup(_stateName, _selector, _pressedCls) {
      if(this[_stateName]) {
        this._hideAll(_selector);
        this[_pressedCls] = 'pressed';
      } else {
        this._showAll(_selector);
        this[_pressedCls] = undefined;
      }
      this[_stateName] = !this[_stateName];
    },
    _toggleUpstream() {
      this._toggleGroup('isUpstreamVisible', 
        '.upstream', 'upstreamPressedCls');
    },
    _toggleMidstream() {
      this._toggleGroup('isMidstreamVisible', 
        '.midstream', 'midstreamPressedCls');
    },
    _toggleDownstream() {
      this._toggleGroup('isDownstreamVisible', 
        '.downstream', 'downstreamPressedCls');
    },
    _togglePredictive() {
      this._toggleGroup('isPredictiveVisible', 
        '.predictive', 'predictivePressedCls');
    },
    _compute(contextPaneOpen) {
      return !contextPaneOpen;
    },
    _adjustFilterVerticalMargin(newHeight, oldHeight) {
      if(!oldHeight) {
        this.defaultHeight = newHeight;
      }
    },
    _onIronResize() {},
    _zoomIn() {
      this.zoomControl.scaleBy(
        this.mapZoomArea.transition().duration(750), 1.3);
    },
    _zoomOut() {
      this.zoomControl.scaleBy(
        this.mapZoomArea.transition().duration(750), 1 / 1.3);
    },
    _addContextualListeners() {
      this.querySelectorAll('.contextual').forEach((elt) => {
        this.listen(elt, 'tap', '_openContextPane');
      });
    },
    /**
    * Fires event when a class named `contextual` is tapped
    *
    *   * {Object} event - Contains the event details
    *   * {Element} contextFragment - Target on which the tap event occured
    *   * {Array} classList - Classes on the tapped element
    *
    * @event contextual-tapped
    */
    _openContextPane(event) {
      if(!this.contextPaneOpen) {
        this.toggleContextPane();
      }
      this.fire('contextual-tapped', {
        event: event, 
        contextFragment: event.currentTarget,
        classList: event.currentTarget.classList
      });
    }
  });
})();
