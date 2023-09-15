import { Injectable } from '@angular/core';
import { getBlob, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { defer, from, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {}

  generateUniquePath(prefix: string, extension: string): string {
    return prefix + crypto.randomUUID() + (extension.startsWith('.') ? '' : '.') + extension;
  }

  downloadUrl(path: string): Observable<string> {
    return defer(() => from(getDownloadURL(ref(this.storage, path))));
  }

  upload(path: string, file: Blob): Observable<void> {
    const storageRef = ref(this.storage, path);
    return defer(() => from(uploadBytes(storageRef, file))).pipe(map(() => undefined));
  }

  download(path: string, fileName: string): Observable<void> {
    const storageRef = ref(this.storage, path);
    return defer(() => from(getBlob(storageRef))).pipe(
      tap(blob => {
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(downloadUrl);
      }),
      map(() => undefined)
    );
  }
}
