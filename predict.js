const nn = ml5.neuralNetwork({task: 'regression'})
nn.load('./model/model.json', modelLoaded)

async function modelLoaded() {
    console.log("the model was loaded!")
}

let button = document.getElementById('predict')
button.addEventListener('click', ev => predict(ev))

async function predict(ev) {
    let fixedIngevuld = document.getElementById('fixedAcidity').value;
    let volatileIngevuld = document.getElementById('volatileAcidity').value;
    let citricIngevuld = document.getElementById('citricAcid').value;
    let chloridesIngevuld = document.getElementById('chlorides').value;
    let sulfurIngevuld = document.getElementById('freeSulfurDioxide').value;
    let totalSulferIngevuld = document.getElementById('totalSulfurDioxide').value;
    let sulphatesIngevuld = document.getElementById('sulphates').value;
    let alcoholIngevuld = document.getElementById('alcohol').value;


    const result = await nn.predict({
        fixedAcidity: parseInt(fixedIngevuld),
        volatileAcidity: parseInt(volatileIngevuld),
        citricAcid:parseInt(citricIngevuld),
        chlorides: parseInt(chloridesIngevuld),
        freeSulfurDioxide: parseInt(sulfurIngevuld),
        totalSulfurDioxide: parseInt(totalSulferIngevuld),
        sulphates: parseInt(sulphatesIngevuld),
        alcohol: parseInt(alcoholIngevuld)
    })
    console.log(result)

    let endResult = document.getElementById('result')
    endResult.innerHTML = `De kwaliteit is: ${result[0].quality}`;
}