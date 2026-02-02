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
  season: Season | null;
  year: number | null;
  broadcast: Broadcast;
  producers: ResourceReference[];
  licensors: ResourceReference[];
  studios: ResourceReference[];
  genres: ResourceReference[];
  explicit_genres: ResourceReference[];
  external: ResourceReference[];
  themes: ResourceReference[];
  demographics: ResourceReference[];
  relations: Relation[];
}

export interface AnimeEpisode {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string | null;
  title_romanji: string | null;
  duration: number | null;
  aired: string | null;
  filler: boolean;
  recap: boolean;
  forum_url: string | null;
  score: number | null;
}
export interface AnimeStaff {
  person: {
    mal_id: number;
    url: string;
    images: Images;
    name: string;
  };
  positions: string[];
}

export interface AnimeCharacter {
  character: CharacterBase;
  role: 'Main' | 'Supporting';
  voice_actors: VoiceActor[];
}

export interface CharacterBase {
  mal_id: number;
  url: string;
  name: string;
  images: CharacterImages;
}

export interface CharacterImages {
  jpg: {
    image_url: string;
    small_image_url?: string;
  };
  webp: {
    image_url: string;
    small_image_url?: string;
  };
}

export interface VoiceActor {
  person: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  language: string;
}

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

export interface RelationEntry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Relation {
  relation: string;
  entry: RelationEntry[];
}

export type Season = 'winter' | 'spring' | 'summer' | 'fall';

export interface VideoEpisode {
  mal_id: number;
  url: string;
  title: string;
  episode: string;
  images: Images;
}
