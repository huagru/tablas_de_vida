/*
=========================================================================
                            ÍNDICE / INDEX
=========================================================================
1- FUNCIONES LINKEADAS A LOS BOTONES / FUNCTIONS LINKED TO BUTTONS:
    1.1- Función que agrega filas a la tabla / Function that adds rows to the table.
    1.2- Función que borra filas de la tabla / Function that delets rows from the table.
    1.3- Función para limpiar la tabla / Function that resets the whole table.

2- FUNCIÓN QUE OBTIENE LOS DATOS INGRESADOS POR EL USUARIO / FUNCTION THAT GETS DATA FROM USER.

3- FUNCIONES PARA LOS CÁLCULOS / FUNCTIONS THAT CALCULATE THE VALUES
    3.1- Calcular el valor lx / Solve lx values.
    3.2- Calcular el valor dx / Solve dx values.
    3.3- Calcular el valor qx / Solve qx values.
    3.4- Calcular el valor Lx / Solve Lx values.
    3.5- Calcular el valor Tx / Solve Tx values.
    3.6- Calcular el valor ex / Solve ex values.

    3.7- Función que llama a las funciones para calcular / Function that calls the previous functions.

    4- FUNCIÓN QUE CARGA LOS RESULTADOS A LA TABLA / FUNCTION THAT UPLOADS THE RESULTS TO THE TABLE.

    5- FUNCIÓN TEST / TEST FUNCTION.
    Si no sabés con qué datos llenar la tabla, clickear el botón "test" para generarlos automáticamente.
    If you don't know how to fill the table, click "test" button to automatically fill it.

    6- FUNCIÓN PARA HACER LA GRÁFICA / FUNCTION TO SHOW THE GRAPHIC.
    Usa chart.js / it uses chart.js

*/



// Generamos los arreglos / Creates the arryays:
var x = [];
var nx = [];
var lx = [];
var dx = [];
var qx = [];
var Lx = [];
var Tx = [];
var ex = [];






// 1- FUNCIONES PARA LOS BOTONES DE LA APP: ====================================================
//1.1- FUNCIÓN QUE AGREGA UNA FILA A LA TABLA / FUNCTION THAT ADDS A ROW TO THE TABLE:
function agregar_fila(){
  var tabla = document.getElementById("tabla");

  // Crea un elemento <tr> (table row) vacío y lo agrega al final de la tabla:
  var fila = tabla.insertRow(-1);

  // Se crean las celdas y se las asigna a fila, creada mas arriba:
  var fila_x = fila.insertCell(0); 
  var fila_nx = fila.insertCell(1);
  var fila_lx = fila.insertCell(2);
  var fila_dx = fila.insertCell(3);
  var fila_qx = fila.insertCell(4);
  var fila_Lx = fila.insertCell(5);
  var fila_Tx = fila.insertCell(6);
  var fila_ex = fila.insertCell(7);

    
  // agregamos dos input a la tabla: x y nx:
  fila_x.innerHTML = '<input class="input1">';
  fila_nx.innerHTML = '<input class="input2">';
  
  // Les damos dos clases a los elementos que creamos mas arriba:
  fila_lx.className = "celda lx";
  fila_dx.className = "celda dx";
  fila_qx.className = "celda qx";
  fila_Lx.className = "celda Lx";
  fila_Tx.className = "celda Tx";
  fila_ex.className = "celda ex";
  
  
}




// 1.2- FUNCIÓN PARA BORRAR FILAS / FUNCTION THAT DELETS ROWS ===========================================
function borrar_fila(){
  // Obtenemos la cantidad de filas (elementos <tr>):
  let cantidad_de_filas = document.getElementsByTagName("tr").length;

  if (cantidad_de_filas < 3) {
    //alert("Máximo número de filas eliminadas")
  
  } else {
      
      document.getElementById("tabla").deleteRow(-1); //el -1 indica que empezamos desde el final.

  }

}



