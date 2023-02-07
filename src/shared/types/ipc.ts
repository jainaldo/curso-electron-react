export interface Document {
  id: string
  title: string
  content?: string
}

/***
 * Request
 */
export type SaveDocumentRequest = Document

export interface FetchDocumentRequest {
  id: string
}

export interface DeleteDocumentRequest {
  id: string
}

/***
 * Response
 */
export interface FetchAllDocumentsResponse {
  data: Document[]
}

export interface FetchDocumentsResponse {
  data: Document
}

export interface CreateDocumentsResponse {
  data: Document
}
