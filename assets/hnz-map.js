(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyC3Ic8J3vE_CG9fOf1oWl1o9e46H_eJt2Y",
});


let center;
if (($('.where-to-buy #map')).length) {
    center = { lat: parseFloat(citymap[0].lat_long.split(', ')[0]), lng: parseFloat(citymap[0].lat_long.split(', ')[1]) };
}

let mapCenter = center;
let map;
let map_mobile;

let counter = 0;
let page = 0;

let filter_country = 'All';
let filter_type = 'All Stores';
let filter_input = '';

$(document).ready(function() {
    
    if (($('.where-to-buy #map')).length) {
        if (citymap.length > 0) {
            for (const city in citymap) {
    
                counter++;
                page = Math.floor((counter - 1) / 5) + 1;
    
                let append = '<div class="location" data-page="'+page+'" data-lat="'+parseFloat(citymap[city].lat_long.split(', ')[0])+'" data-lng="'+parseFloat(citymap[city].lat_long.split(', ')[1])+'" data-country="'+citymap[city].country+'" data-type="'+citymap[city].type+'" data-address="'+citymap[city].address+'" data-contact="'+citymap[city].contact+'" data-title="'+citymap[city].title+'">'+
                                '<p class="location-name">'+counter+'. '+citymap[city].title+'</p>'+
                                '<p class="location-details"><img src="https://cdn.shopify.com/s/files/1/0639/3492/2809/files/location.png?v=1730186016"><span>Adress:</span> '+citymap[city].address+'</p>'+
                                '<p class="location-details"><img src="https://cdn.shopify.com/s/files/1/0639/3492/2809/files/call.png?v=1730186017"><span>Contact:</span> '+citymap[city].contact+'</p>'+
                                '<p class="location-details d-lg-none d-md-block d-sm-block"><img src="https://cdn.shopify.com/s/files/1/0639/3492/2809/files/near_me_24dp_292C31_FILL0_wght400_GRAD0_opsz24.png?v=1730353938" style="opacity: .7"><span>Go To Store</span>'+
                             '</div>';
    
                $('.locations').append(append);
            }
    
            locPaginate();
        }
    
        async function initMap() {
            const { Map } = await google.maps.importLibrary("maps");
        
            map = new Map(document.getElementById("map"), {
                center: mapCenter,
                zoom: 3,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            });
        
            map_mobile = new Map(document.getElementById("map-mobile"), {
                center: mapCenter,
                zoom: 3,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            });
    
            for (const city in citymap) {
                let center = {
                    lat: parseFloat(citymap[city].lat_long.split(', ')[0]),
                    lng: parseFloat(citymap[city].lat_long.split(', ')[1])
                };
        
    
                new google.maps.Marker({
                    position: center,
                    map: map
                });
        
                new google.maps.Marker({
                    position: center,
                    map: map_mobile
                });
            }
        }
    
        initMap();
    }

});

$(document).on('click', '.location', function() {;
    map.setZoom(15);
    map.panTo({
		lat : $(this).data('lat'),
		lng : $(this).data('lng')
	});

    map_mobile.setZoom(15);
    map_mobile.panTo({
		lat : $(this).data('lat'),
		lng : $(this).data('lng')
	});

    if (window.innerWidth < 1280) {
        let title = $(this).data('title');
        let address = $(this).data('address');
        let contact = $(this).data('contact');

        $('.map-wrapper .map-title').html(title);
        $('.map-wrapper .location-name').html(title);
        $('.map-wrapper .data.address').html(address);
        $('.map-wrapper .data.contact').html(contact);

        $('.map-wrapper').css('display', 'flex');
    }
});

$('.map-wrapper .map-header').on('click', function() {
    $('.map-wrapper').hide();
});

$('select[name="retail-country"]').on('change', function() {
    filter_country = $(this).val();

    filterLocation(filter_country, filter_type, filter_input);
});
$('select[name="retail-store"]').on('change', function() {
    filter_type = $(this).val();

    filterLocation(filter_country, filter_type, filter_input);
});
$('.filter-input .search-btn').on('click', function() {
    filter_input = $('input[name="search-address"]').val();

    filterLocation(filter_country, filter_type, filter_input);
})
$('.filter-input input').on('keyup', function() {
    filter_input = $('input[name="search-address"]').val();

    filterLocation(filter_country, filter_type, filter_input);
})

