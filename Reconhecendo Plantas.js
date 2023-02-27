// precisa ser criado um botão para capturar a imagem

const captureBtn = document.createElement('button');
captureBtn.textContent = 'Capturar Imagem';

// precisa ser adicionado o botão ao corpo do documento
document.body.appendChild(captureBtn);

// precisa ser adicionado um evento de clique para capturar a imagem
captureBtn.addEventListener('click', async () => {
  // cria uma instância da API Plant.id
  const plantIdAPI = new PlantIdAPI({
    apiKey: 'SUA_CHAVE_API_AQUI'
  });

  // captura a imagem usando a câmera do dispositivo
  const image = await captureImage();

  // envia a imagem para a API Plant.id para obter as informações da planta
  const plantInfo = await plantIdAPI.identify(image);

  // exibe as informações da planta no console
  console.log(plantInfo);
});

// função para capturar a imagem usando a câmera do dispositivo
async function captureImage() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.createElement('video');
  video.srcObject = stream;
  await video.play();
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const image = canvas.toDataURL('image/jpeg');
  video.pause();
  stream.getTracks().forEach(track => track.stop());
  return image;
}
