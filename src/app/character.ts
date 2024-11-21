export interface Character {
  id?: string; 
  name?: string; 
  image?: string; 
  species?: string; 
  status?: string;
  type?: string;
  gender?: string;
  origin?: {
    name?: string;
  };
  location?: {
    name?: string;
  };
}