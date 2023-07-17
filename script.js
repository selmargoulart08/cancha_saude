// Função para exibir os salgados
function exibirSalgados() {
    // Lógica para exibir os salgados disponíveis
    alert("Confira nosso menu de salgados!");
  }
  
  // Lógica JavaScript para manipulação de eventos, formulários, etc.
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('reservation-form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Lógica para tratar o envio do formulário de reserva
      var date = document.getElementById('date').value;
      var time = document.getElementById('time').value;
  
      // Exemplo de ação após o envio do formulário
      alert('Sua reserva foi feita com sucesso!');
      form.reset();
    });
  });
  