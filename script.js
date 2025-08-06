const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select"); // "converter para"
const fromCurrency = document.getElementById("from-currency");     // "converter de"

const dolarToday = 5.5; // 1 dólar = 5.5 reais
const euroToday = 6.2;
const libraToday = 7.5;

function getRate(currency) {
    switch (currency) {
        case "real": return 1;
        case "dolar": return dolarToday;
        case "euro": return euroToday;
        case "libra": return libraToday;
        default: return 1;
    }
}

function convertValues() {
    const input = document.querySelector(".input-Currency");
    const inputCurrencyValue = parseFloat(input.value.replace(",", "."));

    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        alert("Por favor, digite um valor válido maior que zero.");
        return;
    }

    // Moeda de origem e destino selecionadas
    const fromValue = fromCurrency.value;
    const toValue = currencySelect.value;

    // Elementos onde exibiremos os valores formatados
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    // Configurar moeda e locale para a moeda de origem
    let fromCurrencyCode = "BRL";
    let fromLocale = "pt-BR";

    switch (fromValue) {
        case "real":
            fromCurrencyCode = "BRL";
            fromLocale = "pt-BR";
            break;
        case "dolar":
            fromCurrencyCode = "USD";
            fromLocale = "en-US";
            break;
        case "euro":
            fromCurrencyCode = "EUR";
            fromLocale = "de-DE";
            break;
        case "libra":
            fromCurrencyCode = "GBP";
            fromLocale = "en-GB";
            break;
    }

    // Mostrar valor de origem formatado
    currencyValueToConvert.innerHTML = new Intl.NumberFormat(fromLocale, {
        style: "currency",
        currency: fromCurrencyCode
    }).format(inputCurrencyValue);

    // Obter taxas de câmbio (valor em real por unidade da moeda)
    const fromRate = getRate(fromValue);
    const toRate = getRate(toValue);

    // Converter valor para real e depois para moeda destino
    const valueInReais = inputCurrencyValue * fromRate;
    const convertedValue = valueInReais / toRate;

    // Configurar moeda e locale para a moeda destino
    let toCurrencyCode = "USD";
    let toLocale = "en-US";

    switch (toValue) {
        case "dolar":
            toCurrencyCode = "USD";
            toLocale = "en-US";
            break;
        case "euro":
            toCurrencyCode = "EUR";
            toLocale = "de-DE";
            break;
        case "libra":
            toCurrencyCode = "GBP";
            toLocale = "en-GB";
            break;
    }

    // Mostrar valor convertido formatado
    currencyValueConverted.innerHTML = new Intl.NumberFormat(toLocale, {
        style: "currency",
        currency: toCurrencyCode
    }).format(convertedValue);
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    // Atualiza o nome e imagem da moeda destino
    switch (currencySelect.value) {
        case "dolar":
            currencyName.innerHTML = "Dólar Americano";
            currencyImage.src = "./assets/usaflag.png";
            break;
        case "euro":
            currencyName.innerHTML = "Euro";
            currencyImage.src = "./assets/euro.png";
            break;
        case "libra":
            currencyName.innerHTML = "Libra";
            currencyImage.src = "./assets/libra.png";
            break;
    }

    convertValues();
}

// Atualiza imagem e nome moeda origem ao mudar seleção
function changeFromCurrency() {
    const currencyNameFrom = document.querySelector(".currency"); // o texto "real", no primeiro box
    const currencyImageFrom = document.querySelector(".currency-imagem");

    switch (fromCurrency.value) {
        case "real":
            currencyNameFrom.innerHTML = "Real Brasileiro";
            currencyImageFrom.src = "./assets/brasilflag.png";
            break;
        case "dolar":
            currencyNameFrom.innerHTML = "Dólar Americano";
            currencyImageFrom.src = "./assets/usaflag.png";
            break;
        case "euro":
            currencyNameFrom.innerHTML = "Euro";
            currencyImageFrom.src = "./assets/euro.png";
            break;
        case "libra":
            currencyNameFrom.innerHTML = "Libra";
            currencyImageFrom.src = "./assets/libra.png";
            break;
    }

    convertValues();
}

// Eventos para atualização
currencySelect.addEventListener("change", changeCurrency);
fromCurrency.addEventListener("change", changeFromCurrency);
convertButton.addEventListener("click", convertValues);
