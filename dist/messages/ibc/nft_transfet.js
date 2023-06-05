import { createIBCMsgNftTransfer as protoIBCMsgNftTransfer } from '@evmos/proto';
import { generateTypes, createIBCMsgNftTransfer, CREATE_IBC_MSG_NFT_TRANSFER_TYPES, } from '@evmos/eip712';
import { createTransactionPayload } from '../base.js';
const createEIP712IBCMsgNftTransfer = (context, params) => {
    const msgTransferTypes = CREATE_IBC_MSG_NFT_TRANSFER_TYPES(params.memo);
    const types = generateTypes(msgTransferTypes);
    const message = createIBCMsgNftTransfer(params.receiver, context.sender.accountAddress, params.sourceChannel, params.sourcePort, params.revisionHeight, params.revisionNumber, params.timeoutTimestamp, params.classId, params.tokenIds, params.memo);
    return {
        types,
        message,
    };
};
const createCosmosIBCMsgNftTransfer = (context, params) => {
    return protoIBCMsgNftTransfer(params.sourcePort, params.sourceChannel, params.classId, params.tokenIds, context.sender.accountAddress, params.receiver, params.revisionNumber, params.revisionHeight, params.timeoutTimestamp, params.memo);
};
export const createTxIBCMsgNftTransfer = (context, params) => {
    const typedData = createEIP712IBCMsgNftTransfer(context, params);
    const cosmosMsg = createCosmosIBCMsgNftTransfer(context, params);
    return createTransactionPayload(context, typedData, cosmosMsg);
};
//# sourceMappingURL=nft_transfet.js.map