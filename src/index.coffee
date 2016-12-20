
# conf params
# - considering transforms

# returns bounding rect without considering transforms.
getRect = (el)->
  offsetTop = 0
  offsetHeight = el.offsetHeight
  while el
    offsetTop += el.offsetTop
    el = el.offsetParent

  {
    top: offsetTop - window.pageYOffset
    bottom: offsetTop - window.pageYOffset + offsetHeight
  }

module.exports =
  mounted: ->

    prev = {
      top: false,
      bottom: false
    }

    @vuesibleCallback = =>
      # rect = @$el.getBoundingClientRect()

      rect = getRect @$el

      # console.log rect

      top = rect.top > 0 && rect.top < window.innerHeight
      bottom = rect.bottom > 0 && rect.bottom < window.innerHeight
      inner = rect.top <= 0 && rect.bottom >= window.innerHeight
      fully = (top && bottom) || inner
      partially = (top != bottom) && !inner
      fullyOrPartially = top || bottom || inner

      current = { top, bottom, inner, fully, partially, fullyOrPartially }

      percentVisible = 0
      distanceToScreenCenter =
        top: window.innerHeight / 2 - rect.top
        center: window.innerHeight / 2 - (rect.bottom - rect.top)
        bottom: window.innerHeight / 2 - rect.bottom

      overlapCenter = rect.top <= (window.innerHeight / 2) && rect.bottom >= (window.innerHeight / 2)
      lowerThenCenter = rect.top > (window.innerHeight / 2)

      state = {
        percentVisible,
        distanceToScreenCenter,
        overlapCenter,
        lowerThenCenter
      }


      # TODO: minor event with current state

      @$emit 'visible-temp', state

      if !prev.top && current.top
        @$emit 'top-edge-appeared'

      if prev.top && !current.top
        @$emit 'top-edge-disappeared'

      if !prev.bottom && current.bottom
        @$emit 'bottom-edge-appeared'

      if prev.bottom && !current.bottom
        @$emit 'bottom-edge-disappeared'

      if !prev.fullyOrPartially && current.fullyOrPartially # (!prev.bottom && !prev.top) && (current.bottom || current.top)
        @$emit 'appeared'

      if !prev.fully && current.fully # (!prev.bottom || !prev.top) && (current.bottom && current.top)
        @$emit 'fully-appeared'

      if prev.fullyOrPartially && !current.fullyOrPartially # (prev.bottom || prev.top) && (!current.bottom && !current.top)
        @$emit 'disappeared'

      if prev.fully && !current.fully # (prev.bottom && prev.top) && (!current.bottom || !current.top)
        @$emit 'partially-disappeared'

      prev = current

      # console.log rect

    document.addEventListener 'scroll', @vuesibleCallback, true
  beforeDestroy: ->
    document.removeEventListener 'scroll', @vuesibleCallback
