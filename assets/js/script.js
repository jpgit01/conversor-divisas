const pesoChileno = document.getElementById("peso-ch");
const monedaConvertir = document.getElementById("convertir_a");
const mostrarResult = document.getElementById("result");
const mostrarGraf = document.getElementById("myChart");
const btnBuscar = document.getElementById("btn_buscar");

async function divisaFetch(ele) {
  try {
    const res = await fetch(`https://mindicador.cl/api/${ele}/`);
    const data = await res.json();
    const valorMoneda = data.serie[0].valor;
    let calculo = pesoChileno.value / valorMoneda
    return calculo.toFixed(2);
  } catch (e) {
    mostrarResult.innerHTML = `Error Resultado: ${e.message}`;
  }
}

btnBuscar.addEventListener("click", insertarResult);
async function insertarResult() {
  try {
    let tipoCambio = monedaConvertir.value
    mostrarResult.innerHTML = await divisaFetch(tipoCambio)
  } catch (e) {
    mostrarResult.innerHTML = `Error Resultado: ${e.message}`;
  }

}

let fechaGraf = []
let datoGraf = []
async function MostrarUltimosDias(ele) {
  try {
    const res = await fetch(`https://mindicador.cl/api/${ele}/`);
    const data2 = await res.json();

    for (let i = 0; i < 10; i++) {
        let fechaGrafico = data2.serie[i].fecha;
        let fechaGraficoAjustado = fechaGrafico.slice(0, -14)


        let datoGrafico = data2.serie[i].valor




      fechaGraf.push(fechaGraficoAjustado)
      datoGraf.push(datoGrafico)
    }

    graficoChart()
  } catch (e) {
    mostrarGraf.innerHTML = `Error Gráfico: ${e.message}`;
  }
}

MostrarUltimosDias("dolar")

function graficoChart() {
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [fechaGraf[0],fechaGraf[1],fechaGraf[2],fechaGraf[3],fechaGraf[4],fechaGraf[5],fechaGraf[6],fechaGraf[7],fechaGraf[8],fechaGraf[9],fechaGraf[10]],
      datasets: [{
        label: 'Valor',
        data: [datoGraf[0],datoGraf[1],datoGraf[2],datoGraf[3],datoGraf[4],datoGraf[5],datoGraf[6],datoGraf[7],datoGraf[8],datoGraf[9],datoGraf[10]],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}