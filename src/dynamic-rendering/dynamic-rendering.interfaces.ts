type ComponentList =
  | 'CustomButton'
  | 'CustomCard'
  | 'CustomContainer'
  | 'CustomDivider'
  | 'CustomInput'
  | 'CustomHeader'
  | 'HomeNavbar'
  | 'TextSlider';

export interface IComponent {
  type: ComponentList;
  data: {
    id: string;
    embeddedView?: IComponent;
    items?: Array<IComponent>;
    [key: string]: unknown;
  };
}
