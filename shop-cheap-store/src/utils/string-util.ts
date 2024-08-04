export class StringUtils {

  public static isNullOrEmpty(val: string | null) : boolean {
      if (val === undefined || val === null || val.trim() === '' || val === 'undefined') {
          return true;
      }
      return false;
  };

  public static onlyNumbers(numero: string) : string {
      return numero.replace(/[^0-9]/g,'');
  }
}

