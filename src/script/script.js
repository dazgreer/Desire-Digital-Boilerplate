// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


// define Modernizr
define('modernizr', [], Modernizr);

// define jQuery
define(['jquery'], function($) {

    // load plugins
    require(['plugins.min'], function() {

        // define site object
        var site = {

            // SITE WIDE SETTINGS
            // --------------------------------------------------------------------------------------
            
            settings: {

                // cache some common variables
                $window: $(window),
                $html: $('html'),
                $body: $('body'),
                $htmlbody: $('html,body'),
                $header: $('.header'),
                $main: $('.main'),
                $footer: $('.footer'),

                // breakpoint variables (should match 00c_variables.less)
                breakPointA: 320,
                breakPointB: 540,
                breakPointC: 768,
                breakPointD: 960,
                breakPointF: 1280

            },

            functions: {

                /*
                --------------------------------------------------------------------------------------
                F: SET GLOBAL VARIABLES AND FUNCTIONS
                --------------------------------------------------------------------------------------

                F1. WINDOW/VIEWPORT DIMENSIONS

                F2. DEVICE/BROWSER DETECTION

                F3. RESIZE/ORIENTATION CHANGE FUNCTION

                F5. ELEMENT EXISTS
                    Check if an element exists on the page

                F6. READY/INIT FUNCTION
                    Tests if all functions are available and init site script

                --------------------------------------------------------------------------------------
                */

                /*
                DETECTIZR
                http://barisaydinoglu.github.io/Detectizr/
                https://github.com/barisaydinoglu/Detectizr
                */
                    
                detect: {

                    init: function() {

                        Detectizr.detect({
                            addAllFeaturesAsClass: true,
                            detectBrowser: true
                        });
                    },



                    // F1. WINDOW/VIEWPORT DIMENSIONS
                    // --------------------------------------------------------------------------------------

                    winDimensions: function(d) {
                        
                        var winWidth = site.settings.$window.width(),
                            winHeight = site.settings.$window.height();
                        
                        if(d === 'w') {
                            return winWidth;
                        }

                        if(d === 'h') {
                            return winHeight;
                        }

                    },

                    viewportDimensions: function(d) {
                        
                        var viewWidth = viewportSize.getWidth(),
                            viewHeight = viewportSize.getHeight();
                        
                        if(d === 'w') {
                            return viewWidth;
                        }

                        if(d === 'h') {
                            return viewHeight;
                        }
                    },



                    // F2. DEVICE/BROWSER DETECTION
                    // -------------------------------------------------------------------------------------

                    deviceType: function() {
                       return Detectizr.device.type;
                       //console.log(Detectizr.device.type);
                    },

                    orientation: function() {
                       return Detectizr.device.orientation;
                       //console.log(Detectizr.device.orientation);
                    },

                    browser: function() {
                       return Detectizr.browser.name;
                       //console.log(Detectizr.device.browser);
                    },

                    browserEngine: function() {
                       return Detectizr.browser.engine;
                       //console.log(Detectizr.device.browserEngine);
                    },

                    mediaQuery: function(mq) {
                       return Modernizr.mq(mq);
                       //console.log(Modernizr.mq);
                    }
                },


                // F3. RESIZE/ORIENTATION CHANGE FUNCTION
                // --------------------------------------------------------------------------------------


                resize: {

                    init: function() {

                        site.settings.$window.on("debouncedresize", function() {

                            if( $('html').attr('class').indexOf('ios') === -1) {
                        
                                site.functions.resize.change();

                            }
                            
                        });
                        
                        site.settings.$window.bind('orientationchange', site.functions.resize.orientationChange);

                    },
                
                    change: function () {

                        console.log('change');

                        // G9. EQUALISE HEIGHTS
                        site.scriptGeneric.equaliseHeights.init();

                    },

                    orientationChange: function () {

                        site.functions.resize.change();

                    }

                },



                // F4. ELEMENT EXISTS - Check if an element exists on the page
                // --------------------------------------------------------------------------------------

                exists: function (el) {
                    return el.length > 0;
                },



                // F5. READY/INIT FUNCTION  - Tests if all functions are available and starts site script
                // --------------------------------------------------------------------------------------

                ready: {

                    init: function() {

                        // init functions
                        site.functions.detect.init();
                        site.functions.resize.init();

                        // test functions
                        site.functions.ready.setTime()
                    },

                    test: function() {

                        if(site.functions.detect.winDimensions('w') !== undefined &&
                            site.functions.detect.viewportDimensions('w') !== undefined &&
                            site.functions.detect.deviceType() !== undefined &&
                            site.functions.detect.orientation() !== undefined &&
                            site.functions.detect.browser() !== undefined &&
                            site.functions.detect.browserEngine() !== undefined &&
                            site.functions.detect.mediaQuery() !== undefined) {

                            // init site
                            site.init();

                        } else {
                            site.functions.ready.setTime()
                        }
                        
                    },

                    setTime: function() {

                        setTimeout(site.functions.ready.test, 250);

                    }
                }

            },

            browserFixes: {

                /*
                --------------------------------------------------------------------------------------
                B: BROWSER FIX INDEX
                --------------------------------------------------------------------------------------

                B1. JQUERY PLACEHOLDER
                    Adds retro support for older browsers 

                --------------------------------------------------------------------------------------
                */

                // B1. JQUERY PLACEHOLDER
                // Adds retro support for older browsers
                // https://github.com/mathiasbynens/jquery-placeholder
                // -------------------------------------------------------------------------------


                    // placeholder: {
                        
                    //     init: function () {        
                    //         $('[placeholder]').placeholder();
                    //     }

                    // }


            },

            plugins: {

                /*
                --------------------------------------------------------------------------------------
                P: PLUGINS INDEX
                --------------------------------------------------------------------------------------

                P1. XXXX
                    xxxx

                --------------------------------------------------------------------------------------
                */

                // P1. XXXX
                // xxxx
                // -------------------------------------------------------------

            },

            scriptGeneric: {


                /*
                --------------------------------------------------------------------------------------
                G: GENERIC SCRIPT INDEX
                --------------------------------------------------------------------------------------

                G1. EXTERNAL LINKS
                    Open in a new window

                G2. FILE INPUTS
                    Update when selected

                G3. NUMBER FIELDS
                    Add spinner functionality

                G4. MOBILE NAV
                    Show/hide

                G5. TABS
                    Tabbed content

                G6. MEGANAV
                    Show/hide

                G7. TOOLTIPS
                    Tooltips on links

                G8. SCROLL PAGE
                    Generic function to scroll the page

                G9. EQUALISE HEIGHTS
                    Equalise heights of elements so they line up

                G10. SHOW/HIDE
                     Show/hide with AJAX

                --------------------------------------------------------------------------------------
                */


                // G1. EXTERNAL LINKS
                // Open in a new window
                // --------------------------------------------------------------------------------------

                    externalLinks: {

                        init: function () {

                            // vars
                            var urls = ['www.example.com', 'localhost'];

                            // action
                            $('a[href*="http"], a[href$="pdf"]').each(function() {

                                var $this = $(this);

                                if ($.grep(urls, function(str) { return $this.attr('href').indexOf(str) > -1; }).length > 0) {

                                } else {
                                
                                    $this.on('click.externalLinks', function(e) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(this.href, '_blank');
                                    });

                                }

                            });

                        }

                    },



                // G2. FILE INPUTS
                // Update when selected
                // --------------------------------------------------------------------------------------

                    fileInputs: {

                        init: function () {

                            // vars
                            var $container = $('.file-container'),
                                $fileInput = $('input[type=file]'),
                                $file = $('.file');

                            // action
                            $container.each(function() {

                                var $this = $(this),
                                    file = $this.find($file).text();

                                $this.find($file).on('click.fileInputs', function() {
                                    $this.find($fileInput).click();
                                });

                                $this.find($fileInput).on('change.fileInputs', function() {

                                    var val = $(this).val().split('\\'),
                                        name = val[val.length-1];

                                    if(val === "") {
                                        $this.find($file).text(file);
                                    } else {
                                        $this.find($file).text(name);
                                    }

                                });     
                                    
                            });

                        }

                    },



                // G3. NUMBER FIELDS
                // Add spinner functionality
                // --------------------------------------------------------------------------------------

                    numberFields: {

                        init: function () {

                            // vars
                            var up = 'number-up',
                                $up = $('.'+up),
                                down = 'number-down',
                                $down = $('.'+down),
                                $handler = $.merge($up, $down);

                            // action
                            $handler.off( "click", "**" );

                            $handler.on('click.numberFields', function(e) {
                                e.preventDefault();

                                var $this = $(this),
                                    $input = $this.parent().find('input'),
                                    min = $input.attr('min'),
                                    max = $input.attr('max'),
                                    oldValue = $input.val(),
                                    newVal;

                                $input.focus();

                                if ($this.hasClass(up)) {

                                    // Don't allow incrementing above the max zero
                                    if (oldValue < max) {
                                        newVal = parseFloat(oldValue) + 1;
                                    } else {
                                        newVal = max;
                                    }
                                    
                                } else {
                                
                                    // Don't allow decrementing below zero
                                    if (oldValue > min) {
                                        newVal = parseFloat(oldValue) - 1;
                                    } else {
                                        newVal = min;
                                    }

                                }

                                $this.parent().find('input').val(newVal);

                            });

                        }
                    },



                // G4. MOBILE NAV
                // Show/hide
                // --------------------------------------------------------------------------------------

                    mobileNav: {

                        init: function () {

                            // vars
                            var $handler = $('[data-mobilenav="handler"]'),
                                target = $handler.attr('href');

                            // action
                            $(target).addClass('show');

                            $handler.on('click.mobileNav', function (e) {
                                e.preventDefault();
                                
                                $(target).slideToggle();
                            });

                        }

                    },



                // G5. TABS
                // Tabbed content
                // --------------------------------------------------------------------------------------

                    tabs: {

                        init: function () {

                            // vars
                            var $handler = $('[data-tabs="handler"] a'),
                                $tabs = $('[data-tabs="tab"]')
                                start = 0;

                            // setup
                            $tabs.hide();
                            $tabs.eq(start).show();
                            $handler.eq(start).addClass('active');

                            // actions
                            $handler.each(function(i) {
                                
                                var $this = $(this),
                                    target = $this.attr('href');

                                $this.on('click.wcgTabs', function (e) {
                                    e.preventDefault();

                                    $tabs.hide();
                                    $(target).show();
                                    
                                    $handler.removeClass('active');
                                    $this.addClass('active');

                                });
                                    
                            });

                        }

                    },



                // G6. MEGANAV
                // Show/hide
                // --------------------------------------------------------------------------------------

                    megaNav: {

                        init: function () {

                            // vars
                            var $container = $('[data-meganav="container"]'),
                                $handler = $('[data-meganav="handler"]'),
                                $target = $('[data-meganav="target"]');

                            // action
                            $container.each(function(i) {

                                var $this = $(this),
                                    target = '#' + $this.find($target).attr('id'),
                                    href = $this.find($handler).attr('href');

                                $this.find($handler).attr('href', target);

                                $this.find($handler).on({
                                    'click.meganav': function (e) {
                                        e.preventDefault();

                                        if($(this).hasClass('show')) {
                                            $target.hide();
                                            $handler.removeClass('show');
                                        } else {
                                            $target.hide();
                                            $handler.removeClass('show');
                                            $(target).slideToggle();
                                            $(this).addClass('show');
                                        }
                                    }
                                    // ,
                                    // 'mouseleave.meganav': function () {
                                    //     $(this).click();
                                    // }
                                });

                            });

                        }

                    },



                // G7. TOOLTIPS
                // Tooltips on links
                // --------------------------------------------------------------------------------------

                    tooltips: {

                        init: function () {

                            // vars
                            var $container = $('[data-tooltips="true"]'),
                                $handler = $container.find('a'),
                                text = $container.data('tooltips-text'),
                                tooltip = '<span class="tooltip">' + text + '</span>';

                            // actions
                            $handler.each(function(i) {

                                var $this = $(this);

                                $this.append(tooltip);

                                $(document).on('mousemove', function(e){

                                    var $tooltip = $this.find('.tooltip'),
                                        tooltipWidth = $tooltip.outerWidth(),
                                        tooltipHeight = $tooltip.outerHeight()
                                        arrowHeight = 10;

                                    $tooltip.css({
                                       left:  e.pageX - tooltipWidth/2,
                                       top:   e.pageY - tooltipHeight - arrowHeight
                                    });
                                });
                                    
                            });

                        }

                    },



                // G8. SCROLL PAGE
                // Generic function to scroll the page
                // -------------------------------------------------------------

                    scrollPage: {

                        init: function() {

                            // vars
                            var $handler = $('[data-scrollpage="true"]');

                            $handler.each(function(i) {
                                
                                var $this = $(this),
                                    target = $handler.attr('href'),
                                    duration = 500,
                                    offset = 0;

                                $this.on('click.scroll', function (e) {
                                    e.preventDefault();

                                    // animate page
                                    site.scriptGeneric.scrollPage.init(target, offset, duration);

                                });

                                    
                            });

                        },

                        scroll: function (target, offset, duration) {

                            $('html, body').animate({ scrollTop: $(target).offset().top - offset }, duration);

                        }

                    },



                // G9. EQUALISE HEIGHTS
                // Equalise heights of elements so they line up
                // --------------------------------------------------------------------------------------

                    equaliseHeights: {

                        init: function () {

                            // vars
                            var $container = $('[data-equaliseheights]'),
                                height;

                            // actions

                            $container.each(function(i) {

                                var $this = $(this),
                                    target = $this.data('equaliseheights').split(',');

                                for(var i=0; i<target.length; i++){

                                    $this.find(target[i]).height('auto');

                                    var height = 0;

                                    $this.find(target[i]).each(function(i) {

                                        if($(this).height() > height) {
                                            height = $(this).height()
                                        }

                                    });

                                    $this.find(target[i]).height(height);
                                }

                            });

                        }

                    },



                // G10. SHOW/HIDE
                // Simple show/hide and complex show/hide with AJAX
                // --------------------------------------------------------------------------------------

                    showHide: {

                        simple: {

                            init: function () {

                                // vars
                                var $handler = $('[data-showhide="handler"]');

                                // actions
                                $handler.each(function(i) {
                                    
                                    var $this = $(this),
                                        target = $this.attr('href'),
                                        textShow = $this.text();
                                        textHide = $this.data('showhide-hide');

                                    $(target).hide();

                                    $this.on('click.simpleShowHide', function(e) {
                                        e.preventDefault();

                                        $(target).slideToggle();
                                        $this.toggleClass('show');

                                        if($this.hasClass('show')) {
                                            $this.text(textHide);
                                        } else {
                                            $this.text(textShow);
                                        }


                                    });
                                        
                                });

                            }

                        }

                    }

            },

            scriptCustom: {

                /*
                --------------------------------------------------------------------------------------
                C: CUSTOM SCRIPT INDEX
                --------------------------------------------------------------------------------------

                G1. TITLE
                    Description

                --------------------------------------------------------------------------------------
                */

            },

            init: function () {

                console.log('init');

                // BROWSER FIXES

                    //if( site.functions.exists( $('.lt-ie10') ) ) {

                        //require(['plugins.ltie10.min'], function() {

                            // B1. JQUERY PLACEHOLDER
                            //site.browserFixes.placeholder.init();

                        //});

                    //}



                // PLUGINS

                    // P1. TITLE



                // GENERIC

                    // G1. EXTERNAL LINKS
                    site.scriptGeneric.externalLinks.init();

                    // G2. FILE INPUTS
                    site.scriptGeneric.fileInputs.init();

                    // G3. NUMBER FIELDS
                    site.scriptGeneric.numberFields.init();

                    // G4. MOBILE NAV
                    site.scriptGeneric.mobileNav.init();

                    // G5. TABS
                    site.scriptGeneric.tabs.init();
 
                    // G6. MEGANAV
                    site.scriptGeneric.megaNav.init();

                    // G7. TOOLTIPS
                    site.scriptGeneric.tooltips.init();

                    // G8. SCROLL PAGE
                    site.scriptGeneric.scrollPage.init();

                    // G9. EQUALISE HEIGHTS
                    site.scriptGeneric.equaliseHeights.init();

                    // G10. SHOW/HIDE
                    site.scriptGeneric.showHide.simple.init();



                // CUSTOM

                    // C1. TITLE



            }
        };

        // test if functions have loaded
        site.functions.ready.init();
        

    }); // close plugins init

}); // close jQuery init