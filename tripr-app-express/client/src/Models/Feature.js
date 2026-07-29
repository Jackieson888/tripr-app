export class Feature {
  constructor(featureData) {
    this.id = featureData.id
    this.type = 'Feature'
    this.text = featureData.text
    this.geometry = featureData.geometry
  }
}
