/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
/**
 * This type is used to derive the {@link Payload} type as well as the de/serializer.
 * However don't refer to it in your code but use the {@link Payload} type instead.
 *
 * @category userTypes
 * @category enums
 * @category generated
 * @private
 */
export type PayloadRecord = {
  None: void /* scalar variant */;
  All: void /* scalar variant */;
  Any: void /* scalar variant */;
  AdditionalSigner: void /* scalar variant */;
  PubkeyMatch: { destination: web3.PublicKey };
  DerivedKeyMatch: { seeds: Uint8Array[] };
  ProgramOwned: void /* scalar variant */;
  Amount: { amount: beet.bignum };
  Frequency: void /* scalar variant */;
  PubkeyTreeMatch: { proof: number[] /* size: 32 */[]; leaf: number[] /* size: 32 */ };
};

/**
 * Union type respresenting the Payload data enum defined in Rust.
 *
 * NOTE: that it includes a `__kind` property which allows to narrow types in
 * switch/if statements.
 * Additionally `isPayload*` type guards are exposed below to narrow to a specific variant.
 *
 * @category userTypes
 * @category enums
 * @category generated
 */
export type Payload = beet.DataEnumKeyAsKind<PayloadRecord>;

export const isPayloadNone = (x: Payload): x is Payload & { __kind: 'None' } => x.__kind === 'None';
export const isPayloadAll = (x: Payload): x is Payload & { __kind: 'All' } => x.__kind === 'All';
export const isPayloadAny = (x: Payload): x is Payload & { __kind: 'Any' } => x.__kind === 'Any';
export const isPayloadAdditionalSigner = (
  x: Payload,
): x is Payload & { __kind: 'AdditionalSigner' } => x.__kind === 'AdditionalSigner';
export const isPayloadPubkeyMatch = (x: Payload): x is Payload & { __kind: 'PubkeyMatch' } =>
  x.__kind === 'PubkeyMatch';
export const isPayloadDerivedKeyMatch = (
  x: Payload,
): x is Payload & { __kind: 'DerivedKeyMatch' } => x.__kind === 'DerivedKeyMatch';
export const isPayloadProgramOwned = (x: Payload): x is Payload & { __kind: 'ProgramOwned' } =>
  x.__kind === 'ProgramOwned';
export const isPayloadAmount = (x: Payload): x is Payload & { __kind: 'Amount' } =>
  x.__kind === 'Amount';
export const isPayloadFrequency = (x: Payload): x is Payload & { __kind: 'Frequency' } =>
  x.__kind === 'Frequency';
export const isPayloadPubkeyTreeMatch = (
  x: Payload,
): x is Payload & { __kind: 'PubkeyTreeMatch' } => x.__kind === 'PubkeyTreeMatch';

/**
 * @category userTypes
 * @category generated
 */
export const payloadBeet = beet.dataEnum<PayloadRecord>([
  ['None', beet.unit],
  ['All', beet.unit],
  ['Any', beet.unit],
  ['AdditionalSigner', beet.unit],

  [
    'PubkeyMatch',
    new beet.BeetArgsStruct<PayloadRecord['PubkeyMatch']>(
      [['destination', beetSolana.publicKey]],
      'PayloadRecord["PubkeyMatch"]',
    ),
  ],

  [
    'DerivedKeyMatch',
    new beet.FixableBeetArgsStruct<PayloadRecord['DerivedKeyMatch']>(
      [['seeds', beet.array(beet.bytes)]],
      'PayloadRecord["DerivedKeyMatch"]',
    ),
  ],
  ['ProgramOwned', beet.unit],

  [
    'Amount',
    new beet.BeetArgsStruct<PayloadRecord['Amount']>(
      [['amount', beet.u64]],
      'PayloadRecord["Amount"]',
    ),
  ],
  ['Frequency', beet.unit],

  [
    'PubkeyTreeMatch',
    new beet.FixableBeetArgsStruct<PayloadRecord['PubkeyTreeMatch']>(
      [
        ['proof', beet.array(beet.uniformFixedSizeArray(beet.u8, 32))],
        ['leaf', beet.uniformFixedSizeArray(beet.u8, 32)],
      ],
      'PayloadRecord["PubkeyTreeMatch"]',
    ),
  ],
]) as beet.FixableBeet<Payload>;
