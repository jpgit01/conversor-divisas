const pesoChileno = document.getElementById("peso-ch");
const monedaConvertir = document.getElementById("convertir_a");
const mostrarResult = document.getElementById("result");
const mostrarGraf = document.getElementById("grafico");
const btnBuscar = document.getElementById("btn_buscar");



btnBuscar.addEventListener("click", myFunction);

function myFunction() {
  document.getElementById("result").innerHTML = pesoChileno.value;
}


async function divisaFetch() {
    try {
    const res = await fetch("https://mindicador.cl/api/dola/");
    const data = await res.json();
    console.log(data.serie[0].valor);
    } catch (e) {
    mostrarResult.innerHTML = `Error Resultado ${e.message}`;
    
    }



    }
    divisaFetch();