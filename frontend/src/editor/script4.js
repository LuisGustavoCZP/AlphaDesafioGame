const pergaminhos = [ {
    "src": 'pergaminho1-removebg-preview.png',
    "recipe": 'receita-vigor-removebg-preview.png',
    "id": 0,
    "value": 3
    
},
{
    "src": 'pergaminho2-removebg-preview.png',
    "recipe": 'receita-mana-removebg-preview.png',
    "id": 1,
    "value": 5
},
{
    "src": 'pergaminho3-removebg-preview.png',
    "recipe": 'receita-disciplina-removebg-preview.png',
    "id": 2,
    "value": 7
},
{
    "src": 'pergaminho4-removebg-preview.png',
    "recipe": 'receita-poder-removebg-preview.png',
    "id": 3,
    "value": 3
    
},
{
    "src": 'pergaminho5-removebg-preview.png',
    "recipe": 'receita-vida-removebg-preview.png',
    "id": 4,
    "value": 5
},
{
    "src": 'pergaminho6-removebg-preview.png',
    "recipe": 'receita-animacao-removebg-preview.png',
    "id": 5,
    "value": 7
}
]
let tabelar = document.getElementById("tabela");
const response = document.querySelector(".itenstotal");
let absoluteArr = []
let newarr = [
    {},
    {},
    {},
];
pergaminhos.forEach(elem => {
    let obj = document.createElement("img")
    obj.src = elem.src;
    obj.id = elem.id;
    obj.classList.add("potion");
    tabelar.appendChild(obj)
})
$('#tabela').hide();
$('.mago').click((event) => {
    $('#tabela').show();
    let imags = event.target;
    let posArr = event.target.alt
    let dados;
    let i = 0;
    $('.potion').click((event) => {
        
        if (i ==0) {dados = pergaminhos[`${event.target.id}`];
        newarr[`${posArr}`] = dados;
        console.log(newarr);
    i++}
        imags.src = event.target.src; 
        dados = ''
        imags = ''
        $('#tabela').hide();
        

    })
    

})
function criar(){
    response.innerHTML += `<tr><td>Item:</td><td><img src= "${(newarr[0].src)}" class = "item"></td><td>Poções:</td><td><img src= "${(newarr[1].src)}" class = "item"></td><td>+</td><td><img src= "${(newarr[2].src)}" class = "item"></td></tr>`
    absoluteArr.push(newarr)
}
function showabsolute() {
    console.log(absoluteArr)
}