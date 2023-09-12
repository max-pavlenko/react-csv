import {ComponentProps, FC} from 'react'

type Props = ComponentProps<'div'>;

const Card: FC<Props> = ({className, children, ...props}) => {
   return (
       <div className={`w-full p-2 rounded-md bg-green-300 border-2 border-green-900 ${className}`} {...props}>
          {children}
       </div>
   );
};

export default Card;
