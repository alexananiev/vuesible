# Live demo

https://alexananiev.com/vuesible

# Instalation

`npm install vuesible --save`

or

`yarn add vuesible`

# Using

```javascript
import Vuesible from 'vuesible'
export default {
  mixins: [Vuesible()]
}
```

```html
<my-component @appeared="doStuff()"/>
```

# Events

Major

- appeared
- fully-appeared
- disapeared
- partially-disapeared
- top-edge-appeared
- top-edge-disappeared
- bottom-edge-appeared
- bottom-edge-disappeared

<!-- Minor

- visibility-changed

## Event payload

```javascript
{
  visible: {
    percent: 30,
    px: 225,
    partially: true,
    fully: false,
    entireViewport: false
  },
  distance: {
    toViewPortCenter: {
      percent:
    }
  }
}
``` -->


# Disclaimer

This is a 'pilot' version. Naming, API, etc. might be changed dramatically in following versions.
