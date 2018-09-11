(function() {
  Polymer({

    is: 'og-svg-map', 

    behaviors: [Polymer.IronResizableBehavior],

    listeners: {'iron-resize': '_onIronResize'},

    properties: {
      /**
       * Component width
       */
      width: {
        type: String,
        value: '75vw',
        observer: '_adjustFilterHorizontalMargin'
      },
      /**
      * Component Height
      */
      height: {
        type: String,
        value: '500px',
        observer: '_adjustFilterVerticalMargin'
      },
      contextPaneProportion: {
        type: Number,
        value: 0.35
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
      this.mapZoomArea = this.svg.append("rect")
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("cursor", "grab")
        .call(this.zoomControl);
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

    invalidateSize() {
      this.$.map.invalidateSize();
      this._adjustFilterHorizontalMargin();
    },
    _removePressed() {
      this.upstreamPressedCls = undefined;
      this.midstreamPressedCls = undefined;
      this.downstreamPressedCls = undefined;
      this.predictivePressedCls = undefined;
    },
    _backup(key) {
      if(this[key] && this[key].type) {
        this[`_${key}`] = this[key];
        this[key] = undefined;
        document.querySelector(`#${key}`).redraw();
      }
    },
    _restore(key) {
      const _key = `_${key}`;
      if(this[_key] && this[_key].type) {
        this[key] = this[_key];
        this[_key] = undefined;
        document.querySelector(`#${key}`).redraw();
      }
    },
    _hideAll() {
      this._removePressed();
      this._backup('upstream');
      this._backup('midstream');
      this._backup('downstream');
      this._backup('predictive');
    },
    _showAll() {
      this._removePressed();
      this._restore('upstream');
      this._restore('midstream');
      this._restore('downstream');
      this._restore('predictive');
    },
    _toggleUpstreamOnly() {
      if(!this.upstreamPressedCls) {
        this._hideAll();
        this.upstreamPressedCls = 'pressed';
        this._restore('upstream');
      } else {
        this._showAll();
      }
    },
    _toggleMidstreamOnly() {
      if(!this.midstreamPressedCls) {
        this._hideAll();
        this.midstreamPressedCls = 'pressed';
        this._restore('midstream');
      } else {
        this._showAll();
      }
    },
    _toggleDownstreamOnly() {
      if(!this.downstreamPressedCls) {
        this._hideAll();
        this.downstreamPressedCls = 'pressed';
        this._restore('downstream');
      } else {
        this._showAll();
      }
    },
    _togglePredictiveOnly() {
      if(!this.predictivePressedCls) {
        this._hideAll();
        this.predictivePressedCls = 'pressed';
        this._restore('predictive');
      } else {
        this._showAll();
      }
    },
    _shouldHide(bool) {
      return bool;
    },
    _adjustFilterHorizontalMargin(newWidth, oldWidth) {},
    _adjustFilterVerticalMargin(newHeight, oldHeight) {
      if(!oldHeight) {
        this.defaultHeight = newHeight;
      }
    },
    _compute(contextPaneOpen) {
      return !contextPaneOpen;
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
  });
})();
