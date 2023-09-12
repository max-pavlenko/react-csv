import {ComponentProps, FC} from 'react'

type Props = ComponentProps<'img'>;

const Loader: FC<Props> = ({className, src = '/svg/loader.svg', ...props}) => {
   return (
       <img className='h-7 aspect-square' src={src} alt='loader' {...props}/>
   );
};

export default Loader;
