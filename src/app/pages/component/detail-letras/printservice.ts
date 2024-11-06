// print.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  print(contentId: string) {
    // Guardar el contenido actual del body
    const originalContent = document.body.innerHTML;
    
    // Obtener el contenido a imprimir
    const printContent = document.getElementById(contentId);
    if (!printContent) {
      console.error('Elemento no encontrado');
      return;
    }

    // Crear una hoja de estilos para la impresión
    const printStyles = `
      <style>
        @media print {
          body {
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          .no-print {
            display: none !important;
          }
          .mat-expansion-panel {
            border: none !important;
            box-shadow: none !important;
          }
          .mat-expansion-panel-header {
            background: none !important;
          }
          button, .bt-registrar, .dialog-actions {
            display: none !important;
          }
          .letra-details {
            margin: 15px 0;
          }
          .letra-detail-item {
            margin: 8px 0;
          }
          .detail-label {
            font-weight: bold;
          }
          @page {
            margin: 0.5cm;
          }
        }
      </style>
    `;

    // Preparar el contenido para imprimir
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Detalle de Letra</title>
            ${printStyles}
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();

      // Esperar a que los estilos y contenido se carguen
      printWindow.onload = () => {
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      };
    }
  }
}