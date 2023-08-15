
export interface StampPreview {
    id: number;
    title: string;
    image: string;
    image_base64: string;
    stamp_code: string;
    status: number;
    created_by: number;
    updated_by: number;
    deleted: number;
    created_at: string;
    updated_at: string;
    user: User;
  }