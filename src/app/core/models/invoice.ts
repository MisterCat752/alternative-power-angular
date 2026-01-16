export interface VendorListDto {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface VendorDetailsDto extends VendorListDto {
  vat_id: string;
}

export interface PurchaseInvoiceListDto {
  id: number;
  vendor: VendorListDto;
  doc_number: string;
  doc_date: string;
  source: string;
  currency: 'MDL' | 'USD' | 'EUR' | 'RON';
  channel: 'resale' | 'project' | 'internal';
  doc_sum: string;
  status: 'draft' | 'received' | 'locked';
}

export interface InvoiceLineDto {
  id: number;
  line_no: number;
  qty: string;
  unit_cost: string;
  line_sum: string;
  product_code: string;
  product_name: string;
}

export interface PurchaseInvoiceDetailsDto extends PurchaseInvoiceListDto {
  vendor: VendorDetailsDto;
  external_id: string;
  changed_after_receipt: boolean;
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
  lines: InvoiceLineDto[];
}
