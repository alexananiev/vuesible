var getRect;

getRect = function(el) {
  var offsetHeight, offsetTop;
  offsetTop = 0;
  offsetHeight = el.offsetHeight;
  while (el) {
    offsetTop += el.offsetTop;
    el = el.offsetParent;
  }
  return {
    top: offsetTop - window.pageYOffset,
    bottom: offsetTop - window.pageYOffset + offsetHeight
  };
};

module.exports = {
  mounted: function() {
    var prev;
    prev = {
      top: false,
      bottom: false
    };
    this.vuesibleCallback = (function(_this) {
      return function() {
        var bottom, current, distanceToScreenCenter, fully, fullyOrPartially, inner, lowerThenCenter, overlapCenter, partially, percentVisible, rect, state, top;
        rect = getRect(_this.$el);
        top = rect.top > 0 && rect.top < window.innerHeight;
        bottom = rect.bottom > 0 && rect.bottom < window.innerHeight;
        inner = rect.top <= 0 && rect.bottom >= window.innerHeight;
        fully = (top && bottom) || inner;
        partially = (top !== bottom) && !inner;
        fullyOrPartially = top || bottom || inner;
        current = {
          top: top,
          bottom: bottom,
          inner: inner,
          fully: fully,
          partially: partially,
          fullyOrPartially: fullyOrPartially
        };
        percentVisible = 0;
        distanceToScreenCenter = {
          top: window.innerHeight / 2 - rect.top,
          center: window.innerHeight / 2 - (rect.bottom - rect.top),
          bottom: window.innerHeight / 2 - rect.bottom
        };
        overlapCenter = rect.top <= (window.innerHeight / 2) && rect.bottom >= (window.innerHeight / 2);
        lowerThenCenter = rect.top > (window.innerHeight / 2);
        state = {
          percentVisible: percentVisible,
          distanceToScreenCenter: distanceToScreenCenter,
          overlapCenter: overlapCenter,
          lowerThenCenter: lowerThenCenter
        };
        _this.$emit('visible-temp', state);
        if (!prev.top && current.top) {
          _this.$emit('top-edge-appeared');
        }
        if (prev.top && !current.top) {
          _this.$emit('top-edge-disappeared');
        }
        if (!prev.bottom && current.bottom) {
          _this.$emit('bottom-edge-appeared');
        }
        if (prev.bottom && !current.bottom) {
          _this.$emit('bottom-edge-disappeared');
        }
        if (!prev.fullyOrPartially && current.fullyOrPartially) {
          _this.$emit('appeared');
        }
        if (!prev.fully && current.fully) {
          _this.$emit('fully-appeared');
        }
        if (prev.fullyOrPartially && !current.fullyOrPartially) {
          _this.$emit('disappeared');
        }
        if (prev.fully && !current.fully) {
          _this.$emit('partially-disappeared');
        }
        return prev = current;
      };
    })(this);
    return document.addEventListener('scroll', this.vuesibleCallback, true);
  },
  beforeDestroy: function() {
    return document.removeEventListener('scroll', this.vuesibleCallback);
  }
};
