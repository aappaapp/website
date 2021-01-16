$.get('./welcome.html', function (data) {
    generatewindow({
        title: 'Welcome to AdenOS',
        content: data,
        css: {
            this: {
                position: 'absoulte',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }
        }
    });
});
