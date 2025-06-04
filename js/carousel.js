

//carousel

//Array storage class
let carouselArr = [];


//class Carousel - para gerenciar os itens do carrossel
class Carousel {

    // Constrututor da classe, que recebe imagem, título e link do item
    constructor(imagem, titulo, link){
        this.imagem = imagem;
        this.titulo = titulo;
        this.link = link;
    }
   
    // Método estático para iniciar o carrossel  
    static Start(arr){
        if(arr){ // Verifica se um array válido foi passado como argumento

            if(arr.length > 0){ // Garante que o array tenha elementos
                Carousel._arr = arr; // Salva o array na classe
                Carousel._sequence = 0; // Inicializa a sequência do carrosel
                Carousel._size = arr.length; // Guarda o tamanho doa array
                Carousel.Next(); //Mostra o primeiro item do carrossel

                // Configura um intervalo para alternar as imagens a cada dois segundos
                Carousel._interval = setInterval(Carousel.Next,2000);
            }
            
        } else {
            throw "Method Start need a Array Variable."; // Caso um array inválido seja passado, gera um erro
        }
    }
    //Método estático que avança para o próximo item do carrossel
    static Next(){
        const item = Carousel._arr[Carousel._sequence]; //Obtém o item atual do carrossel
        //Obtém os elementos HTML onde serão exibidos o carrossel e o título
        const carouselDiv = document.getElementById('carousel');
        const titleDiv = document.getElementById('carousel-title');
        //atualiza a div do carrossel com um link contendo a imagem do item
        carouselDiv.innerHTML = 
        `<a href="${item.link}">
            <img src="img/${item.imagem}" alt="${ item.titulo}" style="width:100%;  max-height:546px; object-fit: cover; ">
        </a>`;
        // Atualiza a div do título com o nome do item
        titleDiv.innerHTML = `<h2 style="text-align: center; margin: 120px; font-size:20px; color: #1351d8 ">${item.titulo}</h2>`;
        // Incrementa a sequência, garantindo que retorne ao início ao atingir o útimo item
        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        
    }
};
