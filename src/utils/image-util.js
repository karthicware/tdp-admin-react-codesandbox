export function convertThumbnail(inputFile, successCallback, errorCallback) {
  const fileName = "tn_" + inputFile.name;
  const reader = new FileReader();
  reader.readAsDataURL(inputFile);
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const elem = document.createElement("canvas");
      const width = 200;
      const scaleFactor = width / img.width;
      elem.width = width;
      elem.height = img.height * scaleFactor;
      const ctx = elem.getContext("2d");
      // img.width and img.height will contain the original dimensions
      ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
      ctx.canvas.toBlob(
        blob => {
          const file = new File([blob], fileName, {
            type: "image/png",
            lastModified: Date.now()
          });
          successCallback(file);
        },
        "image/jpeg",
        1
      );
    };
    reader.onerror = error => {
      console.log(error);
      errorCallback(error);
    };
  };
}
