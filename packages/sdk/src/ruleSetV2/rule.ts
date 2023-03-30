import * as beet from '@metaplex-foundation/beet';
import BN from 'bn.js';
import {
  AdditionalSignerRuleV2,
  deserializeAdditionalSignerV2,
  serializeAdditionalSignerV2,
} from './additionalSigner';
import {
  PubkeyTreeMatchRuleV2,
  deserializePubkeyTreeMatchV2,
  serializePubkeyTreeMatchV2,
} from './pubkeyTreeMatch';
import { AllRuleV2, deserializeAllV2, serializeAllV2 } from './all';
import { AnyRuleV2 as AnyRuleV2 } from './any';
import { RuleTypeV2 } from './ruleType';
import { deserializePubkeyMatchV2, PubkeyMatchRuleV2, serializePubkeyMatchV2 } from './pubkeyMatch';
import {
  deserializePubkeyListMatchV2,
  PubkeyListMatchRuleV2,
  serializePubkeyListMatchV2,
} from './pubkeyListMatch';
import {
  deserializeProgramOwnedListV2,
  ProgramOwnedListRuleV2,
  serializeProgramOwnedListV2,
} from './programOwnedList';
import {
  ProgramOwnedRuleV2,
  serializeProgramOwnedV2,
  deserializeProgramOwnedV2,
} from './programOwned';
import {
  deserializeProgramOwnedTreeV2,
  ProgramOwnedTreeRuleV2,
  serializeProgramOwnedTreeV2,
} from './programOwnedTree';

export type RuleV2 =
  | AdditionalSignerRuleV2
  | AllRuleV2
  // | AmountRuleV2
  | AnyRuleV2
  // | FrequencyRuleV2
  // | IsWalletRuleV2
  // | NamespaceRuleV2
  // | NotRuleV2
  // | PassRuleV2
  // | PDAMatchRuleV2
  | ProgramOwnedRuleV2
  | ProgramOwnedListRuleV2
  | ProgramOwnedTreeRuleV2
  | PubkeyListMatchRuleV2
  | PubkeyMatchRuleV2
  | PubkeyTreeMatchRuleV2;

export const serializeRuleV2 = (rule: RuleV2): Buffer => {
  switch (rule.type) {
    case RuleTypeV2.AdditionalSigner:
      return serializeAdditionalSignerV2(rule);
    case RuleTypeV2.All:
      return serializeAllV2(rule);
    case RuleTypeV2.ProgramOwned:
      return serializeProgramOwnedV2(rule);
    case RuleTypeV2.ProgramOwnedList:
      return serializeProgramOwnedListV2(rule);
    case RuleTypeV2.ProgramOwnedTree:
      return serializeProgramOwnedTreeV2(rule);
    case RuleTypeV2.PubkeyListMatch:
      return serializePubkeyListMatchV2(rule);
    case RuleTypeV2.PubkeyMatch:
      return serializePubkeyMatchV2(rule);
    case RuleTypeV2.PubkeyTreeMatch:
      return serializePubkeyTreeMatchV2(rule);
    default:
      throw new Error('Unknown rule type: ' + rule.type);
  }
};

export const serializeRulesV2 = (rules: RuleV2[]): Buffer => {
  return Buffer.concat(rules.map(serializeRuleV2));
};

export const deserializeRuleV2 = (buffer: Buffer, offset = 0): RuleV2 => {
  const type = beet.u32.read(buffer, offset) as RuleTypeV2;
  switch (type) {
    case RuleTypeV2.AdditionalSigner:
      return deserializeAdditionalSignerV2(buffer, offset);
    case RuleTypeV2.All:
      return deserializeAllV2(buffer, offset);
    case RuleTypeV2.ProgramOwned:
      return deserializeProgramOwnedV2(buffer, offset);
    case RuleTypeV2.ProgramOwnedList:
      return deserializeProgramOwnedListV2(buffer, offset);
    case RuleTypeV2.ProgramOwnedTree:
      return deserializeProgramOwnedTreeV2(buffer, offset);
    case RuleTypeV2.PubkeyListMatch:
      return deserializePubkeyListMatchV2(buffer, offset);
    case RuleTypeV2.PubkeyMatch:
      return deserializePubkeyMatchV2(buffer, offset);
    case RuleTypeV2.PubkeyTreeMatch:
      return deserializePubkeyTreeMatchV2(buffer, offset);
    default:
      throw new Error('Unknown rule type: ' + type);
  }
};

export const deserializeRulesV2 = (buffer: Buffer, size: number | BN, offset = 0): RuleV2[] => {
  const rules: RuleV2[] = [];
  const sizeAsNumber = new BN(size).toNumber();

  for (let index = 0; index < sizeAsNumber; index++) {
    const length = beet.u32.read(buffer, offset + 4);
    rules.push(deserializeRuleV2(buffer, offset));
    offset += 8 + length;
  }

  return rules;
};

export const serializeRuleHeaderV2 = (ruleType: RuleTypeV2, length: number): Buffer => {
  const buffer = Buffer.alloc(8);
  beet.u32.write(buffer, 0, ruleType);
  beet.u32.write(buffer, 4, length);
  return buffer;
};
