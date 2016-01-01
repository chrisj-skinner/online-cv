// Theme JavaScript

!function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        let $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Display portfolios
    const displayPortfolios = (function(){

        let exports = {},
        // Intro to portfolios
        teaserHTML = $('.portfolio-wrap'),
        showMore = $('.show-more');

        exports.init = function(count, domElement = teaserHTML){

            // Add ajax-loading
            $(domElement).addClass('loading');

            // Call ajaxCall func
            exports.ajaxCall(count, domElement);
        };  

        exports.ajaxCall = function(count, domElement){

            let teaserContent = '',
                portfolioContent = '',
                portfolios,
                jqxhr,
                // Portfolio Modal popups
                portfolioHTML = $('.portfolio-modal').last(),
                // Current portfolios
                current = $('.portfolio-item').length,
                // Set the limit
                limit = current + count;
    
            // Ajax call
            jqxhr = $.getJSON( "js/datsa.json", function() {

            })
            .done(function(data) {

                // Begin loop
                for(let i = current; i < limit; i++){

                    // Check if current portfolio exists
                    if (data[i] === undefined) {

                        // Change show-more button -> no-more
                        showMore.html('No more').attr('disabled', 'true');

                        // Break out of loop
                        break;
                    };

                    // Build html teaserContent
                    teaserContent += `<div class="col-sm-4 portfolio-item">
                        <a href="#portfolioModal${(i+1)}" class="new portfolio-link" data-toggle="modal">
                            <div class="caption">
                                <div class="caption-content">
                                    <i class="fa fa-search-plus fa-3x"></i>
                                </div>
                            </div>
                            <img src="${data[i].img.sizes.thumbnail}" class="img-responsive" alt="">
                        </a>
                    </div>`;

                    // Build html portfolioContent
                    portfolioContent += `<div class="portfolio-modal modal fade" id="portfolioModal${(i+1)}" tabindex="-1" role="dialog" aria-hidden="true">
                            <div class="modal-content">
                                <div class="close-modal" data-dismiss="modal">
                                    <div class="lr">
                                        <div class="rl">
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-8 col-lg-offset-2">
                                        <div class="modal-body">
                                        <h2>${data[i].title}</h2>
                                        <hr class="star-primary">
                                        <img src="${data[i].img.sizes.full}" class="img-responsive img-centered" alt="">
                                        <p>${data[i].description}</p>
                                        <ul class="list-inline item-details">
                                            <li>Client:
                                            <strong><a href="${data[i].client.url}">${data[i].client.name}</a>
                                            </strong>
                                            </li>
                                            <li>Date:
                                            <strong><a href="#">${data[i].date}</a>
                                            </strong>
                                            </li>
                                            <li>Service:
                                            <strong><a href="#">${data[i].service}</a>
                                            </strong>
                                            </li>
                                        </ul>
                                        <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                } // end for loop

                // Add teaserContent to html with fadeIn
                teaserHTML.append($(teaserContent).fadeIn(1500));

                // Fade in showMore button
                showMore.fadeIn(1250);

                // Add portfolioContent to html
                portfolioHTML.after(portfolioContent);

            })
            .fail(function() {
                // Display error
                teaserHTML.append(
                    `<div class="panel panel-body panel-warning">Could not load portfolios at this time - please try again later</div>`
                    );
            })
            .always(function(){
                // Remove loading
                exports.removeLoading(domElement);
            });

            // Declare removeLoading func
            exports.removeLoading = function(element){
                $(element).removeClass('loading');
            };
        };

        return exports;

    }());

    // Inital run of displayPortfolios func
    // @Params: init (number of items to be displayed)
    displayPortfolios.init(6);

    // Show more button
    $('.show-more').on('click', function(event){
        // Run displayPortfolios func on click
        // @Params: init (number of items to be displayed)
        //          event (clickable event)
        displayPortfolios.init(3, $(event.currentTarget));
    });


}(jQuery); // End of use strict