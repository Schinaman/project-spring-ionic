import { ItemPedidoDTO } from "./item-pedido.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { RefDTO } from "./ref.dto";

export interface PedidoDTO{

    client:RefDTO;
    addressDelivery: RefDTO;
    payment: PagamentoDTO;
    items: ItemPedidoDTO[];
}