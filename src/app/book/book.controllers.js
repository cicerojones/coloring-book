'use strict';

/*

Note the terrible but important view hack:

Each book-page that is included in the book.html
has an ng-if to check if it is the current page and
should therefore be rendered.

Reason:
- Need ng-include to first fetch all the templates ONCE
so cannot put ng-if around ng-include
- If instead had ng-include or ng-view fetching templates
for book-page's when needed, then changing from one book-page to
the next would be very slow

- Need to use ng-if on book-page's so that their heavy SVGs are
not rendered in the DOM when the book-page is not the current page
- Using display:none or ng-hide is not enough, these SVGs must
be removed from the page -- together they're too heavy for browsers

*/
function BookCntl($scope, $window, $location, $anchorScroll) {
    // view model is this BookCntl
    let vm = this;

    vm.pageSrcBase = '/app/book/pages';
    vm.bookPageUrl = function(p) {
        return vm.pageSrcBase + '/' + p;
    };

    // Proxy for section page-names
    // allows linking to section starts by pageName='PAGE' in table-of-contents
    vm.sectionPages = {
        'shapes-and-symmetries-section': 'nature-intro',
        'rotations-section': 'cn-0',
        'reflections-section': 'dn-1',
        'frieze-section': 'frieze-0',
        // 'wallpaper-section': TODO
    };

    vm.pages = [
        {
            name: 'cover',
            url: vm.bookPageUrl('book-page-cover.html'),
        }, {
            name: 'about',
            url: vm.bookPageUrl('book-page-about.html'),
        }, {
            name: 'road-map',
            url: vm.bookPageUrl('book-page-road-map.html'),
        }, {
            name: 'table-of-contents',
            url: vm.bookPageUrl('book-page-table-of-contents.html'),
        }, {
            name: 'nature-intro',
            url: vm.bookPageUrl('book-page-nature-intro.html'),
        }, {
            name: 'shapes-intro-1',
            url: vm.bookPageUrl('book-page-shapes-intro-1.html'),
        }, {
            name: 'shapes-intro-2',
            url: vm.bookPageUrl('book-page-shapes-intro-2.html'),
        }, {
            name: 'cn-0',
            url: vm.bookPageUrl('book-page-shapes-cn-0.html'),
        }, {
            name: 'cn-1',
            url: vm.bookPageUrl('book-page-shapes-cn-1.html'),
        }, {
            name: 'cn-2',
            url: vm.bookPageUrl('book-page-shapes-cn-2.html'),
        }, {
            name: 'cn-3',
            url: vm.bookPageUrl('book-page-shapes-cn-3.html'),
        }, {
            name: 'cn-4',
            url: vm.bookPageUrl('book-page-shapes-cn-4.html'),
        }, {
            name: 'cn-5',
            url: vm.bookPageUrl('book-page-shapes-cn-5.html'),
        }, {
        //  name: 'cn-6',
        //  url: vm.bookPageUrl('book-page-shapes-cn-6.html'),
        // }, {
            name: 'cn-7',
            url: vm.bookPageUrl('book-page-shapes-cn-7.html'),
        }, {
            name: 'cn-8',
            url: vm.bookPageUrl('book-page-shapes-cn-8.html'),
        }, {
            name: 'cn-9',
            url: vm.bookPageUrl('book-page-shapes-cn-9.html'),
        }, {
            name: 'cn-10',
            url: vm.bookPageUrl('book-page-shapes-cn-10.html'),
        }, {
            name: 'cn-11',
            url: vm.bookPageUrl('book-page-shapes-cn-11.html'),
        }, {
            name: 'cn-12',
            url: vm.bookPageUrl('book-page-shapes-cn-12.html'),
        }, {
            name: 'cn-13',
            url: vm.bookPageUrl('book-page-shapes-cn-13.html'),
        }, {
            name: 'cn-14',
            url: vm.bookPageUrl('book-page-shapes-cn-14.html'),
        }, {
            name: 'cn-15',
            url: vm.bookPageUrl('book-page-shapes-cn-15.html'),
        }, {
            name: 'cn-16',
            url: vm.bookPageUrl('book-page-shapes-cn-16.html'),
        }, {
            name: 'cn-17',
            url: vm.bookPageUrl('book-page-shapes-cn-17.html'),
        }, {
            name: 'cn-18',
            url: vm.bookPageUrl('book-page-shapes-cn-18.html'),
        }, {
            name: 'cn-19',
            url: vm.bookPageUrl('book-page-shapes-cn-19.html'),
        }, {
            name: 'dn-1',
            url: vm.bookPageUrl('book-page-shapes-dn-1.html'),
        }, {
            name: 'dn-2',
            url: vm.bookPageUrl('book-page-shapes-dn-2.html'),
        }, {
            name: 'dn-3',
            url: vm.bookPageUrl('book-page-shapes-dn-3.html'),
        }, {
            name: 'dn-4',
            url: vm.bookPageUrl('book-page-shapes-dn-4.html'),
        }, {
            name: 'dn-5',
            url: vm.bookPageUrl('book-page-shapes-dn-5.html'),
        }, {
            name: 'dn-6',
            url: vm.bookPageUrl('book-page-shapes-dn-6.html'),
        }, {
            name: 'dn-7',
            url: vm.bookPageUrl('book-page-shapes-dn-7.html'),
        }, {
            name: 'dn-8',
            url: vm.bookPageUrl('book-page-shapes-dn-8.html'),
        }, {
            name: 'dn-9',
            url: vm.bookPageUrl('book-page-shapes-dn-9.html'),
        }, {
            name: 'dn-10',
            url: vm.bookPageUrl('book-page-shapes-dn-10.html'),
        }, {
            name: 'dn-11',
            url: vm.bookPageUrl('book-page-shapes-dn-11.html'),
        }, {
            name: 'dn-12',
            url: vm.bookPageUrl('book-page-shapes-dn-12.html'),
        }, {
            name: 'dn-13',
            url: vm.bookPageUrl('book-page-shapes-dn-13.html'),
        }, {
            name: 'dn-14',
            url: vm.bookPageUrl('book-page-shapes-dn-14.html'),
        }, {
            name: 'dn-15',
            url: vm.bookPageUrl('book-page-shapes-dn-15.html'),
        }, {
            name: 'dn-16',
            url: vm.bookPageUrl('book-page-shapes-dn-16.html'),
        }, {
            name: 'frieze-0',
            url: vm.bookPageUrl('book-page-frieze-0.html'),
        }, {
            name: 'frieze-1',
            url: vm.bookPageUrl('book-page-frieze-1.html'),
        }, {
            name: 'frieze-2',
            url: vm.bookPageUrl('book-page-frieze-2.html'),
        }, {
            name: 'frieze-3',
            url: vm.bookPageUrl('book-page-frieze-3.html'),
        }, {
            name: 'frieze-4',
            url: vm.bookPageUrl('book-page-frieze-4.html'),
        }, {
            name: 'frieze-5',
            url: vm.bookPageUrl('book-page-frieze-5.html'),
        }, {
            name: 'frieze-6',
            url: vm.bookPageUrl('book-page-frieze-6.html'),
        }, {
            name: 'frieze-7',
            url: vm.bookPageUrl('book-page-frieze-7.html'),
        }, {
            name: 'frieze-8',
            url: vm.bookPageUrl('book-page-frieze-8.html'),
        }, {
            name: 'frieze-9',
            url: vm.bookPageUrl('book-page-frieze-9.html'),
        }, {
            name: 'frieze-10',
            url: vm.bookPageUrl('book-page-frieze-10.html'),
        }, {
            name: 'frieze-11',
            url: vm.bookPageUrl('book-page-frieze-11.html'),
        }, {
            name: 'frieze-12',
            url: vm.bookPageUrl('book-page-frieze-12.html'),
        }, {
            name: 'frieze-13',
            url: vm.bookPageUrl('book-page-frieze-13.html'),
        }, {
            name: 'frieze-14',
            url: vm.bookPageUrl('book-page-frieze-14.html'),
        }, {
            name: 'frieze-15',
            url: vm.bookPageUrl('book-page-frieze-15.html'),
        }, {
            name: 'frieze-16',
            url: vm.bookPageUrl('book-page-frieze-16.html'),
        }, {
            name: 'get-updates',
            url: vm.bookPageUrl('book-page-last.html'),
        }
    ];


    vm.setupPage = function() {
        vm.page = vm.pages[vm.pageNumber];
        vm.pageName = vm.page.name;

        // view should only show button to return to previous page
        // if there is a previous page
        vm.showPreviousPageBtn = (vm.pageNumber > 0) ? true : false;
        // view should only show button to return to next page
        // if there is a next page
        vm.showNextPageBtn = (vm.pageNumber < (vm.pages.length - 1)) ? true : false;    

        // scroll to the top of the new book-page that is shown
        $anchorScroll();    
    };


    // change to the previous page
    vm.previousPage = function() {
        vm.animateNextPage = false;
        vm.animatePreviousPage = true;
        vm.changePage(vm.pageNumber - 1);
    };

    // change to the next page
    vm.nextPage = function() {
        vm.animateNextPage = true;
        vm.animatePreviousPage = false;
        vm.changePage(vm.pageNumber + 1);
    };

    vm.changePage = function(pageIndex) {
        if (pageIndex < 0 || pageIndex > vm.pages.length)
            return;

        vm.setPageByNumber(pageIndex);
        vm.setupPage();
    };


    // Meant for easier redirects to page
    // Tries to pull the pageName from the URL params
    // and returns pageNumber corresponding to that page name
    vm.getPageNumberByPageName = function() {
        let pageName = $location.search().pageName;
        let pageNumber;

        if (!!pageName) {
            let findSomePageNumber = function(page, index) {
                pageNumber = index;
                // 'some' function will shortcircuit here if true
                return (page.name === pageName || page.name == vm.sectionPages[pageName]); 
            };

            if (vm.pages.some(findSomePageNumber))
                return pageNumber;
        }
    };

    vm.getPageNumber = function() {
        // get the pageIndex from the search parameters if present:
        // first try to get the page by pageName
        // otherwise try to get the pageNumber
        // otherwise return the 0th page
        let pageNumber = vm.getPageNumberByPageName();

        if (!!pageNumber)
            return pageNumber;

        let pageNumberParam = Number($location.search().pageNumber);
        // NaN will always be less than 0
        if (pageNumberParam >= 0 && pageNumberParam < vm.pages.length)
            return pageNumberParam;
        
        return 0;   
    };

    vm.setPageByNumber = function(pageIndex) {
        vm.pageNumber = pageIndex;
        vm.pageName = vm.pages[pageIndex].name;
        $location.search('pageName', vm.pageName);
        $location.search('pageNumber', pageIndex);
    };


    vm.init = function() {
        // get the page from the url
        vm.pageNumber = vm.getPageNumber();
        vm.setPageByNumber(vm.pageNumber);
        vm.setupPage();
    };

    // watch for when the route is updated by something other than this controller
    // if it is, then reinitialize the page again
    $scope.$on('$routeUpdate', function() {
        let ls = $location.search();
        if (ls.pageName !== vm.pageName || ls.pageNumber !== vm.pageNumber) {
            vm.init();
        } else if (vm.pageName != vm.previousPageName) {
            vm.previousPageName = vm.pageName;
            // Note: the MainController updates google analytics too and in
            // some edge cases there may be double counts
            analytics.trackPageView();
        }
    });

    vm.init();
}
