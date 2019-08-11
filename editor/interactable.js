var itemlist = [];
var counter = 0;
var scale = 1.5;

var objects = [
    { name: "Eettafel", width: 120, height: 80, color: "#0000FF", border: "#000000" },
    { name: "PA Podium", width: 120 * 2, height: 80 * 5, color: "#A4010E", border: "#000000" }
];

$(document).ready(function () {
    var addButton = function (obj, index, array) {
        $('#button-list').append($('<input/>', { type: "button", value: obj.name, onclick: "onAdd(" + index + ");" }));
    }

    objects.forEach(addButton);
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

    listItem.append(removeButton);
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
        onmove: dragMoveListener
    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener