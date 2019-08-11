var itemlist = [];
var counter = 0;
var scale = 1.5;
var dragMode = true;
var danspaal = false;

var objects = [
    { name: "Eettafel", width: 120, height: 80, color: "#0000FF", border: "#000000" },
    { name: "PA Podium", width: 120 * 2, height: 80 * 5, color: "#A4010E", border: "#000000" },
    { name: "AK Blok", width: 80, height: 40, color: "#fcc603", border: "#000000" },
    { name: "Danspodium", width: 40 * 6, height: 80 * 1.5, color: "#09ad00", border: "#000000" },
    { name: "Feestbar klein", width: 180, height: 50, color: "#654321", border: "#000000" },
    { name: "Feestbar groot", width: 360, height: 50, color: "#654321", border: "#000000" }
];

$(document).ready(function () {
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
    return (((57 * x) / 100) * scale) - 10.0 - 20.0;
}

var onAdd = function (index) {
    var itemID = "item-" + counter;

    var obj = objects[index];
    var item = $("<div />", {
        id: itemID,
        "class": "draggable",
        style: "width: " + scaleSize(obj.width) + "px; height: " + scaleSize(obj.height) + "px; background-color: " + obj.color + "; border: 5px solid " + obj.border + ";"
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