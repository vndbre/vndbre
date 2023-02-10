export interface VnScreenshot extends Image {
  readonly thumbnail: string;
  readonly thumbnailDimensions: [number, number];
}
