export function downloadWithAnchor(uri: string, fileName: string) {
   const encodedUri = encodeURI(uri);
   const link = document.createElement("a");
   link.setAttribute("href", encodedUri);
   link.setAttribute("download", fileName);
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}
