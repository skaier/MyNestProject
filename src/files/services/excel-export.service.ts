import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelExportService {
  async exportToExcel(data: any[], headers: string[], filename: string): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add headers
    worksheet.addRow(headers);

    // Add data
    data.forEach(item => {
      const row = headers.map(header => item[header] || '');
      worksheet.addRow(row);
    });

    // Generate Excel file as buffer
    return workbook.xlsx.writeBuffer() as Promise<Buffer>;
  }
}