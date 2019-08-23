import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/models/author';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(author: Author): string {
    if (GLOBAL_CONFIGS.GENERAL_CONFIGS.SHOW_FIRST_NAME_FIRST)
      return `${author.first_name} ${author.last_name}`;
    return `${author.last_name} ${author.first_name}`;
  }
}
