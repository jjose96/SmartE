setTimeout(function(){
  $(document).ready(function(){
  new Chart(document.getElementById("chart1"),{"type":"line","data":{"labels":["January","February","March","April","May","June","July"],"datasets":[{"label":"Usage Analysis","data":[1065,1059,1080,1081,1056,1055,1040],"fill":false,"borderColor":"rgb(99, 203, 137)","lineTension":0.1}]},"options":{}});
  });
},3000);
