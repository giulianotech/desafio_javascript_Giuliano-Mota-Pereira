
// compare.js

class Car {
    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image){
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;    
    }

    exibirInfo() {
       console.log(`nome:${this.nome}, Preço:${this.preco}, Motor:${this.motor}, Potência:${this.potencia}`);
    }
} 

// Instâncias dos carros que estão disponíveis
let carroXL = new Car(
    "Ranger XL", 
    "R$ 165.055,00", 
    "511mm", 
    "1.884mm", 
    "233mm", 
    "1250kg", 
    "2.0 turbo diesel", 
    "170CV", 
    "1876 litros", 
    "aro 17'", 
    "img/XL Cabine.jpg"
);

let carroXLS = new Car(
    "Ranger XLS", 
    "R$ 167.250,00", 
    "511mm", 
    "1086mm", 
    "232mm", 
    "1076kg", 
    "2.0 turbo diesel", 
    "170cv", 
    "1876 litros", 
    "aro 17'", 
    "img/xls 2.2 diesel.jpg"
);

let carroStorm = new Car(
    "Ranger Storm", 
    "R$ 184.912,00", 
    "511mm", 
    "1821mm", 
    "1821mm", 
    "1040kg", 
    "3.2 diesel", 
    "200cv", 
    "1180 litros", 
    "aro 17'", 
    "img/storm.jpg"
);

// Array de todos os carros disponíveis 
const availableCars = [carroXL, carroXLS, carroStorm];


let carsToCompare = []; 

// Exibe as informações dos carros no console 
carroXL.exibirInfo();
carroXLS.exibirInfo();
carroStorm.exibirInfo();




function getCarPositionInArray(arr, carClass) {
   for(let i = 0; i < arr.length; i++){
        if(arr[i].nome === carClass.nome) {
            return i;
        }
    }
    return -1;
}


function SetCarToCompare(el, carClass) {
    
    if(!(carClass instanceof Car)){ 
        throw new Error("O segundo argumento deve ser uma instância da classe Car.");
    }
   
    
    
    const position = getCarPositionInArray(carsToCompare, carClass);

    if(el.checked){ 
        if(carsToCompare.length >= 2){
            alert("É permitido comparar no máximo 2 carros. ");
            el.checked = false; 
            return;    
        } 
        
        
        if(position === -1){
            carsToCompare.push(carClass);
            console.log(`Carro ${carClass.nome} adicionado para comparação.`);
        }
    } else { 
        if(position !== -1){
            carsToCompare.splice(position, 1); 
            console.log(`Carro ${carClass.nome} removido da comparação.`);
        }
    }
    console.log("Carros para comparação atuais:", carsToCompare.map(car => car.nome));
} 

// Mostra a tabela de comparação, com validações da quantidade de carros
function ShowCompare() {
    if (!Array.isArray(carsToCompare) || carsToCompare.length < 2) {
        alert("Selecione ao menos dois carros para comparar.");
        return;
    }

    const compareDiv = document.getElementById("compare");
    if (!compareDiv) {
        alert("Erro: elemento com id 'compare' não encontrado.");
        return;
    }
    compareDiv.style.display = "block";

    for (let i = 0; i < carsToCompare.length; i++) {
        const car = carsToCompare[i];

        const fields = [
            { id: `compare_image_${i}`, value: `<img src="${car.image}" style="width: 150px;" />` },
            { id: `compare_modelo_${i}`, value: car.nome },
            { id: `compare_alturacacamba_${i}`, value: `${car.alturaCacamba} mm` },
            { id: `compare_alturaveiculo_${i}`, value: `${car.alturaVeiculo} mm` },
            { id: `compare_alturasolo_${i}`, value: `${car.alturaSolo} mm` },
            { id: `compare_capacidadecarga_${i}`, value: `${car.capacidadeCarga} kg` },
            { id: `compare_motor_${i}`, value: `${car.motor}` },
            { id: `compare_potencia_${i}`, value: `${car.potencia} cv` },
            { id: `compare_volumecacamba_${i}`, value: `${car.volumeCacamba} L` },
            { id: `compare_roda_${i}`, value: `${car.roda}` }
        ];

        for (const field of fields) {
            const element = document.getElementById(field.id);
            if (!element) {
                alert(`Erro: elemento com id '${field.id}' não encontrado.`);
                continue;
            }
            element.innerHTML = field.value;
        }

        // Tratamento do preço
        const precoBruto = car.preco;
        let precoNum;

        if (typeof precoBruto === 'number') {
            precoNum = precoBruto;
        } else {
            precoNum = parseFloat(String(precoBruto).replace(/\./g, "").replace(",", "."));
            if (isNaN(precoNum)) {
                alert(`Erro ao converter o preço do carro "${car.nome}": valor inválido "${car.preco}".`);
                precoNum = 0;
            }
        }

        const precoFormatado = precoNum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const precoEl = document.getElementById(`compare_preco_${i}`);
        if (!precoEl) {
            alert(`Erro: elemento com id 'compare_preco_${i}' não encontrado.`);
        } else {
            precoEl.innerText = precoFormatado;
        }
    }
}


   
    UpdateCompareTable(); 
    document.getElementById("compare").style.display = "block"; 

    
    function HideCompare(){
        document.getElementById('compare').style.display = 'none';
}

   
    tableHeader.innerHTML = '<th>Característica</th>'; 
    tableBody.innerHTML = '';

    
    carsToCompare.forEach(car => {
        const th = document.createElement('th');
        th.textContent = car.nome;
        tableHeader.appendChild(th);
    });

    // --- Seção para a Imagem do Carro ---
    
    const imageRow = document.createElement('tr');
    const imageLabelTd = document.createElement('td');
    imageLabelTd.textContent = 'Imagem'; 
    imageRow.appendChild(imageLabelTd);

    carsToCompare.forEach(car => {
        const tdImage = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = car.image; 
        imgElement.alt = `Imagem do ${car.nome}`; 
        imgElement.style.width = '150px'; 
        imgElement.style.height = 'auto'; 
        tdImage.appendChild(imgElement);
        imageRow.appendChild(tdImage);
    });
    tableBody.appendChild(imageRow); 

    
    const toFeatures = [
        { Key: 'preco', label: 'Preço'},
        { Key: 'alturaCacamba', label: 'Altura da Caçamba'},
        { Key: 'alturaVeiculo', label: 'Altura do Veículo'},
        { Key: 'alturaSolo', label: 'Altura do Solo'},
        { Key: 'capacidadeCarga', label: 'Capacidade de Carga'},
        { Key: 'motor', label: 'Motor'},
        { Key: 'potencia', label: 'Potência'},
        { key: 'volumeCacamba', label: 'Volume da Caçamba' },
        { key: 'roda', label: 'Roda' },

        
     ];

    
    toFeatures.forEach(feature => {
        const tr = document.createElement('tr');
        const tdLabel = document.createElement('td');
        tdLabel.textContent = feature.label; 
        tr.appendChild(tdLabel);

        carsToCompare.forEach(car => {
            const tdValue = document.createElement('td');
           if (feature.key === 'preco') {
    const precoStr = car[feature.key];
    
    const precoNumerico = parseFloat(precoStr
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()
    );
    
    tdValue.textContent = isNaN(precoNumerico)
        ? car[feature.key]
        : precoNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
} else {
    tdValue.textContent = car[feature.key];
}
           
            tr.appendChild(tdValue);
        });
        tableBody.appendChild(tr); 
    });
