interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'jquery', src: 'https://code.jquery.com/jquery-3.4.1.min.js'},

    {name: 'wow', src: '/assets/wow/wow.min.js'},
    {name: 'easing', src: '/assets/easing/easing.min.js'},
    {name: 'waypoints', src: '/assets/waypoints/waypoints.min.js'},
    {name: 'owlcarousel', src: '/assets/owlcarousel/owl.carousel.min.js'},
    {name: 'main', src: '/assets/js/main.js'}
];