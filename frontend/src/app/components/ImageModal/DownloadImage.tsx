import {saveAs} from 'file-saver';


export const DownloadImage = (url: string, name: string) => {
  saveAs(url, name)
}
