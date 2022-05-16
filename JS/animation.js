var s = Snap();

var circ = s.circle(50, 50, 40);
circ.attr({
  fill: "red"
});

circ.animate({
  r: 150
}, 2000, mina.easein);