function filterLocation(country, type, location) {

    let show = citymap;

    if (country.toLowerCase() !== 'all') {
        show = show.filter(x => 
            x.country.toLowerCase().indexOf(country.toLowerCase()) >= 0
        );
    }
    if (type.toLowerCase() !== 'all stores') {
        show = show.filter(x => 
            x.type.toLowerCase().indexOf(type.toLowerCase()) >= 0
        );
    }
    if (location.toLowerCase() !== '') {
        show = show.filter(x => 
            x.address.toLowerCase().indexOf(location.toLowerCase()) >= 0 || 
            x.title.toLowerCase().indexOf(location.toLowerCase()) >= 0
        );
    }

    if (show.length > 0) {
        $('.locations').html('');
        counter = 0;
        
        for (let city in show) {
            counter ++;
            page = Math.floor((counter - 1) / 5) + 1;
            let append = '<div class="location" data-page="'+page+'" data-lat="'+parseFloat(show[city].lat_long.split(', ')[0])+'" data-lng="'+parseFloat(show[city].lat_long.split(', ')[1])+'" data-country="'+show[city].country+'" data-type="'+show[city].type+'" data-address="'+show[city].address+'" data-contact="'+show[city].contact+'" data-title="'+show[city].title+'">'+
                            '<p class="location-name">'+counter+'. '+show[city].title+'</p>'+
                            '<p class="location-details"><img src="https://cdn.shopify.com/s/files/1/0639/3492/2809/files/location.png?v=1730186016"><span>Adress:</span> '+show[city].address+'</p>'+
                            '<p class="location-details"><img src="https://cdn.shopify.com/s/files/1/0639/3492/2809/files/call.png?v=1730186017"><span>Contact:</span> '+show[city].contact+'</p>'+
                            '<p class="location-details d-lg-none d-md-block d-sm-block"><img src="https://cdn.shopify.com/s/files/1/0639/3492/2809/files/near_me_24dp_292C31_FILL0_wght400_GRAD0_opsz24.png?v=1730353938" style="opacity: .7"><span>Go To Store</span>'+
                         '</div>';

            $('.locations').append(append);
        }

        locPaginate();

        map.setZoom(15);
        map.panTo({
            lat : parseFloat(show[0].lat_long.split(', ')[0]),
            lng : parseFloat(show[0].lat_long.split(', ')[1])
        });
    }
    else {
        $('.locations').html('<div class="no-found">No store found.</div>');
    }
}

function locPaginate() {
    if (window.innerWidth < 1280) {
        if (counter > 5) {
            const itemsPerPage = 5;
            const totalItems = counter;
            const totalPages = Math.floor(totalItems / itemsPerPage);
            const remainder = totalItems % itemsPerPage;
    
            let pageTotal = totalPages;
            if (remainder !== 0) {
                pageTotal += 1;
            }
    
            const $pagination = $('<div class="paginate custom d-lg-none d-md-flex d-sm-flex" data-total="' + pageTotal + '"></div>');
    
            const $leftArrow = $('<a class="page disable" href="javascript:void(0)"><i class="fa-solid fa-chevron-left"></i></a>');
            $pagination.append($leftArrow);
    
            for (let i = 1; i <= pageTotal; i++) {
                const $pageLink = $('<a class="page' + (i === 1 ? ' active' : '') + '" href="javascript:void(0)" data-i="' + i + '">' + i + '</a>');
                $pagination.append($pageLink);
            }
    
            const $rightArrow = $('<a class="page" href="javascript:void(0)" data-i="' + (pageTotal) + '"><i class="fa-solid fa-chevron-right"></i></a>');
            $pagination.append($rightArrow);
    
            $('.locations').append($pagination);
            initializePagination($($pagination));
        }
    }
}