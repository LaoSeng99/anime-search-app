export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: Broadcast;
  producers: ResourceReference[];
  licensors: ResourceReference[];
  studios: ResourceReference[];
  genres: ResourceReference[];
  explicit_genres: ResourceReference[];
  themes: ResourceReference[];
  demographics: ResourceReference[];
}

// --- 子类型 (Sub-types) ---

export interface Images {
  jpg: ImageUrls;
  webp: ImageUrls;
}

export interface ImageUrls {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Trailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
}

export interface Title {
  type: string;
  title: string;
}

export interface Aired {
  from: string | null;
  to: string | null;
  prop: {
    from: DateDetails;
    to: DateDetails;
  };
  string: string;
}

export interface DateDetails {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface Broadcast {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
}

export interface ResourceReference {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
