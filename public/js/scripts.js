
function confirmAction(message) {
    return confirm(message || "Are you sure?");
}


function previewQRCode(qrCodeData) {
    const qrCodeModal = document.getElementById("qrCodeModal");
    const qrCodeImage = document.getElementById("qrCodeImage");

    qrCodeImage.src = qrCodeData;
    qrCodeModal.style.display = "block";
}


function closeQRCodeModal() {
    const qrCodeModal = document.getElementById("qrCodeModal");
    qrCodeModal.style.display = "none";
}


function printGuestDetails() {
    window.print();
}
