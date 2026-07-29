import { Injectable } from '@angular/core';
import { FileDownload } from '../interface/file-download.interface';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  download(file: FileDownload): void {
    const url = URL.createObjectURL(file.blob);

    try {
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = file.name;
      anchor.click();
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}
