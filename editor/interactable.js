var itemlist = [];
var counter = 0;
var scale = 1.5;
var dragMode = true;
var danspaal = false;

var canvasWidth = 1400;
var canvasHeight = 800;
var meterScale = 80;
var arrowHeadSize = 15;

var objects = [
    { name: "Eettafel", width: 120, height: 80, color: "#0000FF", border: "#000000" },
    { name: "PA Podium", width: 120 * 2, height: 80 * 5, color: "#A4010E", border: "#000000" },
    { name: "AK Blok", width: 80, height: 40, color: "#fcc603", border: "#000000" },
    { name: "Danspodium", width: 40 * 6, height: 80 * 1.5, color: "#09ad00", border: "#000000" },
    { name: "Feestbar klein", width: 180, height: 50, color: "#654321", border: "#000000" },
    { name: "Feestbar groot", width: 360, height: 50, color: "#654321", border: "#000000" }
];

var drawLine = function(context, x1, y1, x2, y2) {
	context.moveTo(x1, y1);
    context.lineTo(x2, y2);
}

var drawArrowHead = function(context, x, y, dir) {
	context.beginPath();
	context.moveTo(x, y);
	if(dir == 0){
		context.lineTo(x + (arrowHeadSize * 0.5), y + arrowHeadSize);
		context.lineTo(x - (arrowHeadSize * 0.5), y + arrowHeadSize);
	} else if(dir == 1) {
		context.lineTo(x - arrowHeadSize, y + (arrowHeadSize * 0.5));
		context.lineTo(x - arrowHeadSize, y - (arrowHeadSize * 0.5));
	} else if(dir == 2) {
		context.lineTo(x + (arrowHeadSize * 0.5), y - arrowHeadSize);
		context.lineTo(x - (arrowHeadSize * 0.5), y - arrowHeadSize);
	} else if(dir == 3) {
		context.lineTo(x + arrowHeadSize, y + (arrowHeadSize * 0.5));
		context.lineTo(x + arrowHeadSize, y - (arrowHeadSize * 0.5));
	}
	context.fill();
}

