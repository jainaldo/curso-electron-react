import { electronAPI, ElectronAPI } from '@electron-toolkit/preload'
import { IPC } from '@shared/constants/ipc'
import {
  CreateDocumentsResponse,
  DeleteDocumentRequest,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentsResponse,
  // eslint-disable-next-line prettier/prettier
  SaveDocumentRequest
} from '@shared/types/ipc'
import { contextBridge, ipcRenderer } from 'electron'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL)
  },

  fetchDocument(req: FetchDocumentRequest): Promise<FetchDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req)
  },

  createDocument(): Promise<CreateDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },

  saveDocument(req: SaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req)
  },

  deleteDocument(req: DeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req)
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
