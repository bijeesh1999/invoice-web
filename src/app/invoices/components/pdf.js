import jsPDF from 'jspdf';

export const handlePdf = (invoice) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  const today = new Date();

  const formattedDate = today.toLocaleDateString();



  // Set initial position and font
  let y = 10;
  doc.setFontSize(22);
  doc.text('Invoice', 10, y);
  y += 10;

  // Add invoice details
  doc.setFontSize(12);
  doc.text(`Customer: ${invoice.customerName}`, 10, y += 10);
  doc.text(`Date: ${formattedDate}`, 10, y += 10);
  y += 10;

  // Add a line for separation
  doc.line(10, y, 200, y);
  y += 10;

  // Add product details
  doc.setFontSize(14);
  doc.text('Product Details', 10, y);
  y += 10;
  doc.setFontSize(12);
  doc.text(`Product: ${invoice.productName}`, 10, y += 10);
  doc.text(`Quantity: ${invoice.quantity}`, 10, y += 10);
  doc.text(`Total Price: $${invoice.totalPrice}`, 10, y += 10);
  doc.text(`Discounted Price: $${invoice.discountedPrice}`, 10, y += 10);
  
  // Save the PDF file
  doc.save(`invoice-${invoice.id}.pdf`);
};