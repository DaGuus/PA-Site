var itemlist = [];
var counter = 0;

var onAdd = function () {
    var itemID = "item-" + counter;
    $(".container").append("<div id=\"" + itemID + "\" class=\"draggable\"></div>");
    itemlist.push(itemID);

    var listID = itemID.replace("item-", "item-in-list-");
    var buttonID = itemID.replace("item-", "button-in-list-");
    $('#item-list').append("<li id=\"" + listID + "\"> <input type=\"button\" value=\"" + itemID + "\" id=\"" + buttonID + "\" /> </li>");
    $('#' + buttonID).click(function () {
        $('#' + itemID).remove();
        $('#' + listID).remove();
    });

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