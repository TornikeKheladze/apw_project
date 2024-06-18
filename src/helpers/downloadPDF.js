export const downloadPDF = (id, setDownloadLoading) => {
  const token = localStorage.getItem("token");
  setDownloadLoading(true);
  fetch(
    `https://test-dga-authorisation.apw.ge/api/document/doc-file/html-tu-pdf-download/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${token}`, // Add authorizati
      },
    }
  )
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "your_file_name.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setDownloadLoading(false);
    })
    .catch((error) => {
      console.error("Error downloading PDF:", error);
      setDownloadLoading(false);
    });
};
