import {ComponentProps, FC} from 'react'

type Props = ComponentProps<'button'>;

const Button: FC<Props> = ({className, children, ...props}) => {
   return (
       <button className={`shadow-lg disabled:bg-blue-950 disabled:cursor-not-allowed py-3 w-full rounded-md bg-cyan-800
        hover:bg-cyan-900 text-white text-xl ${className}`} {...props}>
          {children}
       </button>
   );
};

export default Button;
