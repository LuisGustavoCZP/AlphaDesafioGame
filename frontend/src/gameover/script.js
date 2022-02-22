$(document).ready(function() {
    const userPoints = {name: "Lucas", points: 356, ranking: 5};


    $("#points").html(`Pontos: ${userPoints.points}`);
    $("#ranking").html(`Classificação: #${userPoints.ranking}`);


});