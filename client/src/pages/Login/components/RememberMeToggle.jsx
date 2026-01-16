import { Checkbox } from '../../../components/ui/Checkbox';

export default function RememberMeToggle({ checked, onChange }) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      label="Remember me"
    />
  );
}
