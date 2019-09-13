function makeButtons() {
    for (var i = 0; i < categories.length; i++) {
        var button = document.createElement("button");
        var t = document.createTextNode(categories[i]);
        button.appendChild(t);
        document.body.appendChild(button);
    }
}
makeButtons();