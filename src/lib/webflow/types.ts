/**
 * Tipos base da Webflow Data API v2
 */

export interface WebflowError {
  code: number;
  msg: string;
  err?: string;
}

export interface WebflowPagination {
  limit: number;
  offset: number;
  total: number;
}

export interface WebflowCollection {
  id: string;
  displayName: string;
  singularName: string;
  slug: string;
  fields: WebflowField[];
}

export interface WebflowField {
  id: string;
  displayName: string;
  slug: string;
  type: WebflowFieldType;
  isRequired: boolean;
  isEditable: boolean;
  helpText?: string;
}

export type WebflowFieldType =
  | 'PlainText'
  | 'RichText'
  | 'Image'
  | 'Video'
  | 'Link'
  | 'Email'
  | 'Phone'
  | 'Number'
  | 'DateTime'
  | 'Switch'
  | 'Color'
  | 'File'
  | 'MultiImage'
  | 'Option'
  | 'Reference'
  | 'MultiReference';

export interface WebflowItem {
  id: string;
  cmsLocaleId: string;
  lastPublished?: string;
  lastUpdated: string;
  createdOn: string;
  isArchived: boolean;
  isDraft: boolean;
  fieldData: Record<string, unknown>;
}

export interface WebflowItemLive extends WebflowItem {
  live: boolean;
}

export interface WebflowCollectionItemsResponse {
  items: WebflowItem[];
  pagination: WebflowPagination;
}

export interface WebflowCollectionsResponse {
  collections: WebflowCollection[];
}

/**
 * Tipos auxiliares para campos específicos
 */
export interface WebflowImageField {
  url: string;
  alt?: string;
  fileId?: string;
}

export interface WebflowLinkField {
  url: string;
  target?: '_self' | '_blank';
}

export interface WebflowReferenceField {
  id: string;
  displayName?: string;
}

export interface WebflowOptionField {
  id: string;
  name: string;
}

