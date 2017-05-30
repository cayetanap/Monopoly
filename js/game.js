var Game = function(p1) {
  this.p1 = p1;
  this.street1 = new Street(1, "blue", "Antón Martín", 100, 0);
  this.street2 = new Street(2, "blue", "Alcalá", 100, 0);
  this.street3 = new Street(3, "grey", "Serrano", 100, 0);
  this.street4 = new Street(4, "grey", "Velazquez", 100, 0);
  this.street5 = new Street(5, "grey", "Claudio Coello", 100, 0);
  this.street6 = new Street(6, "orange", "Lagasca", 100, 0);
  this.street7 = new Street(7, "orange", "Diego de León", 100, 0);
  this.street8 = new Street(8, "orange", "Generá Oráa", 100, 0);
  this.street9 = new Street(9, "green", "Maldonado", 100, 0);
  this.street10 = new Street(10, "green", "Conde Peñalver", 100, 0);
  this.street11 = new Street(11, "yellow", "Lopez de Hoyos", 100, 0);
  this.street12 = new Street(12, "yellow", "Cruz del Rayo", 100, 0);
  this.street13 = new Street(13, "yellow", "Príncipe de Vergara", 100, 0);
  this.street14 = new Street(14, "purple", "Castelló", 100, 0);
  this.street15 = new Street(15, "purple", "Ayala", 100, 0);
  this.street16 = new Street(16, "green", "Goya", 100, 0);
  this.street17 = new Street(17, "green", "Recoletos", 100, 0);
  this.street18 = new Street(18, "green", "Paseo de la Castellana", 100, 0);
  this.street19 = new Street(19, "pink", "Fernando el Santo", 100, 0);
  this.street20 = new Street(20, "pink", "Ponzano", 100, 0);
}

Game.prototype.drawBoard = function() {
  var cells = "";
  var that = this;

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
        cells = cells + "<div class='cell outer' id='" + parsed + "' style='background-color:" + this["street" + parsed].color + "'>" +
          "<div class='street-name'>" + this["street" + parsed].name + " </div>" +
          "<div class='price'>" + this["street" + parsed].price + "</div>" +
          "</div>"
      } else {
        cells = cells + "<div class='cell' id='outer-" + k + "'></div>"
      }
      k++;
    }
  }

  $("#board").html(cells)
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
  var that = this;

  dice.html('<div id="dice">1</div>')

  $("#dice").click(function() {
    var n = Math.floor(Math.random() * 6) + 1
    $(this).text(n)

    // find p1 number
    var currentCellNumber = $("#p1").parent().attr("id");
    // add n to this number
    var nextCellNumber = parseInt(currentCellNumber) + n;
    // delete p1
    $("#p1").remove();
    // find via Jquery cell with id #7 and add html
    if (nextCellNumber > 20) {
      nextCellNumber = nextCellNumber - 20;
      that.p1.rounds = that.p1.rounds + 1;
    }
    $("#" + nextCellNumber).html('<div class="player" id="p1"></div>')
  })
}
