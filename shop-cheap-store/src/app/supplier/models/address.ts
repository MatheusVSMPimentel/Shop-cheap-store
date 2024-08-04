export class Address {
  constructor(adressdto?: AddressDto, viaCepDto ?: AddressViaCepDto) {
    if (adressdto) {
        this.id = adressdto.id,
        this.street = adressdto.logradouro,
        this.additionalAddress = adressdto.complemento,
        this.houseNumber = adressdto.numero,
        this.neighborhood = adressdto.bairro,
        this.zipCode = adressdto.cep,
        this.city = adressdto.cidade,
        this.state = adressdto.estado,
        this.supplierId = adressdto.fornecedorId
    }
    if(viaCepDto){
      this.street = viaCepDto.logradouro,
      this.additionalAddress = viaCepDto.complemento,
      this.neighborhood = viaCepDto.bairro,
      this.city = viaCepDto.localidade,
      this.state = viaCepDto.uf
    }
  }
  id !: string;
  street !: string;
  houseNumber !: string;
  additionalAddress !: string;
  neighborhood !: string;
  zipCode !: string;
  city !: string;
  state !: string;
  supplierId !: string;
}

export class AddressDto {

  constructor(adressdto?: Address) {
    if (adressdto) {

      this.id = adressdto.id,
        this.logradouro = adressdto.street,
        this.complemento = adressdto.additionalAddress,
        this.numero = adressdto.houseNumber,
        this.bairro = adressdto.neighborhood,
        this.cep = adressdto.zipCode,
        this.cidade = adressdto.city,
        this.estado = adressdto.state,
        this.fornecedorId = adressdto.supplierId
    }
  }

  id!: string;
  logradouro!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  cep!: string;
  cidade!: string;
  estado!: string;
  fornecedorId!: string;
}

export class AddressViaCepDto {
  logradouro!: string;
  complemento!: string;
  bairro!: string;
  cep!: string;
  localidade!: string;
  uf!: string;
}