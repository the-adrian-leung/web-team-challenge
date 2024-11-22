/**
 * Character interface
 * 
 * This interface defines the structure of a character object.
 * It includes various properties that describe a character.
 */
export interface Character {
  /**
   * The unique identifier of the character.
   */
  id?: string;

  /**
   * The name of the character.
   */
  name?: string;

  /**
   * The image URL of the character.
   */
  image?: string;

  /**
   * The species of the character.
   */
  species?: string;

  /**
   * The status of the character (e.g., "Alive", "Dead", "Unknown").
   */
  status?: string;

  /**
   * The type of the character.
   */
  type?: string;

  /**
   * The gender of the character.
   */
  gender?: string;

  /**
   * The origin of the character.
   */
  origin?: {
    /**
     * The name of the origin location.
     */
    name?: string;
  };

  /**
   * The current location of the character.
   */
  location?: {
    /**
     * The name of the current location.
     */
    name?: string;
  };
}
