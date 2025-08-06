const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select"); // "converter para"
const fromCurrency = document.getElementById("from-currency");     // "converter de"

const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // valor da moeda de origem
const currencyValueConverted = document.querySelector(".currency-value"); // valor da moeda convertida

// Taxas baseadas no real
const dolarToday = 5.5;
const euroToday = 6.2;
const libraToday = 7.5;

// Função para obter taxa de câmbio
function getRate(currency) {
    switch (currency) {
        case "real": return 1;
        case "dolar": return dolarToday;
        case "euro": return euroToday;
        case "libra": return libraToday;
        default: return 1;
    }
}

// Função principal de conversão
function convertValues() {
    const input = document.querySelector(".input-Currency");
    const inputCurrencyValue = parseFloat(input.value.replace(",", "."));

    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        alert("Por favor, digite um valor válido maior que zero.");
        return;
    }

    const fromValue = fromCurrency.value;
    const toValue = currencySelect.value;

    const fromRate = getRate(fromValue);
    const toRate = getRate(toValue);

    const valueInReal = inputCurrencyValue * fromRate;
    const convertedValue = valueInReal / toRate;

    // Exibir valor convertido da moeda de origem (sempre em reais)
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valueInReal);

    // Exibir valor convertido final com moeda correta
    switch (toValue) {
        case "dolar":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(convertedValue);
            break;

        case "euro":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR"
            }).format(convertedValue);
            break;

        case "libra":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP"
            }).format(convertedValue);
            break;

        case "real":
            currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(convertedValue);
            break;
    }
    const fromCurrencyName = document.getElementById("from-currency-name");

switch (fromValue) {
    case "real":
        fromCurrencyName.innerHTML = "Real Brasileiro";
        break;
    case "dolar":
        fromCurrencyName.innerHTML = "Dólar Americano";
        break;
    case "euro":
        fromCurrencyName.innerHTML = "Euro";
        break;
    case "libra":
        fromCurrencyName.innerHTML = "Libra";
        break;
}

}

// Atualiza nome e imagem da moeda de destino
function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    if (currencySelect.value === "dolar") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImage.src = "./assets/usaflag.png";
    }

    if (currencySelect.value === "euro") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = "./assets/euro.png";
    }

    if (currencySelect.value === "libra") {
        currencyName.innerHTML = "Libra";
        currencyImage.src = "./assets/libra.png";
    }

    if (currencySelect.value === "real") {
        currencyName.innerHTML = "Real Brasileiro";
        currencyImage.src = "./assets/brasilflag.png";
    }

    convertValues(); // Faz a conversão ao mudar a moeda
}

// Eventos
currencySelect.addEventListener("change", changeCurrency);
fromCurrency.addEventListener("change", convertValues);
convertButton.addEventListener("click", convertValues);
