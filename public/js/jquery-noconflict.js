// Generated by CoffeeScript 1.7.1
(function() {
  define(['jquery'], function(jq) {
    var local;
    local = jq.noConflict();
    local.log = function() {
      if (arguments.length === 1) {
        if (console.log) {
          console.log(arguments[0]);
        }
        return arguments[0];
      } else {
        if (console.log) {
          console.log(arguments);
        }
        return arguments;
      }
    };
    return local;
  });

}).call(this);