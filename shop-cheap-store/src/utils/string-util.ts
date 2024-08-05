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

  public static convertToNumber(value: string): number {
    // Remove o símbolo de moeda e substitui a vírgula por um ponto
    let number = value.replace('R$', '').replace('.', '').replace(',', '.');
    // Converte a string em um número
    return parseFloat(number);
  }
}

