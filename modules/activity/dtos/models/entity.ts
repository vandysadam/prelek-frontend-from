export interface ActivityDetail {
  id: string;
  activity_id: string;
  transaction_id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Media {
  id: string;
  name: string;
  size: number;
  mime_type: string;
  url: string;
  media_type: string;
  activity_id: string;
}

export interface ActivityEntity {
  id: string;
  title: string;
  description: string;
  start_date: string;
  transaction_id: string;
  activity_details: ActivityDetail[];
  photos: Media[];
}

export interface CreateActivityDto {
  title: string;
  description: string;
  start_date: Date;
  activity_photos: File[];
  invoice_photos: File[];
  activity_detail: ActivityDetailDto[];
}

export interface ActivityDetailDto {
  name: string;
  description: string;
  price: string;
  qty: string;
}
