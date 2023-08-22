document.addEventListener("DOMContentLoaded", function() {
  const gerarCompositeButton = document.getElementById("gerar_composite");

  gerarCompositeButton.addEventListener("click", function() {
    const fotoPrincipalInput = document.getElementById("foto_principal");
    const nomeInput = document.getElementById("nome");
    const idadeInput = document.getElementById("idade");
    const alturaInput = document.getElementById("altura");
    const pesoInput = document.getElementById("peso");
    const compositeImage = document.getElementById("composite_image");
    const downloadLink = document.getElementById("download_link");
    
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    const fotoPrincipal = new Image();
    fotoPrincipal.src = URL.createObjectURL(fotoPrincipalInput.files[0]);
    
    const fotosSecundarias = [
      document.getElementById("foto_secundaria_1").files[0],
      document.getElementById("foto_secundaria_2").files[0],
      document.getElementById("foto_secundaria_3").files[0],
      document.getElementById("foto_secundaria_4").files[0]
    ];
    
    fotoPrincipal.onload = function() {
      canvas.width = fotoPrincipal.width + 200;
      canvas.height = Math.max(fotoPrincipal.height, 500);
      
      context.drawImage(fotoPrincipal, 0, 0);
      context.font = "20px Arial";
      context.fillStyle = "white";
      context.fillText(`Nome: ${nomeInput.value}`, fotoPrincipal.width + 10, 30);
      context.fillText(`Idade: ${idadeInput.value}`, fotoPrincipal.width + 10, 60);
      context.fillText(`Altura: ${alturaInput.value} cm`, fotoPrincipal.width + 10, 90);
      context.fillText(`Peso: ${pesoInput.value} kg`, fotoPrincipal.width + 10, 120);
      
      let offsetY = 150;
      for (let i = 0; i < fotosSecundarias.length; i++) {
          if (fotosSecundarias[i]) {
            const fotoSecundaria = new Image();
            fotoSecundaria.src = URL.createObjectURL(fotosSecundarias[i]);
            fotoSecundaria.onload = function() {
              context.drawImage(fotoSecundaria, fotoPrincipal.width + 10, offsetY, 150, 150);
              offsetY += 160;
              if (i === fotosSecundarias.length - 1) {
                compositeImage.src = canvas.toDataURL("image/jpeg");
                downloadLink.href = canvas.toDataURL("image/jpeg");
                downloadLink.style.display = "block";
              }
            };
          }
        }
      };
    });
});