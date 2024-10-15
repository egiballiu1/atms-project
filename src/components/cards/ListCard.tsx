import classNames from "classnames"
import type { CardProps } from "./types"

const card = [
    'grid', 
    'grid-cols-1',
    'lg:grid-cols-[1fr_0.3fr_0.3fr_2fr]',
    'justify-between',
    'items-center',
    'border',
    'border-gray-light',
    'border-solid',
    'p-4',
    'rounded-xl',
    'w-auto',
    'cursor-pointer',
    'mb-1'
]

const titleStyle = [
    'font-bold',
    'text-black',
    'pb-2'
]

const ListCard : React.FC<CardProps> = ({title, content, icon, status}) => {

    const statusBg = 
        status === 'to-do' ? 'bg-secondary' : 
        status === 'done' ? 'bg-green' : 
        status === 'blocked' ? 'bg-red' :
        status === 'in-progress' ? 'bg-pink' :
        'bg-orange'
    

    return <div className={classNames(card)}>
        <h3 className={classNames(titleStyle)}>
            {title}
        </h3>
        <img src={icon} alt={title} width={40} height={40} />
        <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>{status ? status : 'to-do'}</span>
        <p className="lg:line-clamp-1 line-clamp-2">{content}</p>

    </div>
}

export { ListCard }