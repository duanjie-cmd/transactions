import { createIBCMsgNftTransfer as protoIBCMsgNftTransfer } from '@evmos/proto'

import {
  generateTypes,
  createIBCMsgNftTransfer,
  CREATE_IBC_MSG_NFT_TRANSFER_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface IBCMsgNftTransferParams {
  // Connection
  sourcePort: string
  sourceChannel: string
  classId: string
  tokenIds: string[]
  // Addresses
  receiver: string
  // Timeout
  revisionNumber: number
  revisionHeight: number
  timeoutTimestamp: string
  // Optional Memo
  memo?: string
}

const createEIP712IBCMsgNftTransfer = (
  context: TxContext,
  params: IBCMsgNftTransferParams,
) => {
  const msgTransferTypes = CREATE_IBC_MSG_NFT_TRANSFER_TYPES(params.memo)
  const types = generateTypes(msgTransferTypes)

  const message = createIBCMsgNftTransfer(
    params.receiver,
    context.sender.accountAddress,
    params.sourceChannel,
    params.sourcePort,
    params.revisionHeight,
    params.revisionNumber,
    params.timeoutTimestamp,
    params.classId,
    params.tokenIds,
    params.memo,
  )

  return {
    types,
    message,
  }
}

const createCosmosIBCMsgNftTransfer = (
  context: TxContext,
  params: IBCMsgNftTransferParams,
) => {
  return protoIBCMsgNftTransfer(
    params.sourcePort,
    params.sourceChannel,
    params.classId,
    params.tokenIds,
    context.sender.accountAddress,
    params.receiver,
    params.revisionNumber,
    params.revisionHeight,
    params.timeoutTimestamp,
    params.memo,
  )
}

/**
 * Creates a transaction for a `IBCMsgTransfer` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK
 * {@link https://github.com/cosmos/ibc-go/blob/main/docs/apps/transfer/messages.md | IBCMsgTransfer}
 *
 * @param context - Transaction Context
 * @param params - IBCMsgTransfer Params
 * @returns Transaction with the IBCMsgTransfer payload
 *
 */
export const createTxIBCMsgNftTransfer = (
  context: TxContext,
  params: IBCMsgNftTransferParams,
) => {
  const typedData = createEIP712IBCMsgNftTransfer(context, params)
  const cosmosMsg = createCosmosIBCMsgNftTransfer(context, params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
