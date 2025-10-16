export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  no_induk: string;
  name: string;
  email: string;
  role: string;
  photo_url: string;
  phone: string;
  alamat: string;
  jabatan: string;
  tahun_ajaran_mulai: string;
  user_links: any | null;
  news: any | null;
  Post: any | null;
  Replies: any | null;
}
