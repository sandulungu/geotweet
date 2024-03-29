"use strict";
/**
 * Map plugin and the underlying MyMap class
 */

(function($) {
    
    // MyMap class definition using constructor & prototype pattern ============
    
    /**
     * Creates and configures a new Google Map
     * 
     * @constructor
     */
    window.MyMap = function(element, options) {
        var gmaps = google.maps,
            _this = this;

        this.settings = $.extend({
          initialLocation: new gmaps.LatLng(47.06, 28.86),
          radius: false,
          locationChanged: null
        }, options);
        
        // build map
        this.map = new gmaps.Map(element, {
            center: this.settings.initialLocation,
            zoom: 13,
            scaleControl: true,
            mapTypeId: gmaps.MapTypeId.ROADMAP
        });
        this.marker = new gmaps.Marker({
            position: this.settings.initialLocation,
            map: this.map
        });
        if (this.settings.radius) {
            this.radius = new gmaps.Circle({
                fillColor: "#f00",
                fillOpacity: 0.35,
                center: this.settings.initialLocation,
                strokeWeight: 0,
                radius: this.settings.radius,
                map: this.map
            });
        }
        
        gmaps.event.addListener(this.map, 'click', function(event) {
            _this.setLocation(event.latLng, false);
        });
        gmaps.event.addListener(this.radius, 'click', function(event) {
            _this.setLocation(event.latLng, false);
        });
        
    };
    
    var proto = MyMap.prototype;
    
    /**
     * Places the marker to a new location and triggers locationChanged callback
     *
     * @param google.maps.latLng latLng     New marker location
     * @param bool               centerMap  True to also center map view to the new location
     */
    proto.setLocation = function(latLng, centerMap) {
        this.marker.setPosition(latLng);
        if (this.radius) {
            this.radius.setCenter(latLng);
        }
        if (centerMap) {
            this.map.setCenter(latLng);
        }
        
        if (this.settings.locationChanged) {
            this.settings.locationChanged.apply(this, arguments);
        } 
    };


    // jQuery wiring ==========================================================
    
    $.fn.map = function(method) {
        if (method == 'getInstance') {
            return this.data('map');
        }
        
        return this.each(function() {
            var $this = $(this);
            var map = $this.data('map');
            
            // Method calling logic
            if (map && MyMap.prototype[method]) {
                 map[method] (Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                var options = method;
                $this.data('map', new MyMap( this, options ));
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.map' );
            }
        });
    }
})(jQuery);