import { DoubleHelixWords } from "@/modules/components/web";
import { SetProps, SetPropsRange, SetPropsText, useSetProps } from "../../__set_props";

export function Demo() {
  const { numb: speed, ...pro } = useSetProps({ Numb: 400 });
  const { numb: distance, ...prop } = useSetProps({ Numb: 80 });
  const { str: placeholders, numb: gap, ...props } = useSetProps({ Str: "Input Your Words", Numb: 8 });
  return (
    <div>
      <div className="size-full relative flex items-center text-xl">
        <DoubleHelixWords placeholders={placeholders} speed={speed} gap={gap} distance={distance} />
      </div>
      <SetProps.Wrapper>
        <SetPropsText str={placeholders} {...props} />
        <SetPropsRange title="speed" value={speed} setNumb={pro.setNumb} min="200" max="1200" />
        <SetPropsRange title="gap" value={gap} setNumb={props.setNumb} min="0" max="100" />
        <SetPropsRange title="distance" value={distance} setNumb={prop.setNumb} min="0" max="100" />
      </SetProps.Wrapper>
    </div>
  );
}