//1.3- FUNCIÓN PARA LIMPIAR LA TABLA / FUNCTION THAT CLEANS THE TABLE: =========================================================================
//Función que vacía los inputs, los arreglos, los valores de las celdas, la gráfica y las filas menos una sola:
function limpiar_datos(){
    //Limpiando los inputs de la tabla, no el resto de las celdas:
    let elementos_input = [] ;
    elementos_input = document.getElementsByTagName("input");

    for(var i=0; i<elementos_input.length ; i++){
       elementos_input[i].value = "" ;


    } 

    


    //Limpiando las celdas de la tabla y borrando las filas menos una:
    let valores_celdas = [] ;
    valores_celdas = document.getElementsByClassName("celda");
    
    
    for (var j=0; j<valores_celdas.length; j++) {
      //vacía las celdas que no son inputs:
      valores_celdas[j].innerHTML = "<td></td>";

      
      //borra las filas menos una sola. 
      //ERROR: si la tabla esta vacía, trata de borrar todo igual y aparecen alerts.
      //el borrar_fila() se ejecuta el número de celdas y debería ser el número de filas -1
      //borrar_fila();

    
    }

    filas_a_borrar = document.getElementsByTagName("tr").length;
    for (var k = 0; k < filas_a_borrar - 1; k++) {
        borrar_fila();
    }
    
    // Vaciando los arreglos con los datos calculados, de otra forma suma los elementos a los nuevos:
    x = [];
    nx = [];
    lx = [];
    dx = [];
    qx = [];
    Lx = [];
    Tx = [];
    ex = [];

    
    

    //deja la gráfica vacía, solo los ejes, porque trata de crearla con arreglos vacíos:
    hacer_grafica();

    //Habilita el botón test, por si hicieron click en "test", que deshabilita el botón:
    document.getElementById("boton_test").disabled = false;

}




//Función que convierte strings de números a integers:
function a_decimales(arreglo) {

    for (var i = 0; i < arreglo.length; i++) {
        arreglo[i] = parseFloat(arreglo[i]);
    }
    
        
}






//2- FUNCION QUE OBTIENE LOS DATOS INGRESADOS POR EL USUARIO ========================================
// Función que obtiene los datos de los inputs x y nx, y los mete en respectivos arreglos:
//dice nx porque era una función solo para nx, pero le agregué lo de x de paso.
function tomar_datos_ingresados_nx(){
    
    let datos_ingresados = document.getElementsByClassName("input2");
    
    for (var i = 0; i < datos_ingresados.length; i++) {
        
        nx.push(datos_ingresados[i].value);

    } 

    a_decimales(nx)

    


    //Obtiene los datos de los inputs de la columna x:
    let datos_x = document.getElementsByClassName("input1");
    
    for (var i = 0; i < datos_x.length; i++) {
        
        x.push(datos_x[i].value);

    } 

           
}





// 3- FUNCIONES PARA HACER LOS CÁLCULOS ================================================================

// 3.1- Calcular los valores de la columna lx: proporción de organismos supervivientes al empezar el intervalo de edad X
function calcular_lx(){
    
    for (var i = 0; i < nx.length-1; i++) {
        
        lx.push(nx[i]/nx[0]);  
    }

    a_decimales(lx);
    
}


// 3.2- Calcular los valores de la columna dx: número de muertes durante el intervalo de edad X a X+1
function calcular_dx(){
    
    for (var i = 0; i < nx.length; i++) {
        
        dx.push(nx[i] - nx[i + 1]);

    }
    
    dx.pop();

    a_decimales(dx);
}




// 3.3- Calcular los valores de la columna qx: Tasa de mortalidad:
function calcular_qx(){
    
    for (var i = 0; i < nx.length; i++) {
        
        qx.push(dx[i] / nx[i]);  
    }

    
    qx.pop();
    a_decimales(qx);

}


// 3.4- Calcular los valores de la columna Lx: núm promedio de sobrevivientes durante el intervalo de edad X a X+1
function calcular_Lx(){
    for (var i = 0; i < nx.length; i++) {
        
        Lx.push((nx[i] + nx[i + 1]) / 2);

    }

    
    Lx.pop();
    a_decimales(Lx);


}


// 3.5- Calcular los valores de la columna Tx:  Números de días que les queda a los sobrevivientes que alcanzaron edad X:
function calcular_Tx(){
    var valor_actual = Lx[Lx.length - 1]; //asignamos el anteúltimo valor (el último es NaN) a valor_actual.
    
    Tx.push(valor_actual); //metemos el valor_actual en el arreglo Tx.
        

    //esto itera por Lx desde el final, saltando los dos últimos lugares: uno el NaN y el otro el valor_actual.         
    for (var i = Lx.length - 1; i >= 1; i--) { 
        suma = Lx[i-1] + valor_actual;
        Tx.push(suma);

        valor_actual = suma;
    }

    a_decimales(Tx);

    
    
}





// 3.6- Calcular los valores de la columna ex: esperanza media de vida para los organismo al comienzo de la edad X
function calcular_ex(){
    //El arreglo Tx está invertido para facilitar la lectura, pero hay que invertirlo para los cálculos:
    var tx_invertido = Tx.reverse();
    
    for (var i = 0; i < Tx.length; i++) {
        
        ex.push(tx_invertido[i] / nx[i]);  
    }


    a_decimales(ex);

}






