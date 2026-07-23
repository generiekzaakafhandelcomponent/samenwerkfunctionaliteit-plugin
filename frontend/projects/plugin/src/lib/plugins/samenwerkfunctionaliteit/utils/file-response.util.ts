import { HttpResponse } from '@angular/common/http';
import { FileDownload } from '../interface/file-download.interface';

export class FileResponseUtil {
  static toFileDownload(
    response: HttpResponse<Blob>,
    defaultFilename = `downloaded-file`,
  ): FileDownload {
    const blob = response.body;

    if (!blob) {
      throw new Error('Response did not contain a file.');
    }

    return {
      blob,
      filename: this.extractFilename(response) ?? defaultFilename,
    };
  }

  private static extractFilename(
    response: HttpResponse<Blob>,
  ): string | undefined {
    const contentDisposition = response.headers.get('Content-Disposition');

    if (!contentDisposition) {
      return undefined;
    }

    return contentDisposition.match(/filename="?([^"]+)"?/)?.[1];
  }
}
