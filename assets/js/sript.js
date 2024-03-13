function converterTemperatura(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    
    var temperaturaInput = document.getElementById('typenumber').value.trim(); // Remover espaços em branco extras
    var temperatura = parseFloat(temperaturaInput);
    var tipoEntrada = document.getElementById('temp1').value;
    var tipoSaida = document.getElementById('temp2').value;
    var resultado = document.getElementById('resultado');

    // Verificar se o campo de inserir temperatura está vazio
    if (temperaturaInput === '') { // Corrigido de temp1 para temperaturaInput
        resultado.innerText = 'Por favor, insira uma temperatura.';
        return;
    }

    // Verificar se a temperatura de entrada é válida
    if ((tipoEntrada === 'kelvin' && temperatura < 0) || (tipoEntrada === 'celsius' && temperatura < -273.15)) {
        resultado.innerText = 'Temperatura de entrada inválida.';
        return;
    }

    
//fromulas para Conversão de temperatura
function celsiusParaFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

function celsiusParaKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitParaCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function fahrenheitParaKelvin(fahrenheit) {
    return (fahrenheit + 459.67) * 5 / 9;
}

function kelvinParaCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinParaFahrenheit(kelvin) {
    return kelvin * 9 / 5 - 459.67;
}

    // Converter temperatura
    if (tipoEntrada === 'celsius') {
        if (tipoSaida === 'fahrenheit') {
            resultado.innerText = temperatura + ' Celsius = ' + celsiusParaFahrenheit(temperatura).toFixed(2) + ' Fahrenheit';
        } else if (tipoSaida === 'kelvin') {
            resultado.innerText = temperatura + ' Celsius = ' + celsiusParaKelvin(temperatura).toFixed(2) + ' Kelvin';
        } else {
            resultado.innerText = 'Temperatura de saída não suportada';
        }
    } else if (tipoEntrada === 'fahrenheit') {
        if (tipoSaida === 'celsius') {
            resultado.innerText = temperatura + ' Fahrenheit = ' + fahrenheitParaCelsius(temperatura).toFixed(2) + ' Celsius';
        } else if (tipoSaida === 'kelvin') {
            resultado.innerText = temperatura + ' Fahrenheit = ' + fahrenheitParaKelvin(temperatura).toFixed(2) + ' Kelvin';
        } else {
            resultado.innerText = 'Temperatura de saída não suportada';
        }
    } else if (tipoEntrada === 'kelvin') {
        if (tipoSaida === 'celsius') {
            resultado.innerText = temperatura + ' Kelvin = ' + kelvinParaCelsius(temperatura).toFixed(2) + ' Celsius';
        } else if (tipoSaida === 'fahrenheit') {
            resultado.innerText = temperatura + ' Kelvin = ' + kelvinParaFahrenheit(temperatura).toFixed(2) + ' Fahrenheit';
        } else {
            resultado.innerText = 'Temperatura de saída não suportada';
        }
    }

    // Passar tipoEntrada para exibirInformacoesExtras()
    exibirInformacoesExtras(temperatura, tipoEntrada);
}

function exibirInformacoesExtras(temperatura, tipoEntrada) {
    var infoExtra = document.getElementById('infoExtra');
    var imagem = document.getElementById('imagemInfoExtra');
    var frase = document.getElementById('fraseInfoExtra');

    // Convertendo a temperatura para Celsius, se necessário
    if (tipoEntrada === 'fahrenheit') {
        temperatura = fahrenheitParaCelsius(temperatura);
    } else if (tipoEntrada === 'kelvin') {
        temperatura = kelvinParaCelsius(temperatura);
    }

    // Verificar se a temperatura corresponde a uma das temperaturas específicas
    if (Math.abs(temperatura - 0) < 0.01) {
        imagem.src = "assets/img/gela.jfif";
        frase.innerText = 'temperatura em que a água congela';
    } else if (Math.abs(temperatura - 36) < 0.01) {
        imagem.src = "assets/img/corporal.png";
        frase.innerText = 'temperatura corporal media';
    } else if (Math.abs(temperatura - 100) < 0.01) {
        imagem.src = "assets/img/ebu.webp";
        frase.innerText = 'ponto de ebulição da água';
    } else if (Math.abs(temperatura - 15000000) < 0.01) {
        imagem.src = "assets/img/sol.jpg";
        frase.innerText = 'temperatura aproximada da superfície do Sol';
    } else {
        // Se a temperatura não corresponder a nenhuma das temperaturas específicas, oculte a div de informações extras
        infoExtra.style.display = 'none';
        return;
    }

    // Se a temperatura corresponder a uma das temperaturas específicas, exiba a div de informações extras
    infoExtra.style.display = 'block';
}

