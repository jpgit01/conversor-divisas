const pesoChileno = document.getElementById("peso-ch");
const monedaConvertir = document.getElementById("convertir_a");
const mostrarResult = document.getElementById("result");
const mostrarGraf = document.getElementById("grafico");
const btnBuscar = document.getElementById("btn_buscar");

async function divisaFetch(ele) {
  try {
    const res = await fetch(`https://mindicador.cl/api/${ele}/`);
    const data = await res.json();
    const valorMoneda = data.serie[0].valor;
    console.log(valorMoneda)
    let calculo = pesoChileno.value / valorMoneda
    return calculo.toFixed(2);
  } catch (e) {
    mostrarResult.innerHTML = `Error Resultado: ${e.message}`;
  }
}

btnBuscar.addEventListener("click", insertarResult);
async function insertarResult() {
    try{
        let tipoCambio = monedaConvertir.value
        mostrarResult.innerHTML= await divisaFetch(tipoCambio)
    }catch (e) {
        mostrarResult.innerHTML = `Error Resultado: ${e.message}`;
      }

}
