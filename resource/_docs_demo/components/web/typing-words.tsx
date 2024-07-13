import { TypingWords } from "@/modules/components/web";
import { SetProps, SetPropsText, useSetProps } from "../../__set_props";

export function Demo() {
  const { ...props } = useSetProps({ Str: "Input Your Words" });
  const placeholders = [props.str]; // prettier-ignore
  return (
    <div>
      <TypingWords placeholders={placeholders} />
      <SetProps.Wrapper>
        <SetPropsText {...props} />
      </SetProps.Wrapper>
    </div>
  );
}
