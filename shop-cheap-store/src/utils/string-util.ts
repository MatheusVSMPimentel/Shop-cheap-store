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

  public static DecimalToString(input:number): any {
    var ret = (input) ? input.toString().replace(".", ",") : null;
    if (ret) {
        var decArr = ret.split(",");
        if (decArr.length > 1) {
            var dec = decArr[1].length;
            if (dec === 1) { ret += "0"; }
        }
    }
    return ret;
}
}

