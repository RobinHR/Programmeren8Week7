const nn = ml5.neuralNetwork({task: 'regression', debug: true})

function loadData() {
    Papa.parse("./data/winequality.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => prepareData(results.data)
    })
}

function prepareData(data) {
    data.sort(() => Math.random() > 0.5)
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    console.log(trainData);

    for (let row of trainData) {
        nn.addData({fixedAcidity: row.fixedAcidity, volatileAcidity: row.volatileAcidity, citricAcid: row.citricAcid, chlorides: row.chlorides, freeSulfurDioxide: row.freeSulfurDioxide, totalSulfurDioxide: row.totalSulfurDioxide, sulphates: row.sulphates, alcohol: row.alcohol}, {quality: row.quality})
    }

    nn.normalizeData()
    nn.train({epochs: 10}, () => modelTrained(nn))
}
function modelTrained(nn) {
    let button = document.getElementById('saveModel')
    button.addEventListener('click', (event) => saveModel(nn));
}


function saveModel(nn){
    nn.save();
}

loadData();