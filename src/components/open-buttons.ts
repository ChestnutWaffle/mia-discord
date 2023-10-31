import { APIButtonComponent, ButtonStyle, ComponentType } from "@discordjs/core"
import { OPEN_LANG_CUSTOM_IDS, emojis } from "../utils/languages"

export const open_en_button = {
  type: ComponentType.Button,
  custom_id: OPEN_LANG_CUSTOM_IDS.translate_en,
  style: ButtonStyle.Secondary,
  label: emojis.translate_en
} satisfies APIButtonComponent

export const open_kr_button = {
  type: ComponentType.Button,
  custom_id: OPEN_LANG_CUSTOM_IDS.translate_kr,
  style: ButtonStyle.Secondary,
  label: emojis.translate_kr
} satisfies APIButtonComponent

export const open_cn_button = {
  type: ComponentType.Button,
  custom_id: OPEN_LANG_CUSTOM_IDS.translate_cn,
  style: ButtonStyle.Secondary,
  label: emojis.translate_cn
} satisfies APIButtonComponent

export const open_fr_button = {
  type: ComponentType.Button,
  custom_id: OPEN_LANG_CUSTOM_IDS.translate_fr,
  style: ButtonStyle.Secondary,
  label: emojis.translate_fr
} satisfies APIButtonComponent

export const open_ja_button = {
  type: ComponentType.Button,
  custom_id: OPEN_LANG_CUSTOM_IDS.translate_ja,
  style: ButtonStyle.Secondary,
  label: emojis.translate_ja
} satisfies APIButtonComponent

