let myChart;
const pesoChileno = document.getElementById("peso-ch");
const dolarOeuro = document.getElementById("convertir_a");
const mostrarResult = document.getElementById("result");
const mostrarGraf = document.getElementById("myChart");
const btnBuscar = document.getElementById("btn_buscar");

async function divisaFetch(ele) {
  try {
    const res = await fetch(`https://mindicador.cl/api/${ele}/`);
    const data = await res.json();
    const valorMoneda = data.serie[0].valor;
    let calculo = pesoChileno.value / valorMoneda;
    return calculo.toFixed(2);
  } catch (e) {
    mostrarResult.innerHTML = `Error Resultado: ${e.message}`;
  }
}

btnBuscar.addEventListener("click", insertarResult);

async function insertarResult() {
  try {
    let tipoCambio = dolarOeuro.value;
    await MostrarUltimosDias(tipoCambio);
    mostrarResult.innerHTML = await divisaFetch(tipoCambio) + ' ' +  tipoCambio;
    if (myChart) {
        myChart.destroy();
    }
    await graficoChart(tipoCambio)
  } catch (e) {
    mostrarResult.innerHTML = `Error Resultado: ${e.message}`;
  }
}

insertarResult()

async function MostrarUltimosDias(ele) {
    try {
      fechaGraf = [];
      datoGraf = [];
      const res = await fetch(`https://mindicador.cl/api/${ele}/`);
      const data2 = await res.json();
  
      for (let i = 0; i < 10; i++) {
        let fechaGrafico = data2.serie[i].fecha;
        let fechaGraficoAjustado = fechaGrafico.slice(0, -14);
  
        let datoGrafico = data2.serie[i].valor;
  
        fechaGraf.push(fechaGraficoAjustado);
        datoGraf.push(datoGrafico);
      }
  
      await graficoChart(ele);
  
    } catch (e) {
      mostrarGraf.innerHTML = `Error Gráfico: ${e.message}`;
    }
  }


  async function graficoChart(valor) {
    const ctx = document.getElementById("myChart");
    Chart.defaults.font.size = 20;
    let backgroundColors = [
        'white','white','white','white','blue','blue','blue','red','red','red','red'
    ];
  
    if (valor === "euro") {
      backgroundColors = [
        'blue','blue','blue','yellow','yellow','yellow','yellow','blue','blue','blue'
      ];
    }
  
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: fechaGraf.slice(0, 10),
        datasets: [
          {
            label: `---Valor del ${valor} a peso Chileno---`,
            data: datoGraf.slice(0, 10),
            backgroundColor: backgroundColors,
            borderWidth: 5,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }