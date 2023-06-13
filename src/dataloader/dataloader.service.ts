import { Injectable } from '@nestjs/common';

import { LabelDataloader } from 'src/api/label/label.loader';

// Class that instanciates then exposes all the API dataloaders
@Injectable()
export class DataloaderService {
  constructor(private labelDataloader: LabelDataloader) {}

  getLoaders() {
    return {
      label: this.labelDataloader.getLoaders(),
    };
  }
}
