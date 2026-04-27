/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Header Search
4. Init Menu
5. Nav Active Link
6. Year Toggle

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

});


document.addEventListener("DOMContentLoaded", function() {

    /* 5. Nav Active Link */

    var navLinks = document.querySelectorAll('.main_nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.forEach(function(el) {
                el.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    });

    /* 6. Year Toggle */

    function toggleSection(yearId) {
        var section = document.getElementById(yearId);

        if (section.classList.contains('expanded')) {
            section.style.transitionDuration = '0.5s';
            section.style.maxHeight = '0';
            section.classList.remove('expanded');
        } else {
            var height = section.scrollHeight;
            var duration = Math.min(1 + height / 1000, 3);
            section.style.transitionDuration = duration + 's';
            section.style.maxHeight = height + 'px';
            section.classList.add('expanded');

            section.addEventListener('transitionend', function() {
                if (section.classList.contains('expanded')) {
                    section.style.maxHeight = 'none';
                }
            }, { once: true });
        }
    }

    document.querySelectorAll('.year-toggle').forEach(function(button) {
        button.addEventListener('click', function() {
            toggleSection(this.getAttribute('data-year'));
            this.classList.toggle('active');
        });
    });

});
