function fileexpcss() {
	$('.fileexp .sidebar').height($('.fileexp').parent().parent().height() - $('.fileexp').parent().parent().children('.title').height());
	$('.fileexp .topbar').css('left', $('.fileexp .sidebar').width());
	$('.fileexp .filedisplay').css({
		left: $('.fileexp .sidebar').width(),
		top: $('.fileexp .topbar').height() + $('.fileexp').parent().parent().children('.title').height()
	});
}
function getfile(folder) {
	$.get('./file.json', function (data) {
		folder = eval(folder);
		console.log(folder);
		$('.filedisplay').html('');
		for (filevalue = 0; filevalue < Object.keys(data[folder]).length; filevalue++) {
			var filename = Object.keys(data[folder])[filevalue];
			var filecontent = data[folder][filename];
			console.log(filename, filecontent);
			$('.filedisplay').append('<div class=\'file\'>' + filename + '</div>');
		}
		$('.filedisplay .file').dblclick(function () {
			if ($(this).text().split('.').length == 1) {
				console.log(Object.keys(data[Object.keys(data)])[2], 'sd');
				getfile('Object.keys(data[Object.keys(data)])[2]');
			} else {
				generatewindow({
					title: 'Text Viewer - ' + $(this).text(),
					content: data[folder][$(this).text()],
					css: {
						this: {
							'white-space': 'break-spaces'
						}
					}
				});
			}
		});
	});
}
getfile('Object.keys(data)[0]');
fileexpcss();
setTimeout(function () {
	$('.fileexpconmenu').conmenu('.fileexp');
	$('.fileexp').parent().css('padding', '0');
	setTimeout(function () {
		$('.fileexp').parent().parent().height($('.fileexp .filedisplay').height() + $('.fileexp .sidebar').height()).width($('.fileexp .sidebar').width() + $('.fileexp .topbar').width() + 100);
		fileexpcss();
	}, 100);
	$('.fileexp').parent().parent().children('.ui-resizable-handle').ondrag(function () {
		fileexpcss();
		console.log('dragging');
	});
});
