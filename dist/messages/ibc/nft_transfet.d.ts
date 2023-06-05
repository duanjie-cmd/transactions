import { TxContext } from '../base.js';
export interface IBCMsgNftTransferParams {
    sourcePort: string;
    sourceChannel: string;
    classId: string;
    tokenIds: string[];
    receiver: string;
    revisionNumber: number;
    revisionHeight: number;
    timeoutTimestamp: string;
    memo?: string;
}
export declare const createTxIBCMsgNftTransfer: (context: TxContext, params: IBCMsgNftTransferParams) => import("../common.js").TxPayload;
//# sourceMappingURL=nft_transfet.d.ts.map