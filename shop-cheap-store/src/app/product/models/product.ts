export class Product {
  constructor(dto: ProductDto){
    this.id = dto.id;
    this.name = dto.nome;
    this.description = dto.descricao;
    this.image = dto.imagem;
    this.imageUpload = dto.imagemUpload;
    this.value = dto.valor;
    this.registrationDate = dto.dataCadastro;
    this.active = dto.ativo;
    this.supplierId = dto.fornecedorId;
    this.supplierName = dto.nomeFornecedor;
  }
  id!: string;
  name !: string;
  description !: string;
  image !: string;
  imageUpload !: string;
  value !: number;
  registrationDate !: string;
  active !: boolean;
  supplierId !: string;
  supplierName !: string

}


export class ProductDto {
  constructor(dto: Product){
    this.id = dto.id;
    this.nome = dto.name;
    this.descricao = dto.description;
    this.imagem = dto.image;
    this.imagemUpload = dto.imageUpload;
    this.valor = dto.value;
    this.dataCadastro = dto.registrationDate;
    this.ativo = dto.active;
    this.fornecedorId = dto.supplierId;
    this.nomeFornecedor = dto.supplierName;
  }
  id!: string;
  nome!: string;
  descricao!: string;
  imagem!: string;
  imagemUpload!: string;
  valor!: number;
  dataCadastro!: string;
  ativo!: boolean;
  fornecedorId!: string;
  nomeFornecedor!: string
}

export class Supplier{
  constructor(dto: SupplierDto){
    this.name = dto.nome,
    this.id = dto.id
  }
  id!: string;
  name!: string;
}

export class SupplierDto{
  id !: string;
  nome !: string;
}