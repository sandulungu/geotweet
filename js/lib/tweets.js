"use strict";
/**
 * Tweets plugin
 */

(function($) {

    // Tweets plugin definition ===============================================
    
    /**
     * Internal function used to load a bunch of tweets from twitter.com and 
     * display thme using the provided template
     */
    var loadTweets = function($container, options, page) {
        $container
            .find('li.more').remove().end()
            .append('<li class="loading">Loading tweets...</li>');

        $.getJSON(
            "http://search.twitter.com/search.json?callback=?", 
            {
                q: options.query, 
                page: page
            }, 
            function(data) {
                $container
                .find('li.loading').remove().end()
                .append($(options.template).render(data.results));

                if (data.next_page) {
                    var $more = $('<li class="more">Show more</li>').click(function() {
                        loadTweets($container, options, page + 1);
                    });
                    $container.append($more);
                }
            }
            );
    };
    
    var methods = $.tweets = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this),
                data = $.extend( {
                    //...
                    }, options);

                $this.data('tweets', data);
                
                $this.html('');
                loadTweets($this, data, 1);
            });
        },
        
        setQuery: function(query) {
            return this.each(function(){
                var $this = $(this),
                data = $this.data('tweets');

                data.query = query;
                $this.data('tweets', data);
                
                $this.html('');
                loadTweets($this, data, 1);
            });
        },
        
        
        
        destroy : function() {
            return this.each(function(){
                var $this = $(this);

                $this.removeData('tweets').html('');
            });
        }
    };
            

    // jQuery wiring ==========================================================
    
    $.fn.tweets = function(method) {
            
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tweets' );
        }
    }
})(jQuery);