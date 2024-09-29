// Her component'in sahip olabileceği genel ayarları temsil eden bir interface
interface ComponentConfig {
  [key: any]: any;
}

// Her component'in sahip olabileceği temel yapıyı tanımlar
interface LayoutComponent {
  key: string;
  type: string;
  config: ComponentConfig;
}

// Sayfa düzeni için genel JSON yapısını tanımlar
interface PageLayout {
  layout: LayoutComponent[];
}