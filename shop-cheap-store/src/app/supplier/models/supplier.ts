import { Product, ProductDto } from "../../product/models/product";
import { Address, AddressDto } from "./address";

export class Supplier {
  constructor(e?: SupplierDto) {
    if (e) {
      this.id = e.id,
        this.name = e.nome,
        this.active = e.ativo,
        this.document = e.documento,
        this.address = new Address(e.endereco),
        this.supplierType = e.tipoFornecedor
        this.products = e.produtos.map(product => new Product(product));
    }
  }
  
  id !: string;
  name !: string;
  document !: string;
  active !: boolean;
  supplierType !: number;
  address !: Address;
  products !: Product[]
}

export class SupplierDto {
  constructor(e?: Supplier) {
    if (e) {
      this.id = e.id,
        this.nome = e.name,
        this.ativo = e.active,
        this.documento = e.document,
        this.endereco = new AddressDto(e.address),
        this.tipoFornecedor = e.supplierType
        this.produtos = e.products.map(product => new ProductDto(product));
    }
  }

  id!: string;
  nome!: string;
  documento!: string;
  ativo!: boolean;
  tipoFornecedor!: number;
  endereco!: AddressDto;
  produtos !: ProductDto[]
}