$(document).ready(function () {
    // Start of canvas stuff
    var canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // drawing code here
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.clearRect(5, 5, canvasWidth - 10, canvasHeight - 10);

        var offset = 50;
        var lineDist = meterScale * 0.5;
        var eetzaalX = offset + (lineDist / 2);
        var eetzaalY = offset + (lineDist * 2);

        ctx.lineWidth = 2;
        ctx.font = '14px Arial';

        ctx.beginPath();
		//drawLine(ctx, 
		drawLine(ctx, offset, offset, offset + (13.20 * meterScale) + lineDist, offset);
		drawLine(ctx, offset, offset + lineDist, offset + (13.20 * meterScale) + lineDist, offset + lineDist);

		drawLine(ctx, eetzaalX, offset - (lineDist / 2), eetzaalX, offset + (lineDist * 1.5));
		drawLine(ctx, eetzaalX + (13.20 * meterScale), offset - (lineDist / 2), eetzaalX + (13.20 * meterScale), offset + (lineDist * 1.5));
        drawLine(ctx, eetzaalX + (6.95 * meterScale), offset + (lineDist * 0.5), eetzaalX + (6.95 * meterScale), offset + (lineDist * 1.5));
        drawLine(ctx, eetzaalX + (7.95 * meterScale), offset + (lineDist * 0.5), eetzaalX + (7.95 * meterScale), offset + (lineDist * 1.5));
        drawLine(ctx, eetzaalX - lineDist, eetzaalY - (lineDist * 0.5), eetzaalX - lineDist, eetzaalY + (meterScale * 4.3) + (lineDist * 0.5));
        drawLine(ctx, eetzaalX - (lineDist * 1.5), eetzaalY, eetzaalX - (lineDist * 0.5), eetzaalY);
        drawLine(ctx, eetzaalX - (lineDist * 1.5), eetzaalY + (meterScale * 4.3), eetzaalX - (lineDist * 0.5), eetzaalY + (meterScale * 4.3));
        drawLine(ctx, eetzaalX + (13.20 * meterScale) + lineDist, eetzaalY - (lineDist * 0.5), eetzaalX + (13.20 * meterScale) + lineDist, eetzaalY + (meterScale * 5.7) + (lineDist * 0.5));
        drawLine(ctx, eetzaalX + (13.20 * meterScale) + (lineDist * 2), eetzaalY - (lineDist * 0.5), eetzaalX + (13.20 * meterScale) + (lineDist * 2), eetzaalY + (meterScale * 5.7) + (lineDist * 0.5));
        drawLine(ctx, eetzaalX + (13.20 * meterScale) + lineDist - (lineDist * 0.5), eetzaalY, eetzaalX + (13.20 * meterScale) + lineDist + (lineDist * 1.5), eetzaalY);
        drawLine(ctx, eetzaalX + (13.20 * meterScale) + lineDist - (lineDist * 0.5), eetzaalY + (meterScale * 5.7), eetzaalX + (13.20 * meterScale) + lineDist + (lineDist * 1.5), eetzaalY + (meterScale * 5.7));
        drawLine(ctx, eetzaalX + (13.20 * meterScale) + lineDist - (lineDist * 0.5), eetzaalY + (meterScale * 1.6), eetzaalX + (13.20 * meterScale) + lineDist + (lineDist * 0.5), eetzaalY + (meterScale * 1.6));
        drawLine(ctx, eetzaalX + (13.20 * meterScale) + lineDist - (lineDist * 0.5), eetzaalY + (meterScale * 3.9), eetzaalX + (13.20 * meterScale) + lineDist + (lineDist * 0.5), eetzaalY + (meterScale * 3.9));
        drawLine(ctx, eetzaalX + (13.20 * meterScale) - (lineDist * 0.3), eetzaalY + (meterScale * 1.6), eetzaalX + (13.20 * meterScale) + (lineDist * 0.3), eetzaalY + (meterScale * 1.6));
        drawLine(ctx, eetzaalX + (13.20 * meterScale) - (lineDist * 0.3), eetzaalY + (meterScale * 3.9), eetzaalX + (13.20 * meterScale) + (lineDist * 0.3), eetzaalY + (meterScale * 3.9));
        drawLine(ctx, eetzaalX - lineDist, eetzaalY + (meterScale * 5.7) + lineDist, eetzaalX + (13.20 * meterScale) + lineDist, eetzaalY + (meterScale * 5.7) + lineDist);
        drawLine(ctx, eetzaalX - lineDist, eetzaalY + (meterScale * 5.7) + (lineDist * 2), eetzaalX + (13.20 * meterScale) + lineDist, eetzaalY + (meterScale * 5.7) + (lineDist * 2));
        drawLine(ctx, eetzaalX, eetzaalY + (meterScale * 4.3) + (lineDist * 0.5), eetzaalX, eetzaalY + (meterScale * 5.7) + (lineDist * 2.5));
        drawLine(ctx, eetzaalX + (meterScale * 2.3), eetzaalY + (meterScale * 4.3) + (lineDist * 0.5), eetzaalX + (meterScale * 2.3), eetzaalY + (meterScale * 5.7) + (lineDist * 1.5));
        drawLine(ctx, eetzaalX + (meterScale * 3.2), eetzaalY + (meterScale * 4.3) + (lineDist * 0.5), eetzaalX + (meterScale * 3.2), eetzaalY + (meterScale * 5.7) + (lineDist * 1.5));
        drawLine(ctx, eetzaalX + (meterScale * 4.1), eetzaalY + (meterScale * 4.3) + (lineDist * 0.5), eetzaalX + (meterScale * 4.1), eetzaalY + (meterScale * 5.7) + (lineDist * 1.5));
        drawLine(ctx, eetzaalX + (meterScale * 4.6), eetzaalY + (meterScale * 4.3) + (lineDist * 0.5), eetzaalX + (meterScale * 4.6), eetzaalY + (meterScale * 5.7) + (lineDist * 1.5));
		drawLine(ctx, eetzaalX + (meterScale * 6.95), eetzaalY + (meterScale * 5.7) + (lineDist * 0.5), eetzaalX + (meterScale * 6.95), eetzaalY + (meterScale * 5.7) + (lineDist * 1.5));
		drawLine(ctx, eetzaalX + (meterScale * 6), eetzaalY, eetzaalX + (meterScale * 6), eetzaalY + (meterScale * 5.7));
        drawLine(ctx, eetzaalX + (13.20 * meterScale), eetzaalY + (meterScale * 5.7) + (lineDist * 0.5), eetzaalX + (13.20 * meterScale), eetzaalY + (meterScale * 5.7) + (lineDist * 2.5));
		drawLine(ctx, eetzaalX + (6.95 * meterScale) - lineDist, eetzaalY + (meterScale * 4.3), eetzaalX + (6.95 * meterScale) - lineDist, eetzaalY + (meterScale * 5.2));
        ctx.stroke();
		
		drawArrowHead(ctx, eetzaalX + (meterScale * 6), eetzaalY, 0);
		drawArrowHead(ctx, eetzaalX + (meterScale * 6), eetzaalY + (meterScale * 3.7), 2);
		
		drawArrowHead(ctx, eetzaalX + (meterScale * 6), eetzaalY + (meterScale * 3.7), 0);
		drawArrowHead(ctx, eetzaalX + (meterScale * 6), eetzaalY + (meterScale * 5.72), 2);
		
		drawArrowHead(ctx, eetzaalX + (meterScale * 6.95) - lineDist, eetzaalY + (meterScale * 4.27), 0);
		drawArrowHead(ctx, eetzaalX + (meterScale * 6.95) - lineDist, eetzaalY + (meterScale * 5.23), 2);

        ctx.fillText('13.20m', eetzaalX + ((13.20 * meterScale) / 2) - 20, offset - 5);
        ctx.fillText('6.95m', eetzaalX + ((6.95 * meterScale) / 2) - 20, offset + lineDist - 5);
        ctx.fillText('1.00m', (eetzaalX + (6.95 * meterScale)) + ((1 * meterScale) / 2) - 20, offset + lineDist - 5);
        ctx.fillText('5.25m', (eetzaalX + (7.95 * meterScale)) + ((5.25 * meterScale) / 2) - 20, offset + lineDist - 5);
        ctx.save();
        ctx.translate(eetzaalX - lineDist - (lineDist * 0.15), eetzaalY + ((meterScale * 4.3) / 2));
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText('4.30m', 0, 0);
        ctx.restore();

        ctx.save();
        ctx.translate(eetzaalX + (13.20 * meterScale) + (2.2 * lineDist), eetzaalY + ((meterScale * 5.7) / 2));
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText('5.70m', 0, 0);
        ctx.restore();

        ctx.save();
        ctx.translate(eetzaalX + (13.20 * meterScale) + (1.2 * lineDist), eetzaalY + ((meterScale * 1.6) / 2));
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText('1.60m', 0, 0);
        ctx.restore();

        ctx.save();
        ctx.translate(eetzaalX + (13.20 * meterScale) + (1.2 * lineDist), eetzaalY + (meterScale * 1.6) + ((meterScale * 2.3) / 2));
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText('2.30m', 0, 0);
        ctx.restore();

        ctx.save();
        ctx.translate(eetzaalX + (13.20 * meterScale) + (1.2 * lineDist), eetzaalY + (meterScale * 3.9) + ((meterScale * 1.8) / 2));
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText('1.80m', 0, 0);
        ctx.restore();

        var x = eetzaalX;
        var y = eetzaalY;
        ctx.beginPath();
        ctx.moveTo(x, y);
        x = x + (13.20 * meterScale);
        ctx.lineTo(x, y);
        y = y + (5.70 * meterScale);
        ctx.lineTo(x, y);
        x = x - (6.25 * meterScale);
        ctx.lineTo(x, y);
        y = y - (2 * meterScale);
        ctx.lineTo(x, y);
        x = x - (2.35 * meterScale);
        ctx.lineTo(x, y);
        x = x - (0.5 * meterScale);
        y = y + (0.55 * meterScale);
        ctx.lineTo(x, y);
        x = eetzaalX;
        ctx.lineTo(x, y);
        y = eetzaalY;
        ctx.lineTo(x, y);

        ctx.stroke();
    } else {
        // canvas-unsupported code here
    }
    // End of canvas stuff

    var addButton = function (obj, index, array) {
        $('#button-list').append($('<input/>', { type: "button", value: obj.name, onclick: "onAdd(" + index + ");" }));
    }

    objects.forEach(addButton);

    $('img').on('dragstart', function (event) { event.preventDefault(); });

    $('#download').click(function () {
        html2canvas(document.querySelector("#capture")).then(canvas => {
            var link = document.getElementById("download");
            link.href = canvas.toDataURL();
            link.download = "plattegrond.png";
        });
    });

    $('#change-mode').click(function () {
        if (dragMode == true) {
            dragMode = false;
            $('#change-mode').val("Drag Mode");
        } else {
            dragMode = true;
            $('#change-mode').val("Rotate Mode");
        }
    });

    $('#danspaal').click(function () {
        if (danspaal == true) {
            danspaal = false;
            $('.danspaal').remove();

            $('#danspaal').val("Voeg danspaal toe");
        } else {
            danspaal = true;

            var item = $("<div />", {
                id: "danspaal-div",
                "class": "danspaal",
                style: "width: " + scaleSize(160) + "px; height: " + scaleSize(80) + "px; background-color: #09ad00; border: 5px solid black;"
            });
            item.text("Danspaal");
            $(".container").append(item);

            document.getElementById("danspaal-div").style.transform = "translate(" + scaleSize(560) + "px, " + scaleSize(360) + "px)";

            $('#danspaal').val("Verwijder danspaal");
        }
    });
});

