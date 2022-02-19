const example = DynamicAdaptive({                //default:
  area: '.area',                                 // '.d-area'
  what: '.what',                                 // '.d-what'         
  from: '.from',                                 // '.d-from'
  to: '.to',                                     // '.d-to'
  mobileFirst: false,                            // true
  screenWidth: 800,                              // 768
  doneClass: 'success',                          // 'done'
});

const example2 = DynamicAdaptive({                //default:
  area: '.area2',                                // '.d-area'
  what: '.what2',                                // '.d-what'         
  from: '.from2',                                // '.d-from'
  to: '.to2',                                    // '.d-to'
  mobileFirst: true,                             // true
  screenWidth: 800,                              // 768
  doneClass: 'success',                          // 'done'
});

function DynamicAdaptive() {

  const defaults = {
    area: '.d-area',
    what: '.d-what',
    from: '.d-from',
    to: '.d-to',
    mobileFirst: true,
    screenWidth: 768,
    doneClass: 'done',
  };

  if (arguments[0] && typeof arguments[0] === "object") {
    this.options = extendDefaults(defaults, arguments[0]);
  }

  // Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  const options = defaults;

  const transferArea = document.querySelectorAll(options.area);

  if (!transferArea) return;

  const screenWidth = options.screenWidth;
  let minMax = 'max';

  if (options.mobileFirst) minMax = 'min';

  const mq = window.matchMedia(`(${minMax}-width: ${screenWidth}px)`);

  function checkSize() {
    if (mq.matches) {
      transferArea.forEach(ta => {
        let tw = ta.querySelector(options.what);
        let tt = ta.querySelector(options.to);
        tt.insertBefore(tw, tt.childNodes[999]);
        ta.classList.add(options.doneClass);
      });
    } else {
      transferArea.forEach(ta => {
        let tw = ta.querySelector(options.what);
        let tf = ta.querySelector(options.from);
        tf.insertBefore(tw, tf.childNodes[999]);
        ta.classList.remove(options.doneClass);
      });
    }
  }
  checkSize();
  mq.addEventListener('change', checkSize);
}
