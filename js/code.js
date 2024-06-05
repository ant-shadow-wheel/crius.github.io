/* global document, window, fetch, cytoscape */
const background = new Image();
const grid20 = new Image();
const inkarnatemap = new Image();
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
    maxZoom: 8,
    autoungrabify: true
});

var content2var = "";
var circuitid = "";

cy.on('tap', 'node', function(){
    cy.elements('edge[id ^= "lo"]').removeClass("yesvisible");
    cy.elements('edge[id ^= "lo"]').removeClass("nonvisible");
    cy.elements('edge[id ^= "lo"]').addClass("nonvisible");
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
    if (this.connectedEdges().size() >0){
        circuitid='edge[id ^="' + this.connectedEdges()[0].data('id').substring(0,3) + '"]';
        cy.elements(circuitid).addClass("yesvisible");
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
    ctx.drawImage(inkarnatemap, 20, 10, 430, 220);
    //ctx.drawImage(grid20, 10, 10, 450, 240);

    // Draw text that follows the model
    ctx.font = "14px Verdana bold";
    ctx.fillStyle = "rgb(54,42,11)";
    ctx.fillText("Veargreum timeline:", 10, 240);

    cy.nodes().forEach(node => {const pos = node.position();
        ctx.beginPath();
        ctx.fill();
    });
    ctx.restore();
    cy.elements('edge[id ^= "lo"]').addClass("nonvisible");
});
}; // Preload image
background.src = "../assets/parchmentGeneral.jpg";
inkarnatemap.src = "../assets/parchmentCriusWide.png";
//inkarnatemap.src = "../assets/criuswithtext.png";
//grid20.src = "../assets/debuggrid20.png";