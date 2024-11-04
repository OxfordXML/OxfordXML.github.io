/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Header Search
4. Init Menu
5. Init Timer


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var hamb = $('.hamburger');
	var menuActive = false;
	var menu = $('.menu');

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initHeaderSearch();
	initMenu();
	initTimer();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Header Search

	*/

	function initHeaderSearch()
	{
		if($('.search_button').length)
		{
			$('.search_button').on('click', function()
			{
				if($('.header_search_container').length)
				{
					$('.header_search_container').toggleClass('active');
				}
			});
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu()
	{
		if(hamb.length)
		{
			if(menu.length)
			{
				hamb.on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();
					}
				});	
	
				$('.menu_close').on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();
					}
				});
	
				// Add this part to close the menu when a menu item is clicked
				$('.menu_nav a').on('click', function() {
					if(menuActive)
					{
						closeMenu();
					}
				});
			}
		}
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	/* 

	5. Init Timer

	*/

	function initTimer()
	{
		if($('.event_timer').length)
    	{
    		// Uncomment line below and replace date
	    	// var target_date = new Date("April 7, 2018").getTime();

	    	// comment lines below
	    	var date = new Date();
	    	date.setDate(date.getDate() + 3);
	    	var target_date = date.getTime();
	    	//----------------------------------------
	 
			// variables for time units
			var days, hours, minutes, seconds;

			var d = $('#day');
			var h = $('#hour');
			var m = $('#minute');
			var s = $('#second');

			setInterval(function ()
			{
			    // find the amount of "seconds" between now and target
			    var current_date = new Date().getTime();
			    var seconds_left = (target_date - current_date) / 1000;
			 
			    // do some time calculations
			    days = parseInt(seconds_left / 86400);
			    seconds_left = seconds_left % 86400;
			     
			    hours = parseInt(seconds_left / 3600);
			    seconds_left = seconds_left % 3600;
			     
			    minutes = parseInt(seconds_left / 60);
			    seconds = parseInt(seconds_left % 60);

			    // display result
			    d.text(days);
			    h.text(hours);
			    m.text(minutes);
			    s.text(seconds); 
			 
			}, 1000);
    	}	
	}

});

// JavaScript to add 'active' class to the current link in the navbar
document.addEventListener('DOMContentLoaded', (event) => {
    // Get all 'a' elements
    var navLinks = document.querySelectorAll('.main_nav a');

    // Listen for a click event on each link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove 'active' class from all links
            navLinks.forEach(el => {
                el.parentElement.classList.remove('active');
            });
            // Add 'active' class to the clicked link's parent element
            this.parentElement.classList.add('active');
        });
    });
});

// Function to toggle the section's height dynamically
function toggleSection(yearId) {
    var section = document.getElementById(yearId);

    if (section.classList.contains('expanded')) {
        // Collapse the section
        section.style.transitionDuration = '0.5s'; // Reset to default duration for collapsing
        section.style.maxHeight = '0';
        section.classList.remove('expanded');
    } else {
        // Calculate a dynamic duration based on the scrollHeight
        const height = section.scrollHeight;
        const duration = Math.min(1 + height / 1000, 3); // Set a cap on the duration (e.g., max 3s)
        
        section.style.transitionDuration = duration + 's';
        section.style.maxHeight = height + 'px';
        section.classList.add('expanded');

        // Reset max-height after the transition to allow for future content changes
        section.addEventListener('transitionend', function() {
            if (section.classList.contains('expanded')) {
                section.style.maxHeight = 'none';
            }
        }, { once: true });
    }
}

// Run this code when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const yearButtons = document.querySelectorAll('.year-toggle');

    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const yearId = this.getAttribute('data-year');
            toggleSection(yearId); // Call the toggleSection function
            this.classList.toggle('active');
        });
    });
});
