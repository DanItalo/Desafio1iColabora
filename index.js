const url = 'https://pokeapi.co/api/v2/pokemon/';

$(document).find(".pokebusca").on("click", function () {
    $(".table").css({ "display": "none" });
    let pokeBusca;
    pokeBusca = $(document).find(".pokemain").val();
    pokeInfo(pokeBusca);

});

$(document).find(".salvaPoke").on("click", function () {
    pegarPoke();
})

$(document).on("click", ".btn-danger", function (e) {
    $(e.target).closest("tr").remove();
});

$(document).on("click", ".btn-warning", function (e) {
    editarPoke(e);
});

function pokeInfo(datapoke) {
    if (datapoke != "") {
        fetch(url + datapoke)
            .then(response => response.json())
            .then(data => mostrarPokemon(data))
            .catch(err => alert('Erro na pesquisa, favor verifque o nome do pokemon ' + err));
        return
    } else {
        alert("Digite um pokémon e tente novamente!");
    }
}

function mostrarPokemon(poke) {
    if (poke != "") {
        $(document).find(".formpoke").css({ "display": "block" });
        $(document).find(".pokeid1").val(poke.id);
        $(document).find(".pokeid2").val(poke.name);
        $(document).find(".pokeid3").val(poke.height);
        $(document).find(".pokeid4").val(poke.weight);
    }
}

function pegarPoke() {
    let dadosPoke = [];
    dadosPoke.push($(document).find(".pokeid1").val());
    dadosPoke.push($(document).find(".pokeid2").val());
    dadosPoke.push($(document).find(".pokeid3").val());
    dadosPoke.push($(document).find(".pokeid4").val());

    pokeTabela(dadosPoke);
}

function pokeTabela(dadosPoke) {
    $(document).find(".formpoke").css({ "display": "none" });
    $(".table").css({ "display": "inline-table" });
    let tr = "<tr>";
    let td = "";
    for (i = 0; i < dadosPoke.length; i++) {
        td += "<td>" + dadosPoke[i] + "</td>";
    };
    td += "<td><button class='btn btn-warning btn-block mb-4'>Editar</button></td>";
    td += "<td><button class='btn btn-danger btn-block mb-4'>Excluir</button></td>";
    tr += td;
    tr += "</tr>";

    $(document).find("tbody").append(tr);
}

function editarPoke(e) {
    $(document).find(".formpoke").css({ "display": "block" });
    $(".table").css({ "display": "none" });
    $(e.target).closest("tr").remove();
    $(document).find('pokeid1').val($(e.target).parent().parent()[0].childNodes[0].innerHTML)
    $(document).find('pokeid2').val($(e.target).parent().parent()[0].childNodes[1].innerHTML)
    $(document).find('pokeid3').val($(e.target).parent().parent()[0].childNodes[2].innerHTML)
    $(document).find('pokeid4').val($(e.target).parent().parent()[0].childNodes[3].innerHTML)
}