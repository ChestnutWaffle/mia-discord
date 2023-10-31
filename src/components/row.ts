import { APIActionRowComponent, APIMessageActionRowComponent, ComponentType } from "@discordjs/core";
import { cn_button, en_button, fr_button, kr_button, ja_button } from "./buttons";
import { open_cn_button, open_en_button, open_fr_button, open_kr_button, open_ja_button } from "./open-buttons";

export const buttons_row: APIActionRowComponent<APIMessageActionRowComponent> = {
  type: ComponentType.ActionRow,
  components: [en_button, kr_button, cn_button, ja_button, fr_button]
}

export const open_buttons_row: APIActionRowComponent<APIMessageActionRowComponent> = {
  type: ComponentType.ActionRow,
  components: [open_en_button, open_kr_button, open_cn_button, open_ja_button, open_fr_button]
}