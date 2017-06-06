var Game = function(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;

  this.turn = 1;

  this.street1 = new Street(1, "blue", "Antón Martín", 100, 0);
  this.street2 = new Street(2, "blue", "Alcalá", 200, 0);
  this.street3 = new Street(3, "grey", "Serrano", 300, 0);
  this.street4 = new Street(4, "grey", "Velazquez", 400, 0);
  this.street5 = new Street(5, "grey", "Claudio Coello", 500, 0);
  this.street6 = new Street(6, "orange", "Lagasca", 600, 0);
  this.street7 = new Street(7, "orange", "Diego de León", 700, 0);
  this.street8 = new Street(8, "orange", "Generá Oráa", 800, 0);
  this.street9 = new Street(9, "green", "Maldonado", 900, 0);
  this.street10 = new Street(10, "green", "Conde Peñalver", 1000, 0);
  this.street11 = new Street(11, "yellow", "Lopez de Hoyos", 1100, 0);
  this.street12 = new Street(12, "yellow", "Cruz del Rayo", 1200, 0);
  this.street13 = new Street(13, "yellow", "Príncipe de Vergara", 1300, 0);
  this.street14 = new Street(14, "purple", "Castelló", 1400, 0);
  this.street15 = new Street(15, "purple", "Ayala", 1500, 0);
  this.street16 = new Street(16, "green", "Goya", 1600, 0);
  this.street17 = new Street(17, "green", "Recoletos", 1700, 0);
  this.street18 = new Street(18, "green", "Paseo de la Castellana", 1800, 0);
  this.street19 = new Street(19, "pink", "Fernando el Santo", 2000, 0);
  this.street20 = new Street(20, "pink", "Ponzano", 2100, 0);
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
          "<div class='player-box'></div>" +
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
  var cell = $("#1 .player-box");
  // añadirle el html del player:
  // <div class="player" id="p1"></div>
  cell.html('<div class="player" id="p1"></div>')
  cell.append('<div class="player" id="p2"></div>')
}

Game.prototype.drawDice = function() {
  var dice = $("#outer-16");
  var that = this;

  dice.html('<div id="dice">1</div>')
  $("#dice").append("<img id='theImg' src='images/1.jpg' width = 50px />");
  $("#dice").click(function() {
    var p = that["p" + that.turn];

    var n = Math.floor(Math.random() * 6) + 1;
    $(this).text(n);
    $("#dice").append("<img id='theImg' src='images/" + n + ".jpg' width = 50px />");

    // find p number
    var currentCellNumber = $("#p" + that.turn).parent().parent().attr("id");
    // add n to this number
    var nextCellNumber = parseInt(currentCellNumber) + n;
    // delete p1
    $("#p" + that.turn).remove();

    // find via Jquery cell with id #7 and add html
    if (nextCellNumber > 20) {
      nextCellNumber = nextCellNumber - 20;
      p.rounds += 1;
      p.money += 1000;
    }
    $("#" + nextCellNumber + " .player-box").append(
      '<div class="player" id="p' + that.turn + '" ></div>'
    );

    // $("#1 .player-box")
    var street = that["street" + nextCellNumber];
    var ownerCell = street.owner;
    // ask to buy street if the street is free and the player has enough money

    if (ownerCell === 0 && p.money >= street.price) {
      setTimeout(function() {
        var answerStreet;
        var questionStreet = confirm("¿Quieres comprar la calle?. Tienes " + p.money + "€. Y esta calle cuesta" + street.price + "€.");
        if (questionStreet == true) {
          answerStreet = "¡Has comprado la calle!";
          p.money = p.money - street.price;
          street.owner = 1;
          $("#p" + that.turn).parent().parent().addClass("player-owner-color" + "-p-" + that.turn);
        } else {
          answerStreet = "¡No has commprado la calle!";
        }
        alert(answerStreet);
        that.turn = that.turn === 1 ? 2 : 1

        that.checkIfWin();
      }, 250)
    } else {
      that.turn = that.turn === 1 ? 2 : 1
    }
  })
}

// Si un jugador gana, un alert dando la enhorabuena al jugador
Game.prototype.checkIfWin = function() {
  var p1 = 0;
  var p2 = 0;

  for (var i = 1; i < 21; i++) {
    var street = this["street" + i];

    if (street.owner === 1) {
      p1++;
    } else if (street.owner === 2) {
      p2++;
    }
  }

  if (p1 + p2 === 20) {
    if (p1 > p2) {
      alert("El jugador 1 ha ganado la partida!");
    } else if (p1 < p2) {
      alert("El jugador 2 ha ganado la partida!");
    } else {
      alert("Habéis empatado!");
    }
  }
}
