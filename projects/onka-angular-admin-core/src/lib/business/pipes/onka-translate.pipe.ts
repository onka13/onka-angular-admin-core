import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '../services/locale-service';

/**
 * translation pipe
 */
@Pipe({ name: 'onkaTranslate' })
export class OnkaTranslatePipe implements PipeTransform {
  
  constructor(private localeService: LocaleService) {}
  /**
   * translate the text
   * @param value the key
   * @param default_value default value
   */
  transform(value: string, default_value?: string) {
    return this.localeService.translate(value, default_value);
  }
}
