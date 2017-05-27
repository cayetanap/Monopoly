var Game = function(p1) {
  this.player = p1;
}

Game.prototype.drawBoard = function() {
  var cells = "";

  var parser = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 20,
    12: 7,
    13: 19,
    18: 8,
    19: 18,
    24: 9,
    25: 17,
    30: 10,
    31: 16,
    32: 15,
    33: 14,
    34: 13,
    35: 12,
    36: 11,
  }

  var k = 1;

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      var parsed = parser["" + k + ""];

      if (i === 0 || i === 5 || j === 0 || j === 5) {
        cells = cells + "<div class='cell outer' id='" + parsed + "'></div>"
      } else {
        cells = cells + "<div class='cell' id='outer-" + k + "'></div>"
      }

      k++;
    }
  }

  $("#board").html(cells);
}

Game.prototype.drawPlayers = function() {
  // encontrar por jQuery a la cell 1
  var cell = $("#1");
  // añadirle el html del player:
  // <div class="player" id="p1"></div>
  cell.html('<div class="player" id="p1"></div>')
}

Game.prototype.drawDice = function() {
  var dice = $("#outer-16");
  dice.html('<div id="dice">1</div>')

  // Add click listener to #dice
  // change #dice html by new random number between 1-6
}
