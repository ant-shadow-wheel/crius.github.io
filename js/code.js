/* global document, window, fetch, cytoscape */
(function () {
    var toJson = function (res) { return res.json(); };

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        elements: fetch('./assets/data.json').then(toJson),
        style: fetch('./assets/cy-style.json').then(toJson),

        layout: {
            name: "concentric",
            minNodeSpacing: 100
        },

        minZoom: 1,
        maxZoom: 5,
        autoungrabify: true
    });
    cy.on('tap', 'node', function(){
        document.getElementById("chy").textContent = this.data('title');
        document.getElementById("cantrips").textContent = this.data('content');
    })
})();