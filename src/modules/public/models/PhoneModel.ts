export interface PhoneModel {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
