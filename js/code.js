/* global document, window, fetch, cytoscape */
const background = new Image();
var toJson = function (res) { return res.json(); };

background.onload = () => {
const cy = window.cy = cytoscape({
    container: document.getElementById('cy'),
    elements: fetch('../assets/data.json').then(toJson),
    style: fetch('../assets/cy-style.json').then(toJson),

    layout: {
        name: "preset",
        fit: false
    },
    zoom: 2,
    pan: {x:0,y:0},
    minZoom: 1,
    maxZoom: 5,
    autoungrabify: true
});

var content2var = "";

cy.on('tap', 'node', function(){
    document.getElementById("desctitle").textContent = this.data('title');
    document.getElementById("desccontent").textContent = this.data('content1');
    content2var = this.data('content2');
    if (content2var.startsWith('?')){
        var content2list = content2var.substring(1).split('?');
        console.log(content2list);
        document.getElementById("descexternal").innerHTML= "<a href=\"" + content2list[0] + "\" target=\"_blank\"><i>" + content2list[1] + "</i></a>";
    }
    else {
        document.getElementById("descexternal").textContent = content2var;
    }
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const bottomLayer = cy.cyCanvas({
    zIndex: -1
});
const canvas = bottomLayer.getCanvas();
const ctx = canvas.getContext("2d");

cy.on("render cyCanvas.resize", evt => {
    bottomLayer.resetTransform(ctx);
    bottomLayer.clear(ctx);
    bottomLayer.setTransform(ctx);

    ctx.save();
    // Draw a background
    ctx.drawImage(background, 10, 10, 450, 240);
    ctx.drawImage(grid20, 10, 10, 450, 240);

    // Draw text that follows the model
    ctx.font = "14px monospace";
    ctx.fillStyle = "rgb(54,42,11)";
    ctx.fillText("Veargreum timeline", 100, 224);

    cy.nodes().forEach(node => {const pos = node.position();
        ctx.beginPath();
        ctx.fill();
    });
    ctx.restore();
});
}; // Preload image
background.src = "../assets/parchmentGeneral.jpg";
