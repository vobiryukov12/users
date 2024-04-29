import { IconProps } from './Icon.props'
import {
  WebsiteIcon,
  PhoneIcon,
  EmailIcon,
  ArrowIcon,
  CheckboxIcon,
  StreetIcon,
  SuiteIcon,
  CityIcon,
  ZipcodeIcon,
  CompanyIcon,
  CatchPhraseIcon,
  BsIcon,
} from './Icons'

/** 
 *Компонет Icon является svg-спрайтом, в свойство icon передается строка с названием иконки.
 Для более глубокой стилизации можно передать дополнительный класс и внутри него задать стили path или g
 @example <Icon icon="Arrow" width={40} height={50} stroke='red' />
 @param icon - название иконки
 @param props - любые атрибуты, которые может принимать svg-элемент
*/
export function Icon({ icon, ...props }: IconProps): JSX.Element {
  const iconsConfig = {
    ['Website']: <WebsiteIcon {...props} />,
    ['Phone']: <PhoneIcon {...props} />,
    ['Email']: <EmailIcon {...props} />,
    ['Arrow']: <ArrowIcon {...props} />,
    ['Checkbox']: <CheckboxIcon {...props} />,
    ['Street']: <StreetIcon {...props} />,
    ['Suite']: <SuiteIcon {...props} />,
    ['City']: <CityIcon {...props} />,
    ['Zipcode']: <ZipcodeIcon {...props} />,
    ['Company']: <CompanyIcon {...props} />,
    ['CatchPhrase']: <CatchPhraseIcon {...props} />,
    ['Bs']: <BsIcon {...props} />,
  }

  return iconsConfig[icon]
}
