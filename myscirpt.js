 function drawingHelper(){
	this.getMousePosition = function(canvas, ev){
		var rect = canvas.getBoundingClientRect();
		return {
			x: (ev.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
			y: (ev.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height,
		};
	}
	
	this.clearCanvas = function(context, canvas){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	this.drawRectangle = function(context, startPoint, endPoint){
		context.beginPath();
		context.moveTo(startPoint.x, startPoint.y);
		context.lineTo(endPoint.x, startPoint.y);
		context.lineTo(endPoint.x, endPoint.y);
		context.lineTo(startPoint.x, endPoint.y);
		context.lineTo(startPoint.x, startPoint.y);
		context.stroke();
		context.closePath();
	}
 }
 
 function canvasExtension(canvas){
	var canvas = canvas;
	var context = canvas.getContext("2d");
	var canvas$ = $(canvas);
	
	var mousePressed = false;
	var lastPoint;
	var startPoint;
	
	var helper = new drawingHelper();
	
	var connectStartAndEnd = function(){
		context.beginPath();
		context.moveTo(startPoint.x, startPoint.y);
		context.lineTo(endPoint.x, endPoint.y);
		context.stroke();
		context.closePath();
	}
	
	canvas$.mousedown(function (e) {
		startPoint = helper.getMousePosition(canvas, e);
		endPoint = startPoint;
        mousePressed = true;
    });
	
	canvas$.mousemove(function (e) {
        if (mousePressed) {
			helper.clearCanvas(context, canvas);
			endPoint = helper.getMousePosition(canvas, e);
            helper.drawRectangle(context, startPoint, endPoint);
        }
    });

    canvas$.mouseup(function (e) {
		//connectStartAndEnd();
        mousePressed = false;
    });
	
	canvas$.mouseleave(function (e) {
        mousePressed = false;
    });
	
	this.getRectCoords = function(){
		return { start: startPoint, end: endPoint}
	}
	
	this.clear = function(){
		helper.clearCanvas(context, canvas);
	}
}

function createPrintScreen(addingId, url) {
	var image = GrabzIt("NmM0ZDNlOTk4MzUzNDM4Yjk4NGIxMzBlZjJkZTMwN2E=")
						 .ConvertURL(url)
						 .AddTo(addingId);
}

$(function(){
	var canvas = document.getElementById('heatmapArea');
	var wrapper = document.getElementById('wrapper');
	var ext = new canvasExtension(canvas);
	var isInSelectingMode = false;
	var iFrameUrl = "https://neo4j.com/developer/get-started/";
	var applicationKey = "NmM0ZDNlOTk4MzUzNDM4Yjk4NGIxMzBlZjJkZTMwN2E=";
	
	$('#clear').click(function(){
		ext.clear();
	});
	
	$('#changeMode').click(function(){
		isInSelectingMode = !isInSelectingMode;
		if(isInSelectingMode){
			$(canvas).css("z-index", 1000);
		} else {
			$(canvas).css("z-index", 0);
		}
	})
	
	$('#clicker').click(function(){
		createPrintScreen("result", iFrameUrl);
	});
	
	$('#imageCoord').click(function(){
		canvasCoordinates = ext.getRectCoords();
		result = {
			start:	{x: wrapper.scrollLeft + canvasCoordinates.start.x, y: wrapper.scrollTop + canvasCoordinates.start.y},
			end: { x: wrapper.scrollLeft + canvasCoordinates.end.x, y: wrapper.scrollTop + canvasCoordinates.end.y}
		};
		console.log(result);
	})
	
})