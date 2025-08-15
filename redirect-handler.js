<script>
// Case-insensitive redirect handler
(function() {
    const path = window.location.pathname.toLowerCase();
    
    // If someone visits any variation of /lstock, redirect to the correct case
    if (path === '/lstock' && window.location.pathname !== '/Lstock') {
        window.location.replace('/Lstock');
    }
})();
</script>
