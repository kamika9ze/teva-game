(function($) {
    $.dvsHyph = {
        options: {
            shy: $('<i>&shy;</i>').html(),
            spec: '[йьъ]', //"специальные" буквы
            vovel: '[аеёиоуыэюя]', //гласные буквы
            consonant: '[бвгджзклмнпрстфхцчшщ]', //согласные буквы
            letters: '[ьъйаеёиоуыэюябвгджзйклмнпрстфхцчшщъь]',
            rules: []
        },
        run: function(options) {
            var o = $.dvsHyph.options;
            with(o) {
                rules = [ //набор правил (алгоритм)
                    [consonant + vovel, vovel + letters],
                    [vovel + consonant, consonant + vovel],
                    [consonant + vovel, consonant + vovel],
                    [vovel + consonant, consonant + consonant + vovel],
                    [vovel + consonant + consonant, consonant + vovel],
                    [vovel + consonant + consonant, consonant + consonant + vovel],
                    [spec, letters + letters]
                ];
            };
            
            return this.each(function() {
                var t  = $(this);
                var text = t.html();
                
                for (var i = o.rules.length - 1; i >= 0; i--) {
                    var r = o.rules[i];
                    var regexp = new RegExp('(' + r[0] + ')(?=' + r[1] + ')', 'gi');
                    text = text.replace(regexp, '$1' + o.shy);
                }
                t.html(text).css('text-align', 'justify');
            });
        }
    };
    
    $.fn.hyph = $.dvsHyph.run;
})(jQuery);