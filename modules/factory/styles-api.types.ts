import type { CSSProperties } from "../utils";
import type { Theme } from "./transit";
import type { StyleProp } from "./transit";
import type { FactoryPayload } from "../factory";
import type { PartialVarsResolver } from "./transit";

type ResolveStyle = CSSProperties | ((theme: Theme) => CSSProperties);
export type GetStyleProp = ResolveStyle | ResolveStyle[] | GetStyleProp[] | undefined;

export interface GetStylesApiOptions {
  id?: string;
  className?: string;
  style?: StyleProp;
  focusable?: boolean;
  active?: boolean;
  classNames?: ClassNames<{ props: any; stylesNames: string }>;
  styles?: Styles<{ props: any; stylesNames: string }>;
  variant?: string;
  props?: Record<string, any>;
}

export type StylesApiRecord<Payload extends FactoryPayload, DataType> = Payload["compound"] extends true
  ? Payload["stylesNames"] extends string
    ? StylesRecord<Payload["stylesNames"], DataType>
    : never
  : Payload["stylesNames"] extends string
    ?
        | StylesRecord<Payload["stylesNames"], DataType>
        | ((
            theme: Theme,
            props: Payload["props"],
            ctx: Payload["ctx"],
          ) => StylesRecord<Payload["stylesNames"], DataType>)
    : never;

export type Styles<Payload extends FactoryPayload> = StylesApiRecord<Payload, CSSProperties>;
export type ClassNames<Payload extends FactoryPayload> = StylesApiRecord<Payload, string>;
export type ClassNamesArray<Payload extends FactoryPayload> = (StylesApiRecord<Payload, string> | undefined)[];

export type StylesRecord<StylesNames extends string, Payload> = Partial<Record<StylesNames, Payload>>;

export interface StylesApiProps<Payload extends FactoryPayload> {
  unstyled?: boolean;
  variant?: Payload["variant"] extends string ? Payload["variant"] | (string & {}) : string;
  classNames?: ClassNames<Payload>;
  styles?: Styles<Payload>;
  className?: string;
  style?: CSSProperties;
  vars?: PartialVarsResolver<Payload>;
}

export interface CompoundStylesApiProps<Payload extends FactoryPayload> extends StylesApiProps<Payload> {}
