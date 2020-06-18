import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '../services/locale-service';

@Pipe({ name: 'onkaTranslate' })
export class OnkaTranslatePipe implements PipeTransform {
  constructor(private localeService: LocaleService) {}
  transform(value: string, default_value?: string) {
    return this.localeService.translate(value, default_value);
  }
}
