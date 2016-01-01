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
        teaserHTML = $('.portfolio-wrap');

        exports.init = function(count, domElement = teaserHTML){

            // Add ajax-loading
            $(domElement).addClass('loading');

            let teaserContent = '',
                portfolioContent = '',
                portfolios,
                jqxhr,
                // Portfolio Modal popups
                portfolioHTML = $('.portfolio-modal').last(),
                // Current portfolios
                current = $('.portfolio-item').length,
                showMore = $('.show-more').css('display', 'block');
                // Set the limit
                limit = current + count;
    
            // Ajax call
            jqxhr = $.getJSON( "js/datda.json", function() {

            })
              .done(function(data) {
                portfolios = data;
              })
              .fail(function(data, error, textStatus) {
                teaserHTML.append('Error</br >');
              });
             
            // Set a completion function for ajax request
            jqxhr.complete(function() {
                
                // Begin loop
                for(let i = current; i < limit; i++){

                    // Check if current portfolio exists
                    if (portfolios[i] === undefined) {

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
                            <img src="img/portfolio/cabin.png" class="img-responsive" alt="">
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
                                        <h2>${portfolios[i].title}</h2>
                                        <hr class="star-primary">
                                        <img src="img/portfolio/game.png" class="img-responsive img-centered" alt="">
                                        <p>${portfolios[i].description}</p>
                                        <ul class="list-inline item-details">
                                            <li>Client:
                                            <strong><a href="${portfolios[i].client.url}">${portfolios[i].client.name}</a>
                                            </strong>
                                            </li>
                                            <li>Date:
                                            <strong><a href="http://startbootstrap.com">${portfolios[i].date}</a>
                                            </strong>
                                            </li>
                                            <li>Service:
                                            <strong><a href="http://startbootstrap.com">${portfolios[i].service}</a>
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

                // Add teaserContent to html / remove class
                teaserHTML.append(teaserContent);

                // Add portfolioContent to html
                portfolioHTML.after(portfolioContent);

                // Remove loading class
                $(domElement).removeClass('loading');

            }); // end .complete
        };

        return exports;

    }());

    // Run func
    displayPortfolios.init(6);

    // Ajax show more
    $('.show-more').on('click', function(event){
        displayPortfolios.init(3, $(event.currentTarget));

    });


}(jQuery); // End of use strict