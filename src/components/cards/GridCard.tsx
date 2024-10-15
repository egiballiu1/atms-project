import classNames from "classnames"
import type { CardProps } from "./types"

const card = [
    'flex', 
    'flex-col',
    'justify-between',
    'border',
    'border-gray-light',
    'border-solid',
    'p-4',
    'rounded-xl',
    'w-auto',
    'shadow-md',
    'gap-3',
    'cursor-pointer'
]

const titleStyle = [
    'font-bold',
    'text-black',
    'pb-2'
]

const GridCard : React.FC<CardProps> = ({title, content, icon, status}) => {

    const statusBg = 
        status === 'to-do' ? 'bg-secondary' : 
        status === 'done' ? 'bg-green' : 
        status === 'blocked' ? 'bg-red' :
        status === 'in-progress' ? 'bg-pink' :
        'bg-orange'
    

    return <div className={classNames(card)}>
        <div className="grid grid-cols-[1fr_50px] gap-3">
            <h3 className={classNames(titleStyle)}>
                {title}
            </h3>
            <img src={icon} alt={title} width={40} height={40} />
        </div>
        <p className="line-clamp-2">{content}</p>
        <span className={`${statusBg} rounded-md w-fit p-1 uppercase`}>{status ? status : 'to-do'}</span>

    </div>
}

export { GridCard }