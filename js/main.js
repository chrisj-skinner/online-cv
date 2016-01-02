// Freelancer Theme JavaScript

!function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
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
    const displayPortfolios = function(){

            // Set sticky points
            // Intro to portfolios
        let teaserHTML = $('.portfolio-wrap'),
            // Portfolio Modal popups
            portfolioHTML = $('footer'),
            // Current portfolios
            current = $('.portfolio-item').length,
            limit = current + 4;
            console.log(current);

        const init = function(){
            getData();
        };

        const getData = function(){
            // Ajax call here
            let teaserContent = '',
                portfolioContent = '',
                portfolios = [
                    {
                        "title": "Project Title 1",
                        "img": {
                            "sizes": {
                                "thumbnail": "img/portfolio/submarine.png",
                                "full": "img/portfolio/submarine.png"
                            },
                        },
                        "url": "#",
                        "description": "Use this area of the page to describe your project. The icon above is part of a free icon set by <a href='https://sellfy.com/p/8Q9P/jV3VZ/'>Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!",
                        "client": {
                            "name": "Start Bootstrap",
                            "url": "#"
                        },
                        "date": "April 2014",
                        "service": "Web Development"
                    },
                    {
                        "title": "Project Title 2",
                        "img": {
                            "sizes": {
                                "thumbnail": "img/portfolio/submarine.png",
                                "full": "img/portfolio/submarine.png"
                            },
                        },
                        "url": "#",
                        "description": "Use this area of the page to describe your project. The icon above is part of a free icon set by <a href='https://sellfy.com/p/8Q9P/jV3VZ/'>Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!",
                        "client": {
                            "name": "Start Bootstrap",
                            "url": "#"
                        },
                        "date": "April 2014",
                        "service": "Web Development"
                    },
                    {
                        "title": "Project Title 3",
                        "img": {
                            "sizes": {
                                "thumbnail": "img/portfolio/submarine.png",
                                "full": "img/portfolio/submarine.png"
                            },
                        },
                        "url": "#",
                        "description": "Use this area of the page to describe your project. The icon above is part of a free icon set by <a href='https://sellfy.com/p/8Q9P/jV3VZ/'>Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!",
                        "client": {
                            "name": "Start Bootstrap",
                            "url": "#"
                        },
                        "date": "April 2014",
                        "service": "Web Development"
                    },
                    {
                        "title": "Project Title 4",
                        "img": {
                            "sizes": {
                                "thumbnail": "img/portfolio/submarine.png",
                                "full": "img/portfolio/submarine.png"
                            },
                        },
                        "url": "#",
                        "description": "Use this area of the page to describe your project. The icon above is part of a free icon set by <a href='https://sellfy.com/p/8Q9P/jV3VZ/'>Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!",
                        "client": {
                            "name": "Start Bootstrap",
                            "url": "#"
                        },
                        "date": "April 2014",
                        "service": "Web Development"
                    },
                    {
                        "title": "Project Title 5",
                        "img": {
                            "sizes": {
                                "thumbnail": "img/portfolio/submarine.png",
                                "full": "img/portfolio/submarine.png"
                            },
                        },
                        "url": "#",
                        "description": "Use this area of the page to describe your project. The icon above is part of a free icon set by <a href='https://sellfy.com/p/8Q9P/jV3VZ/'>Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!",
                        "client": {
                            "name": "Start Bootstrap",
                            "url": "#"
                        },
                        "date": "April 2014",
                        "service": "Web Development"
                    },
                    {
                        "title": "Project Title 6",
                        "img": {
                            "sizes": {
                                "thumbnail": "img/portfolio/submarine.png",
                                "full": "img/portfolio/submarine.png"
                            },
                        },
                        "url": "#",
                        "description": "Use this area of the page to describe your project. The icon above is part of a free icon set by <a href='https://sellfy.com/p/8Q9P/jV3VZ/'>Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!",
                        "client": {
                            "name": "Start Bootstrap",
                            "url": "#"
                        },
                        "date": "April 2014",
                        "service": "Web Development"
                    },
                    {
                        "title": "Project Title 7",
                        "img": {
                            "sizes": {
                                "thumbnail": "img/portfolio/submarine.png",
                                "full": "img/portfolio/submarine.png"
                            },
                        },
                        "url": "#",
                        "description": "Use this area of the page to describe your project. The icon above is part of a free icon set by <a href='https://sellfy.com/p/8Q9P/jV3VZ/'>Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!",
                        "client": {
                            "name": "Start Bootstrap",
                            "url": "#"
                        },
                        "date": "April 2014",
                        "service": "Web Development"
                    },
                    {
                        "title": "Project Title 8",
                        "img": {
                            "sizes": {
                                "thumbnail": "img/portfolio/submarine.png",
                                "full": "img/portfolio/submarine.png"
                            },
                        },
                        "url": "#",
                        "description": "<p>Use this area of the page to describe your project. The icon above is part of a free icon set by <a href='https://sellfy.com/p/8Q9P/jV3VZ/'>Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!</p>",
                        "client": {
                            "name": "Start Bootstrap",
                            "url": "#"
                        },
                        "date": "April 2014",
                        "service": "Web Development"
                    }
                ];

            console.log(current);
            for(let i = current; i < limit; i++){
                if (portfolios[i] === undefined) {
                    // Change show-more button -> no-more
                    $('.show-more').css('display', 'none');
                    // Break out of loop
                    break;
                };

                // Build html teaserContent
                console.log(portfolios[i].title);
                teaserContent += `<div class="col-sm-4 portfolio-item">
                    <a href="#portfolioModal` + (i+1) + `" class="new portfolio-link" data-toggle="modal">
                        <div class="caption">
                            <div class="caption-content">
                                <i class="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src="img/portfolio/cabin.png" class="img-responsive" alt="">
                    </a>
                </div>`;

                // Build html portfolioContent
                portfolioContent += `<div class="portfolio-modal modal fade" id="portfolioModal` + (i+1) + `" tabindex="-1" role="dialog" aria-hidden="true">
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
                                    <h2>` + portfolios[i].title + `</h2>
                                    <hr class="star-primary">
                                    <img src="img/portfolio/game.png" class="img-responsive img-centered" alt="">
                                    <p>` + portfolios[i].description + `</p>
                                    <ul class="list-inline item-details">
                                        <li>Client:
                                        <strong><a href="` + portfolios[i].client.url + `">` + portfolios[i].client.name + `</a>
                                        </strong>
                                        </li>
                                        <li>Date:
                                        <strong><a href="http://startbootstrap.com">` + portfolios[i].date + `</a>
                                        </strong>
                                        </li>
                                        <li>Service:
                                        <strong><a href="http://startbootstrap.com">` + portfolios[i].service + `</a>
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

            // Add teaserContent to html
            teaserHTML.append(teaserContent);
            console.log(teaserContent);

            // Add portfolioContent to html
            portfolioHTML.append(portfolioContent);
            console.log(portfolioContent);
        };

        return init;

    }();

    // Run func
    // displayPortfolios();

    // Ajax show more
    $('.show-more').on('click', function(){
        displayPortfolios();
    });

}(jQuery); // End of use strict




