// Generated by CoffeeScript 1.7.1
(function() {
  define(['jquery', 'hogan', 'underscore', 'backbone', 'esbb/features'], function($, Hogan, _, Features) {
    var Browser, SubjectsBrowser, applyCounts, subjectTreeTmpl;
    Browser = (function() {
      function Browser() {}

      return Browser;

    })();
    subjectTreeTmpl = Hogan.compile('{{#children.length}} <ul> {{#children}} <li data-resource-count="{{ count }}"> {{{ title }}} {{#count}} ({{ count }}) {{/count}} {{> subject }} </li> {{/children}} </ul> {{/children.length}}');
    SubjectsBrowser = {
      create: function(opts) {
        return new Browser(opts);
      },
      start: function(globalConfig, widget) {
        var $subjects, countsReq, subjectsReq;
        $subjects = widget.view.$el.find('.lr-subjects');
        subjectsReq = $.ajax(globalConfig.domain + '/api/subjects/widget/' + widget.widgetKey + '?jsonp=?', {
          dataType: 'jsonp',
          data: {
            api_key: globalConfig.api_key
          },
          jsonpCallback: 'subjectsCallback',
          cache: true
        });
        countsReq = $.ajax(globalConfig.domain + '/api/subjects/counts/' + widget.widgetKey + '?jsonp=?', {
          dataType: 'jsonp',
          data: {
            api_key: globalConfig.api_key
          },
          jsonpCallback: 'subjectsCountCallback',
          cache: true
        });
        return $.when.apply($, [subjectsReq, countsReq]).done(function(subjectsResult, countsResult) {
          var counts, subjects;
          subjects = {
            children: subjectsResult[0]
          };
          counts = countsResult[0];
          applyCounts(subjects, counts);
          $subjects.html(subjectTreeTmpl.render(subjects, {
            subject: subjectTreeTmpl
          }));
          return $subjects.listview({
            type: 'Subjects',
            listViewTitle: 'Browse by Subject'
          });
        });
      }
    };
    applyCounts = function(subject, counts) {
      subject.count = counts[subject.title];
      if (subject.children) {
        return _.each(subject.children, function(sub) {
          return applyCounts(sub, counts);
        });
      }
    };
    return SubjectsBrowser;
  });

}).call(this);
