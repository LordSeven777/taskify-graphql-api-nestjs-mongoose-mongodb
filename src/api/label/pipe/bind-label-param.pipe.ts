import { Injectable, PipeTransform } from '@nestjs/common';

import { LabelService } from '../label.service';

// Custom pipe that transforms a label id param from the request into the matching label document
@Injectable()
export class BindLabelParamPipe implements PipeTransform {
  constructor(private labelService: LabelService) {}

  async transform(id: string) {
    return await this.labelService.getOne(id);
  }
}