// 57 pixels is 100cm       213 * x / 375  - border size * 2 - padding * 2
var scaleSize = function (x) {
	return x / 100 * meterScale;
    //return (((57 * x) / 100) * scale) - 10.0 - 20.0;
}

var onAdd = function (index) {
    var itemID = "item-" + counter;

    var obj = objects[index];
    var item = $("<div />", {
        id: itemID,
        "class": "draggable",
        style: "width: " + (scaleSize(obj.width) - 30) + "px; height: " + (scaleSize(obj.height) - 30) + "px; background-color: " + obj.color + "; border: 5px solid " + obj.border + ";"
    });
    item.text(obj.name);


    $(".container").append(item);
    // $(".container").append("<div id=\"" + itemID + "\" class=\"draggable\"></div>");
    itemlist.push(itemID);

    var listID = itemID.replace("item-", "item-in-list-");
    var buttonID = itemID.replace("item-", "button-in-list-");

    var listItem = $("<li />", {
        id: listID
    });

    var removeButton = $("<input />", {
        type: "image",
        alt: "Verwijder",
        src: "./img/delete.png",
        "class": "image-button"
    });
    removeButton.click(function () {
        $('#' + itemID).remove();
        $('#' + listID).remove();
    });

    var resetRotation = $("<input />", {
        type: "image",
        alt: "Reset rotatie",
        src: "./img/resetRotate.png",
        "class": "image-button"
    });
    resetRotation.click(function () {
        var element = document.getElementById(itemID);
        element.dataset.angle = 0;
        var x = (parseFloat(element.getAttribute('data-x')) || 0);
        var y = (parseFloat(element.getAttribute('data-y')) || 0);

        element.style.webkitTransform = element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(0rad' + ')';
    });

    var rotateLeft = $("<input />", {
        type: "image",
        alt: "Roteer links",
        src: "./img/rotateLeft.png",
        "class": "image-button"
    });
    rotateLeft.click(function () {
        var element = document.getElementById(itemID);

        var angle = parseFloat(element.dataset.angle || 0);
        angle = element.dataset.angle = angle - (Math.PI / 2);
        var x = (parseFloat(element.getAttribute('data-x')) || 0);
        var y = (parseFloat(element.getAttribute('data-y')) || 0);

        element.style.webkitTransform = element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'rad' + ')';
    });

    var rotateRight = $("<input />", {
        type: "image",
        alt: "Roteer rechts",
        src: "./img/rotateRight.png",
        "class": "image-button"
    });
    rotateRight.click(function () {
        var element = document.getElementById(itemID);

        var angle = parseFloat(element.dataset.angle || 0);
        angle = element.dataset.angle = angle + (Math.PI / 2);
        var x = (parseFloat(element.getAttribute('data-x')) || 0);
        var y = (parseFloat(element.getAttribute('data-y')) || 0);

        element.style.webkitTransform = element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'rad' + ')';
    });

    listItem.append(removeButton);
    listItem.append(resetRotation);
    listItem.append(rotateLeft);
    listItem.append(rotateRight);
    listItem.append(obj.name + " " + (counter + 1));
    $('#item-list').append(listItem);

    counter++;
}

// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: false,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: moveListener,
        onstart: function (event) {
            if (dragMode == true) return;
            const element = event.target;
            const rect = element.getBoundingClientRect();

            // store the center as the element has css `transform-origin: center center`
            element.dataset.centerX = rect.left + rect.width / 2;
            element.dataset.centerY = rect.top + rect.height / 2;
            // get the angle of the element when the drag starts
            element.dataset.angle = getDragAngle(event);
        },
        onend: function (event) {
            if (dragMode == true) return;
            const element = event.target;

            // save the angle on dragend
            element.dataset.angle = getDragAngle(event);
        }
    })

interact('.draggable')
    .on('doubletap', function (event) {
        var angle = parseFloat(event.target.dataset.angle || 0);
        angle = event.target.dataset.angle = angle + (Math.PI / 2);

        var x = (parseFloat(event.target.getAttribute('data-x')) || 0);
        var y = (parseFloat(event.target.getAttribute('data-y')) || 0);

        event.target.style.webkitTransform = event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'rad' + ')';

        event.preventDefault()
    })

function getDragAngle(event) {
    var element = event.target;
    var startAngle = parseFloat(element.dataset.angle) || 0;
    var center = {
        x: parseFloat(element.dataset.centerX) || 0,
        y: parseFloat(element.dataset.centerY) || 0,
    };
    var angle = Math.atan2(center.y - event.clientY,
        center.x - event.clientX);

    return angle - startAngle;
}

function moveListener(event) {
    if (dragMode == true) {
        dragMoveListener(event);
    } else {
        rotateMoveListener(event)
    }
}

function rotateMoveListener(event) {
    var element = event.target;
    var center = {
        x: parseFloat(element.dataset.centerX) || 0,
        y: parseFloat(element.dataset.centerY) || 0,
    };
    var angle = getDragAngle(event);
    var x = (parseFloat(element.getAttribute('data-x')) || 0);
    var y = (parseFloat(element.getAttribute('data-y')) || 0);

    element.style.webkitTransform = element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'rad' + ')';
}

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    var angle = target.dataset.angle || 0;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'rad)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

var exportHTML = function () {
    html2canvas(document.querySelector("#capture")).then(canvas => {
        download(canvas, "plattegrond.png");
    });
}

function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
}