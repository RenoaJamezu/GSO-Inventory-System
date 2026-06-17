export async function downloadQrAsPng(id: string, location: string) {
  const svg = document.querySelector(`#qr-${id} svg`);
  if (!svg) return;

  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();

  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(svgBlob);

  return new Promise<void>((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const png = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = png;
      a.download = `${location}.png`;
      a.click();

      URL.revokeObjectURL(url);
      resolve();
    };

    img.src = url;
  });
}
