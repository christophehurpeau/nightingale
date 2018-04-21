export interface StyleToHexColor {
  readonly [key: string]: string;
}

const styleToHexColor: StyleToHexColor = {
  orange: 'ff5f00',
  grayLight: '808080',
  'gray-light': '808080',
};

export default styleToHexColor;