// 3.7- Hacemos los cálculos. Esta función está enlazada al bótón "Calcular" de la app:
function calcular(){
    // Creamos arreglos para guardar los valores calculados:
    x = [];
    nx = [];
    lx = [];
    dx = [];
    qx = [];
    Lx = [];
    Tx = [];
    ex = [];


    // Tomamos los datos ingresados en los inputs:
    tomar_datos_ingresados_nx()

    //Hacemos los cálculos:
    calcular_lx()
    calcular_dx()
    calcular_qx()
    calcular_Lx()
    calcular_Tx()
    calcular_ex()

    hacer_grafica();

    //Esto es para ver si los cálculos están bien. Borrarlos cuando esté terminada.
    console.log("arreglo nx: " + nx)
    console.log("arreglo lx: " + lx)
    console.log("arreglo dx: " + dx)
    console.log("arreglo qx: " + qx)
    console.log("arreglo Lx: " + Lx)
    console.log("arreglo Tx: " + Tx)
    console.log("arreglo ex: " + ex)


    // Cargamos los resultados en las celdas de la tabla:
    cargar_resultados()



}





// 4- Función que carga los datos de los arreglos a la tabla / Uploading the results to the table:
function cargar_resultados(){
    
    // Cargamos los resultados de la columna lx:
    celdas_lx = document.getElementsByClassName("lx");
    
        for (let i=0; i<celdas_lx.length-1; i++) {
            celdas_lx[i].innerHTML = lx[i].toFixed(3);
    }


    // Cargamos los resultados de la columna dx:
    celdas_dx = document.getElementsByClassName("dx");
    
        for ( i=0; i<celdas_dx.length-1; i++) {
            celdas_dx[i].innerHTML = dx[i].toFixed(1);
    }


    // Cargamos los resultados de la columna qx:
    celdas_qx = document.getElementsByClassName("qx");
    
        for ( i=0; i<celdas_qx.length-1; i++) {
            celdas_qx[i].innerHTML = qx[i].toFixed(3);
    }


    // Cargamos los resultados de la columna Lx:
    celdas_Lx = document.getElementsByClassName("Lx");
    
        for ( i=0; i<celdas_Lx.length-1; i++) {
            celdas_Lx[i].innerHTML = Lx[i].toFixed(1);
    }



    // Cargamos los resultados de la columna Tx:
    celdas_Tx = document.getElementsByClassName("Tx");
    
        for ( i=0; i<celdas_Tx.length-1; i++) {
            celdas_Tx[i].innerHTML = Tx[i].toFixed(1);
    }


    // Cargamos los resultados de la columna ex:
    celdas_ex = document.getElementsByClassName("ex");

        for ( i=0; i<celdas_ex.length-1; i++) {
            celdas_ex[i].innerHTML = ex[i].toFixed(3);
    }


}




// 5- FUNCIÓN TEST (linkeada al botón "test")/ TEST FUNCTION (linked to "test" button): ======================================================================

function test(){


    x = [];
    nx = [];
    lx = [];
    dx = [];
    qx = [];
    Lx = [];
    Tx = [];
    ex = [];



    //Dos arreglos de valores para probar:
    x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    nx = [996, 668, 295, 190, 176, 172, 167, 159, 154, 147, 105, 22, 0];

    //Agregamos 12 filas a la tabla:
    for (var i = 0; i < 12; i++) {
        agregar_fila();
        
    }

    
    //Hacemos los cálculos:
    calcular_lx()
    calcular_dx()
    calcular_qx()
    calcular_Lx()
    calcular_Tx()
    calcular_ex()

    hacer_grafica();
    

    // Cargamos los resultados en las celdas NO INPUT de la tabla:
    cargar_resultados()

    // Cargamos los resultados de las columnas input x y nx:
    valores_celdas_x = document.getElementsByClassName("input1");
    valores_celdas_nx = document.getElementsByClassName("input2");

    for (var i = 0; i < valores_celdas_x.length; i++) {
          valores_celdas_x[i].value = x[i];
          valores_celdas_nx[i].value = nx[i];

    }
    

    //Inhabilita el botón "test", terminando con la prueba. Al limpiar la tabla se vuelve a habilitar.
    document.getElementById("boton_test").disabled = true; 

}


// 6- GRAFICA / GRAPHIC ==========================================================================================
function hacer_grafica() {
    
    var xValues = x;
    var yValues = nx;

    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: 6, max:nx[-1]}}], //máximo valor de "y" como el último elemento de nx.
        }
      }
    });

}