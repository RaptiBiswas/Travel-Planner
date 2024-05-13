
window.onload = function () {
    document.getElementById("print")
        .addEventListener("click", () => {
            const invoice = this.document.getElementById("Itinerary");
            console.log(invoice);
            console.log(window);
            var opt = {
                margin: 0,
                filename: 'Itinerary.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 5, scrollX:600, scrollY: 0, useCORS: true },
                jsPDF: { unit: 'cm', format: 'a3', orientation: 'landscape' }
            };
            html2pdf().from(invoice).set(opt).save();
        })
}
