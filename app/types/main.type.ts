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

export interface Author {
  id: number
  name: string
}

export interface Tag {
  ID?: number
  name: string
}

export interface News {
  id?: number
  title: string
  excerpt: string
  content?: string
  status: string
  thumbnail?: File | string
  tags: string[]
  author?: Author
  slug?: string
  created_at?: string
}

export interface Mading {
  id: number
  title: string
  description: string
  category: string
  start_date: string
  end_date: string
  location: string
  organizer: string
  visibility: 'public' | 'private'
  image: string
  created_at: string
  updated_at?: string
}

export interface MadingForm {
  title: string
  description: string
  category: string
  start_date: string
  end_date: string
  location: string
  organizer: string
  visibility: string
  image: File | null 
}

export interface GalleryItem {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  file_path: string
  category: string
  title: string
  event: number
}



