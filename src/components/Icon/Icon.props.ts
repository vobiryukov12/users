import { SVGProps } from 'react'
export type IconName =
  | 'Website'
  | 'Phone'
  | 'Email'
  | 'Arrow'
  | 'Checkbox'
  | 'Street'
  | 'Suite'
  | 'City'
  | 'Zipcode'
  | 'Company'
  | 'CatchPhrase'
  | 'Bs'

export interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName
}
