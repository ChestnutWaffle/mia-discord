import { APIButtonComponent, ButtonStyle, ComponentType } from "@discordjs/core"
import { LANG_CUSTOM_IDS, emojis } from "../utils/languages"

export const en_button = {
  type: ComponentType.Button,
  custom_id: LANG_CUSTOM_IDS.translate_en,
  style: ButtonStyle.Secondary,
  label: emojis.translate_en
} satisfies APIButtonComponent

export const kr_button = {
  type: ComponentType.Button,
  custom_id: LANG_CUSTOM_IDS.translate_kr,
  style: ButtonStyle.Secondary,
  label: emojis.translate_kr
} satisfies APIButtonComponent

export const cn_button = {
  type: ComponentType.Button,
  custom_id: LANG_CUSTOM_IDS.translate_cn,
  style: ButtonStyle.Secondary,
  label: emojis.translate_cn
} satisfies APIButtonComponent

export const fr_button = {
  type: ComponentType.Button,
  custom_id: LANG_CUSTOM_IDS.translate_fr,
  style: ButtonStyle.Secondary,
  label: emojis.translate_fr
} satisfies APIButtonComponent

export const ja_button = {
  type: ComponentType.Button,
  custom_id: LANG_CUSTOM_IDS.translate_ja,
  style: ButtonStyle.Secondary,
  label: emojis.translate_ja
} satisfies APIButtonComponent

